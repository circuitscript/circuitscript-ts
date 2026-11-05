import { BaseVisitor } from "./BaseVisitor";
import { Behavior_blockContext } from "./antlr/CircuitScriptParser";

export class ComponentBehavior {
    ctx: Behavior_blockContext;
    visitor: BaseVisitor;

    constructor(ctx: Behavior_blockContext,
        visitor: BaseVisitor) {
        this.ctx = ctx;
        this.visitor = visitor;
    }

    evaluate(): void {
        this.visitor.visit(this.ctx);
    }
}