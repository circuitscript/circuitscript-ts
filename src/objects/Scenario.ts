import { HighImpedanceValue } from "src/behavior";
import { ClassComponent } from "./ClassComponent";
import { Net } from "./Net";
import { NumericValue } from "./NumericValue";
import { BaseError } from "src/errors";
import { getLinePositionAsString } from "../utils.js";
import { ConductanceInfo } from "../render/nodal-analysis.js";

export class Scenario {

    /** Fixed/forced net voltages fed into the nodal solver as inputs, e.g. GND,
     * scenario-level set_voltage() calls made before evaluate() runs ("hard"
     * sources that persist across iterations), and clamps applied by component
     * behavior during evaluate() (rebuilt from the hard sources each iteration,
     * so a clamp that no longer applies doesn't linger). voltage() prefers this
     * map over solvedVoltages, since a forced value should read back as itself
     * rather than the solver's last computed estimate for that net. */
    sourceVoltages = new Map<Net, NumericValue|HighImpedanceValue>();

    /** Per-net voltages computed as the *output* of calculateNodeVoltages() for
     * the current iteration of evaluate()'s solve loop. Overwritten every
     * iteration; used as the fallback in voltage() for nets that aren't a
     * fixed source. */
    solvedVoltages = new Map<Net, NumericValue|HighImpedanceValue>();

    /** Two-terminal fixed-voltage-offset constraints (net1 - net2 = diff)
     * registered by component behavior during the current evaluate() pass,
     * e.g. via set_voltage_diff(). Reset at the start of every iteration. */
    voltageSourceBranches: { net1: Net, net2: Net, diff: number }[] = [];

    /** Drive constraints registered by component behavior during the
     * current evaluate() pass via drive(): one unknown current injected at
     * driveNet, paired with an equation pinning targetNet's voltage to
     * targetValue. Reset at the start of every iteration. */
    driveConstraints: { driveNet: Net, targetNet: Net, targetValue: number }[] = [];

    description: string | null = null;

    currentComponent: ClassComponent | null = null;

    evaluateCalled = false;

    errorWhenEvaluate = false;

    finalPass = false;


    failError: BaseError | null = null;


    virtualCounter = 0;

    /** Conductance matrix/representative bookkeeping from the final evaluate()
     * iteration's calculateNodeVoltagesV2() solve - reused by resistance() and
     * resistance_net() instead of rebuilding the matrix on every call. null
     * until evaluate() has run at least once. */
    lastConductance: ConductanceInfo | null = null;

    getResultString(): string[] {
        const icon = this.finalPass ? "✓" : "✕";
        const mainLine = `${icon} ${this.description}`
        const result = [
            mainLine
        ];

        if (!this.finalPass) {
            if (this.errorWhenEvaluate){
                result.push('evaluate() had an error');
            } else if (this.failError !== null){
                const err = this.failError!;
                const position = getLinePositionAsString({
                    start: err.startToken!,
                    stop: err.endToken!
                });
                result.push(`line ${position} - ${err.message}`);
            }
        }

        return result;
    }
}

export function formatScenarioResults(scenarios: Scenario[]): string[] {
    const lines: string[] = [];
    for (const scenario of scenarios) {
        const result = scenario.getResultString();
        lines.push('  ' + result[0]);
        for (let i = 1; i < result.length; i++) {
            lines.push('    ' + result[i]);
        }
    }
    return lines;
}