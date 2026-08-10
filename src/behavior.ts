import { Behavior_blockContext, Data_exprContext, Expressions_blockContext } from "./antlr/CircuitScriptParser";
import { ComponentPinNetPair } from "./objects/types";

export class ComponentBehavior {
    ctx: Behavior_blockContext;

    conditionCallback: (ctx: Data_exprContext) => boolean;

    expressionsCallback: (ctx: Expressions_blockContext) => void;


    constructor(ctx: Behavior_blockContext,
        conditionCallback: (ctx: Data_exprContext) => boolean,
        expressionsCallback: (ctx: Expressions_blockContext) => void) {
        this.ctx = ctx;
        this.conditionCallback = conditionCallback;
        this.expressionsCallback = expressionsCallback;
    }

    evaluate(): void {
        const states = this.ctx.behavior_state_expr();
        for (const item of states) {
            const condition = this.conditionCallback(item.data_expr());
            if (condition) {
                this.expressionsCallback(item.expressions_block());
                // Stop at the first condition
                break;
            }
        }
    }
}

export function prepareScenarioNets(instancePinNets: ComponentPinNetPair[]){
    // Clone all the nets
    const netsLookup = new Map();
    const tmpNets = instancePinNets.map(([instance, pinId, net]) => {
        const clonedNet = net.clone();
        netsLookup.set(clonedNet, net);
        return [instance, pinId, clonedNet] as ComponentPinNetPair;
    });

    return {
        instancePinNets: tmpNets,
        netsLookup,
    }
}

export class HighImpedanceValue {
    toString(): string {
        return "[HighImpedance]";
    }
}