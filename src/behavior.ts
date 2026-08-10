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
        const states = this.ctx.behavior_state_expr();
        for (const item of states) {
            const condition = this.visitor.visitResult(item.data_expr());

            if (condition) {
                this.visitor.visit(item.expressions_block());
                // Stop at the first condition matched.
                break;
            }
        }
    }
}

export class HighImpedanceValue {
    toString(): string {
        return "[HighImpedance]";
    }
}