import CircuitScriptVisitor from "./antlr/CircuitScriptVisitor.js";

export class Visitor extends CircuitScriptVisitor {
    
    indentLevel = 0;
    startingContext: ExecutionContext;
    executionStack = [this.startingContext];

    constructor() {
        
    }

}