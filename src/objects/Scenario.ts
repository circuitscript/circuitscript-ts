import { HighImpedanceValue } from "src/behavior";
import { ClassComponent } from "./ClassComponent";
import { Net } from "./Net";
import { NumericValue } from "./NumericValue";

export class Scenario {
    // Stores net => voltage mapping
    voltageStates = new Map<Net, NumericValue | HighImpedanceValue>();

    currentComponent: ClassComponent | null = null;

    // Used for virtual components created in the scenario (0R resistors, etc.)
    virtualCounter = 0;

    evaluateCalled = false;
}