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
            const ctxDataExpr = item.data_expr();
            const ctxExpressionsBlock = item.expressions_block();

            if (ctxDataExpr) {
                const condition = this.visitor.visitResult(ctxDataExpr);
                if (condition) {
                    // Stop at the first condition matched.
                    this.visitor.visit(ctxExpressionsBlock);
                    break;
                }
            } else {
                // data expr not set, so this is the default state to apply for
                // all states
                this.visitor.visit(ctxExpressionsBlock);
            }
        }
    }
}