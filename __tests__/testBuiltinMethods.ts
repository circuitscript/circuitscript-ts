/* eslint jest/expect-expect: ["warn", { "assertFunctionNames": ["expect", "expectInlineScriptTest"] }] */
import { expectInlineScriptTest, runScript, ScriptTest } from "./helpers";
import {
    inlineScript51,
    inlineScript52,
    inlineScript53,
    inlineScript55,
    inlineScript63,
    inlineScript64,
    inlineScript65,
    inlineScript66,
    inlineScript67,
    inlineScript68,
    inlineScript69,
    inlineScript70,
    inlineScript71,
    inlineScript72,
    inlineScript73,
    inlineScript74,
    inlineScript86,
    inlineScript87,
    inlineScript88,
    inlineScript89,
    inlineScript90,
    inlineScript91,
    inlineScript92,
    inlineScript93,
    inlineScript94,
    inlineScript95,
    inlineScript96,
    inlineScript97,
    inlineScript98,
    inlineScript99,
    inlineScript100,
} from './parseScripts.js';

function testInlineScriptTest(description: string, scriptTest: ScriptTest<unknown>): void {
    test(description, async () => {
        await expectInlineScriptTest(description, scriptTest);
    });
}

describe('builtin methods', () => {

    test.each([
        ['range function', inlineScript51],
        ['enumerate function', inlineScript52],
        ['enumerate function with `for` loop', inlineScript53],
        ['array_push basic', inlineScript63],
        ['array_get by index', inlineScript64],
        ['array_set overwrites element', inlineScript65],
        ['array_push with mixed types', inlineScript66],

        ['pin_get_type returns default type', inlineScript67],
        ['pin_set_type changes pin type', inlineScript68],
        ['pin_set_type all supported types', inlineScript69],
        ['pin_set_type overwrite', inlineScript70],

        ['has_pin returns true for existing numeric pin', inlineScript71],
        ['has_pin returns false for non-existent numeric pin', inlineScript72],
        ['has_pin checks boundary pins correctly', inlineScript73],
        ['has_pin with named string pin', inlineScript74],

    ])('built-in functions - %s',  async (description, scriptTest) =>
        await expectInlineScriptTest(description, scriptTest)
    );

    testInlineScriptTest('test builtin methods', inlineScript55);

    describe('pin_set_type / pin_get_type - explicit component/pin args', () => {

        test('sets and gets a pin type', async () => {
            const { visitor, hasError } = await runScript(inlineScript86);
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('input');
        });

        test('invalid pin type string produces an error', async () => {
            const { visitor, hasError } = await runScript(inlineScript87);
            expect(hasError).toBe(true);
            expect(visitor.printStream.join(' ')).toContain('marker');
        });

        test('invalid pin id produces an error for pin_set_type and pin_get_type', async () => {
            const { hasError: setHasError } = await runScript(inlineScript88);
            expect(setHasError).toBe(true);

            const { hasError: getHasError } = await runScript(inlineScript89);
            expect(getHasError).toBe(true);
        });

        test('malformed arity throws for pin_set_type and pin_get_type', async () => {
            const { hasError: setHasError } = await runScript(inlineScript90);
            expect(setHasError).toBe(true);

            const { hasError: getHasError } = await runScript(inlineScript91);
            expect(getHasError).toBe(true);
        });
    });

    describe('pin_set_type / pin_get_type - cursor form', () => {

        test('sets and gets a pin type at the current cursor', async () => {
            const { visitor, hasError } = await runScript(inlineScript92);
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('output');
        });

        test('pin_get_type with no cursor set falls back to the document root component', async () => {
            // ExecutionScope.currentComponent is initialized to the document root
            // component, not null, so this doesn't hit the non-null assertions.
            const { visitor, hasError } = await runScript(inlineScript93);
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('passive');
        });
    });

    describe('net_get', () => {

        test('resolves the same net from both ends of a wire', async () => {
            const { visitor, hasError } = await runScript(inlineScript94);
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('blue');
        });

        test('no-args form matches the cursor pin net', async () => {
            const { visitor, hasError } = await runScript(inlineScript95);
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('green');
        });

        test('component-only form uses the default pin', async () => {
            const { visitor, hasError } = await runScript(inlineScript96);
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('yellow');
        });

        test('unconnected pin has no net', async () => {
            const { visitor, hasError } = await runScript(inlineScript97);
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('null');
        });

        test('invalid first parameter throws RuntimeExecutionError', async () => {
            const { hasError } = await runScript(inlineScript98);
            expect(hasError).toBe(true);
        });
    });

    describe('has_pin - malformed arity', () => {

        test('single argument is treated as a pin id against the cursor component and fails', async () => {
            const { hasError } = await runScript(inlineScript99);
            expect(hasError).toBe(true);
        });

        test('three arguments throws', async () => {
            const { hasError } = await runScript(inlineScript100);
            expect(hasError).toBe(true);
        });
    });
});
