import { runScript, runScriptExpectError } from "./helpers.js";
import { NumericValue, numeric, roundValue } from "../src/objects/NumericValue.js";
import { PercentageValue } from "../src/objects/PercentageValue.js";

const inlineScript1 = `
b = 10
a = -b
`

const inlineScript2 = `
b = 10
a = -b / 2 - 1
`

const inlineScript3 = `
a = 10
a += 5
a -= 2
a *= 30
a /= 5
`

const inlineScript4 = `
a = 10
a %= 3
`

describe('Simple operator tests', () => {
    test.each([
        ["a = -1 + 2", 1],
        ["a = 1 + 2", 3],
        ["a = 1 + 2 * 3", 7],
        ["a = 5 - 1", 4],
        ["a = 5 - 1 * 2", 3],
        ["a = 10 / 2", 5],
        ["a = 1 + 9 / 3", 4],
        ["a = 1+20-2", 19],
        ["a = -1+2", 1],
        ["a = -123", -123],
        ["a = 0-123", -123],
        [inlineScript1, -10],
        [inlineScript2, -6],

        // Modulus operators
        ['a = 10 % 5', 0],
        ['a = 10 % 3', 1],
        ['a = 10 % 4', 2],
        ['a = 10 % 2', 0],

        [inlineScript3, 78],
        [inlineScript4, 1],

        // With suffix

        // Multiplication cases
        ['a = 10k * 2', '20k'],
        ['a = 10.1k * 2', '20.2k'],
        ['a = 0.5k * 5', '2.5k'],
        ['a = 0.1k * 1', 100],
        ['a = 0.5k * 1', 500],

        // Division cases
        ['a = 33k / 3', '11k'],
        ['a = 50k / 4', '12.5k'],
        ['a = 50k / 5k', 10],
        ['a = 33.3k / 3', '11.1k'],

        // Addition cases
        ['a = 10k + 5k', '15k'],
        ['a = 10.1k + 5k', '15.1k'],
        
        // Subtraction cases
        ['a = 5k - 2', '4.998k'],
        ['a = 10k - 2.1k', '7.9k'],
        ['a = 5.5k - 3.1k', '2.4k'],

        // Modulus cases
        ['a = 3.3k % 21', 3],
        ['a = 100k % 3.23k', '3.1k'],
        
        // Different prefixes,
        ['a = 10k * 520', '5.2M'],
        ['a = 10k * 520k', '5.2G'],
        ['a = 1 / 10000', '100u'],
        ['a = 1 / 10M', '100n'],
        ['a = 1 / 10G', '100p'],

        // Javascript number quirk (in normal JS this returns 0.300...4)
        ['a = 0.1 + 0.2', '300m'],

        // Not operator (!) tests
        ['a = !0', true],
        ['a = !0.1', false],
        ['a = !10', false],

        // Logical And operator (&&) tests
        ['a = 10 && 20', 20],
        ['a = 20 && 10', 10],
        ['a = 10 && 0',  0],
        ['a = 0  && 10', 0],

        // Logical Or operator (||) tests
        ['a = 10 || 20', 10],
        ['a = 20 || 10', 20],
        ['a = 0  || 10', 10],
        ['a = 10 || 0',  10]

    ])('math test - %s', async (script, expectedResult) => {
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const variables = visitor.dumpVariables();
        const value = variables.get('a');

        let useValue: any;
        if (typeof expectedResult === 'boolean'){
            useValue = value;
        } else if (typeof expectedResult === 'string'){
            useValue = value.toDisplayString();
        } else {
            useValue = value.toNumber();
        }

        expect(useValue).toEqual(expectedResult);
    });
})

describe('Percentage operator tests', () => {
    test.each([
        ['a = 10k * 5%', 'number', 500],
        ['a = 5% * 10k', 'number', 500],
        ['a = 100 / 5%', 'number', 2000],
        ['a = 10% / 2', 'percentage', '5%'],
        ['a = 100 + 5%', 'number', 105],
        ['a = 100 - 5%', 'number', 95],
        ['a = 5% + 100', 'number', 105],
        ['a = 5% - 100', 'number', -95],
        ['a = 5% + 5%', 'percentage', '10%'],
        ['a = 5% - 2%', 'percentage', '3%'],
        ['a = 5% * 2%', 'percentage', '0.1%'],
        ['a = 10% / 5%', 'number', 2],
        ['a = 13 % 7%', 'number', 0.26],
        ['a = 5% % 2%', 'percentage', '1%'],
    ])('percentage math test - %s', async (script, kind, expectedResult) => {
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const variables = visitor.dumpVariables();
        const value = variables.get('a');

        if (kind === 'percentage') {
            expect(value.toString()).toEqual(expectedResult);
        } else {
            expect(value.toNumber()).toEqual(expectedResult);
        }
    });

    test('compound assignment with percent literal', async () => {
        const script = `
a = 100
a += 5%
a *= 10%
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const variables = visitor.dumpVariables();
        const value = variables.get('a');

        expect(value.toNumber()).toEqual(10.5);
    });
});

describe('Undefined operand error tests', () => {
    test.each([
        // Unary operators
        ['unary negation of undefined variable', 'a = -undeclaredVar'],
        ['unary not of undefined variable',      'a = !undeclaredVar'],

        // Multiply expression (*, /, %)
        ['multiply with undefined lhs',          'a = undeclaredVar * 5'],
        ['multiply with undefined rhs',          'a = 5 * undeclaredVar'],
        ['divide with undefined lhs',            'a = undeclaredVar / 2'],
        ['divide with undefined rhs',            'a = 10 / undeclaredVar'],
        ['modulus with undefined lhs',           'a = undeclaredVar % 3'],
        ['modulus with undefined rhs',           'a = 10 % undeclaredVar'],

        // Addition expression (+, -)
        ['addition with undefined lhs',          'a = undeclaredVar + 1'],
        ['addition with undefined rhs',          'a = 1 + undeclaredVar'],
        ['subtraction with undefined lhs',       'a = undeclaredVar - 1'],
        ['subtraction with undefined rhs',       'a = 1 - undeclaredVar'],

        // Comparison / logical binary operators
        ['equality with undefined lhs',          'a = undeclaredVar == 1'],
        ['equality with undefined rhs',          'a = 1 == undeclaredVar'],
        ['less-than with undefined lhs',         'a = undeclaredVar < 1'],
        ['logical and with undefined lhs',       'a = undeclaredVar && true'],
        ['logical or with undefined rhs',        'a = false || undeclaredVar'],
    ])('error - %s', async (_description, script) => {
        const { hasError } = await runScript(script);
        expect(hasError).toBe(true);
    });

    test('undefined operand error includes variable name', async () => {
        const msg = await runScriptExpectError('a = -undeclaredVar');
        expect(msg).toContain('undeclaredVar');
    });
})

describe('Unary operator type error tests', () => {
    test('negation of string literal throws', async () => {
        const { hasError } = await runScript('x = "hello"\na = -x');
        expect(hasError).toBe(true);
    });

    test('negation error message is correct', async () => {
        const msg = await runScriptExpectError('x = "hello"\na = -x');
        expect(msg).toContain('Failed to do Negation operator');
    });

    test('not operator on string literal throws', async () => {
        const { hasError } = await runScript('x = "hello"\na = !x');
        expect(hasError).toBe(true);
    });

    test('not operator error message is correct', async () => {
        const msg = await runScriptExpectError('x = "hello"\na = !x');
        expect(msg).toContain('Failed to do Not operation');
    });
})

function getToleranceBounds(value: NumericValue): { plus: number; minus: number } {
    if (!value.hasTolerances()) {
        return { plus: 0, minus: 0 };
    }
    if (value.tolerances.length === 1) {
        const t = value.tolerances[0].toNumber();
        return { plus: t, minus: t };
    }
    return {
        plus: value.tolerances[0].toNumber(),
        minus: value.tolerances[1].toNumber(),
    };
}

describe('Tolerance propagation tests', () => {
    test('symmetric tolerance addition combines absolute bounds', async () => {
        const script = `
v1 = 10k + [5%]
v2 = 20k + [1%]
a = v1 + v2
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const a = visitor.dumpVariables().get('a');
        expect(a.toNumber()).toEqual(30000);
        expect(getToleranceBounds(a)).toEqual({ plus: 700, minus: 700 });
    });

    test('subtraction pairs plus of one operand with minus of the other (cross term)', async () => {
        const script = `
v1 = 10k + [5%, 2%]
v2 = 20k + [4%, 1%]
b = v1 - v2
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const b = visitor.dumpVariables().get('b');
        expect(b.toNumber()).toEqual(-10000);
        // plus = v1.plus + v2.minus = 500 + 200; minus = v1.minus + v2.plus = 200 + 800
        expect(getToleranceBounds(b)).toEqual({ plus: 700, minus: 1000 });
    });

    test('multiplication of two toleranced values adds relative tolerances', async () => {
        const script = `
v1 = 10k + [5%]
v2 = 2 + [1%]
c = v1 * v2
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const c = visitor.dumpVariables().get('c');
        expect(c.toNumber()).toEqual(20000);
        expect(getToleranceBounds(c)).toEqual({ plus: 1200, minus: 1200 });
    });

    test('division pairs numerator plus with denominator minus (cross term)', async () => {
        const script = `
v1 = 10k + [5%, 2%]
v2 = 2 + [3%, 1%]
d = v1 / v2
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const d = visitor.dumpVariables().get('d');
        expect(d.toNumber()).toEqual(5000);
        // relPlus = 0.05 + 0.01 = 0.06 => 300; relMinus = 0.02 + 0.03 = 0.05 => 250
        expect(getToleranceBounds(d)).toEqual({ plus: 300, minus: 250 });
    });

    test('asymmetric tolerance stays independently tracked through addition', async () => {
        const script = `
v1 = 10k + [5%, 2%]
a = v1 + 1k
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const a = visitor.dumpVariables().get('a');
        expect(a.toNumber()).toEqual(11000);
        expect(getToleranceBounds(a)).toEqual({ plus: 500, minus: 200 });
    });

    test('asymmetric tolerance stays independently tracked through multiplication', async () => {
        const script = `
v1 = 10k + [5%, 2%]
c = v1 * 3
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const c = visitor.dumpVariables().get('c');
        expect(c.toNumber()).toEqual(30000);
        expect(getToleranceBounds(c)).toEqual({ plus: 1500, minus: 600 });
    });

    test('one-sided tolerance in addition equals the toleranced operand alone', async () => {
        const script = `
v1 = 10k + [5%]
v2 = 5k
a = v1 + v2
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const a = visitor.dumpVariables().get('a');
        expect(a.toNumber()).toEqual(15000);
        expect(getToleranceBounds(a)).toEqual({ plus: 500, minus: 500 });
    });

    test('one-sided tolerance in multiplication equals the toleranced operand alone', async () => {
        const script = `
v1 = 10k + [5%]
m = v1 * 2
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const m = visitor.dumpVariables().get('m');
        expect(m.toNumber()).toEqual(20000);
        expect(getToleranceBounds(m)).toEqual({ plus: 1000, minus: 1000 });
    });

    test('negation swaps plus and minus tolerance', async () => {
        const script = `
v1 = 10k + [5%, 2%]
a = -v1
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const a = visitor.dumpVariables().get('a');
        expect(a.toNumber()).toEqual(-10000);
        expect(getToleranceBounds(a)).toEqual({ plus: 200, minus: 500 });
    });

    test('modulus on a toleranced operand drops tolerance on the result', async () => {
        const script = `
v2 = 100 + [5%]
e = v2 % 30
`;
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const e = visitor.dumpVariables().get('e');
        expect(e.toNumber()).toEqual(10);
        expect(e.hasTolerances()).toBe(false);
    });

    test('roundDp preserves tolerance onto the rounded result', () => {
        const value = numeric('10.123456789');
        value.setTolerances([new PercentageValue(5)]);

        const rounded = value.roundDp();

        expect(rounded.hasTolerances()).toBe(true);
        expect(rounded.tolerances).toEqual(value.tolerances);
        expect(rounded.toNumber()).toEqual(roundValue(10.123456789).toNumber());
    });
});