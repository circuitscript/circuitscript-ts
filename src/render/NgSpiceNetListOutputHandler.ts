import { NetListItemPin, ParserVisitor } from "src/visitor.js";
import { ParseOutputHandler } from "./KiCadNetListOutputHandler.js";
import { NumericValue } from "../objects/NumericValue.js";
import { RuntimeExecutionError } from "../errors.js";
import { GlobalDocumentName } from "../globals.js";
import { ClassComponent } from "src/objects/ClassComponent.js";

export class NgSpiceNetListOutputHandler extends ParseOutputHandler {

    beforeRender = true;

    parse(visitor: ParserVisitor, outputPath: string | null, fileExtension: string | null): boolean {
        if (outputPath !== null && fileExtension === "cir") {
            const netlist = visitor.getNetList();

            const globalDocument =
                visitor.getScope().variables.get(GlobalDocumentName) as Record<string, any>;

            const models: string[] = [];
            const lines: (string|string[])[] = [];

            const nodeNames = new Map();

            for (const item of netlist) {
                const { instance, pins } = item;
                const typeProp = item.instance.typeProp;

                // 2 terminal devices
                if (typeProp === "res" || typeProp == "cap" || typeProp == "ind" || typeProp === "diode") {
                    const { net1Name, net2Name } = getInstancePinNets(nodeNames, pins, instance);

                    if (typeProp === "diode") {
                        // Each diode gets a specific model.
                        const modelName = `D_model_${instance.assignedRefDes}`;
                        let simModel = "D";
                        if (instance.hasParam('sim_model')) {
                            simModel = instance.getParam('sim_model');
                        }

                        models.push(`.model ${modelName} ${simModel}`);

                        // For diode model, the anode and cathode are flipped because
                        // pin 1 is the cathode and pin 2 is the anode.
                        lines.push([instance.assignedRefDes!,
                            net2Name, net1Name, modelName]);
                    } else {
                        let simModel = "";
                        if (instance.hasParam('sim_model')) {
                            simModel = ` ${instance.getParam('sim_model')}`;
                        }

                        const value = instance.getParam("value") as NumericValue;
                        lines.push([instance.assignedRefDes!,
                            net1Name, net2Name, `${value.toDisplayString()}${simModel}`]);
                    }

                } else if (typeProp === "sim" && instance.simProp !== null) {
                    if (!instance.simProp.has("type")) {
                        throw new RuntimeExecutionError("Simulation component has no type set");
                    }

                    const { simProp } = instance;

                    const simInstanceType = simProp.get("type");
                    if (simInstanceType === "voltage_source") {
                        const { net1Name, net2Name } = getInstancePinNets(nodeNames, pins, instance);
                        if (!simProp.has("voltage")) {
                            throw new RuntimeExecutionError("Simulation voltage source is missing voltage");
                        }

                        const voltage = simProp.get("voltage");
                        let voltageSimString = "";

                        if (voltage instanceof NumericValue) {
                            voltageSimString = `DC ${voltage.toDisplayString()}`;
                        } else if (typeof voltage === "string") {
                            voltageSimString = voltage;
                        }

                        lines.push([instance.assignedRefDes,
                            net1Name, net2Name, voltageSimString]);
                    }
                }
            }

            let simTitle = "* TITLE";
            let simAnalysis = ".op";

            if (globalDocument.sim) {
                if (globalDocument.sim.title) {
                    simTitle = `* ${globalDocument.sim.title}`;
                }

                if (globalDocument.sim.analysis) {
                    simAnalysis = globalDocument.sim.analysis;
                }
            }

            const finalLines = [
                simTitle,       // First line is always text/description
                ...models,
                "",
                ...lines,
                '.end'
            ]

            const finalOutput = finalLines.map(item => {
                if (Array.isArray(item)) {
                    return item.join(" ");
                } else {
                    return item;
                }
            }).join("\n");

            visitor.environment.writeFileSync(outputPath, finalOutput);
            console.log("Generated file", outputPath);
            
            return false;
        }
        return true;
    }
}

function getInstancePinNets(nodeNames: Map<string, string>, pins: {
    [key: string | number]: NetListItemPin
}, instance: ClassComponent): { net1Name: string, net2Name: string } {
    const defaultPinId = instance.getDefaultPin();

    const net1 = pins[defaultPinId.toString()];
    const net2 = pins[instance.getNextPinAfter(defaultPinId).toString()];

    let net1Name: string;
    if (nodeNames.has(net1.netName)) {
        net1Name = nodeNames.get(net1.netName);
    } else {
        net1Name = generateNodeName(net1.netName);
        nodeNames.set(net1.netName, net1Name);
    }

    let net2Name: string;
    if (nodeNames.has(net2.netName)) {
        net2Name = nodeNames.get(net2.netName);
    } else {
        net2Name = generateNodeName(net2.netName);
        nodeNames.set(net2.netName, net2Name);
    }

    return {
        net1Name,
        net2Name
    }
}

function generateNodeName(netName: string): string {
    // remove the "/" at the start
    if (netName[0] === "/") {
        netName = netName.slice(1);
    }

    if (netName.startsWith("NET-")) {
        netName = netName.slice(4);
    }

    if (netName.toLowerCase() === "gnd"){
        return "0";
    }

    netName = netName.replace(/[-()+]/g, "_");
    return netName;
}