import { HighImpedanceValue } from "src/behavior";
import { ClassComponent } from "./ClassComponent";
import { Net } from "./Net";
import { NumericValue } from "./NumericValue";
import { BaseError } from "src/errors";
import { getLinePositionAsString } from "../utils.js";

export class Scenario {
    // Stores net => voltage mapping
    voltageStates = new Map<Net, NumericValue | HighImpedanceValue>();

    description: string | null = null;

    currentComponent: ClassComponent | null = null;

    // Used for virtual components created in the scenario (0R resistors, etc.)
    virtualCounter = 0;

    evaluateCalled = false;

    finalPass = false;

    failError: BaseError | null = null;

    getResultString(): string[] {
        const icon = this.finalPass ? "✓" : "✕";
        const mainLine = `${icon} ${this.description}`
        const result = [
            mainLine
        ];

        if (!this.finalPass) {
            const err = this.failError!;
            const position = getLinePositionAsString({
                start: err.startToken!,
                stop: err.endToken!
            });

            result.push(`line ${position} - ${err.message}`);
        }

        return result;
    }
}