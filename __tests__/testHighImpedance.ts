import { runScript } from "./helpers.js";
import {
    HIGH_IMPEDANCE,
    HighImpedanceValue,
    isHighImpedance,
    NumberOperator,
    numeric,
} from "../src/objects/NumericValue.js";

describe('HighImpedanceValue propagation - NumberOperator', () => {
    const operator = new NumberOperator();
    const hiz = new HighImpedanceValue();
    const two = numeric(2);

    test.each([
        ['multiply', () => operator.multiply(hiz, two)],
        ['multiply (reversed)', () => operator.multiply(two, hiz)],
        ['divide', () => operator.divide(hiz, two)],
        ['divide (reversed)', () => operator.divide(two, hiz)],
        ['addition', () => operator.addition(hiz, two)],
        ['addition (reversed)', () => operator.addition(two, hiz)],
        ['subtraction', () => operator.subtraction(hiz, two)],
        ['subtraction (reversed)', () => operator.subtraction(two, hiz)],
        ['modulus', () => operator.modulus(hiz, two)],
        ['modulus (reversed)', () => operator.modulus(two, hiz)],
    ])('%s propagates HighImpedanceValue', (_name, run) => {
        expect(isHighImpedance(run())).toBe(true);
    });
});

describe('HighImpedanceValue propagation - isHighImpedance guard', () => {
    test('isHighImpedance is true for HIGH_IMPEDANCE', () => {
        expect(isHighImpedance(HIGH_IMPEDANCE)).toBe(true);
    });

    test('isHighImpedance is false for a plain numeric value', () => {
        expect(isHighImpedance(numeric(1))).toBe(false);
    });
});

const spstCircuit = `
from "std" import *

v5 = supply("5V", 5)
gnd = dgnd()

spst = create component:
    pins:
        1: "A"
        2: "B"
        3: "EN"

    arrange:
        left: "A", "EN"
        right: "B"

    behavior: create behavior:
        state (voltage("EN") > 1.6):
            short("A", "B")

        state (voltage("EN") <= 1.6):
            open("A", "B")

out = create component:
    pins:
        1: "OUT"
    arrange:
        right: "OUT"

at v5
wire right 100
to spst pin "A"

at spst:
    "B": wire right 100 to out pin "OUT"
    "EN": wire left 200
`;

describe('HighImpedanceValue propagation - end-to-end scripts', () => {
    test('arithmetic on a Hi-Z voltage stays Hi-Z and does not throw', async () => {
        const script = `${spstCircuit}
create scenario "Switch open":
    set_voltage(v5, 5)
    set_voltage(spst, "EN", 0)

    evaluate()

    v = voltage(out, "OUT")
    expect(is_z(v))
    expect(is_z(v * 2))
    expect(is_z(2 * v))
    expect(is_z(v + 1))
    expect(is_z(v - 1))
    expect(is_z(v / 2))
    expect(is_z(v % 2))
    expect(is_z(-v))
`;
        const { hasError } = await runScript(script);
        expect(hasError).toBe(false);
    });

    test('compound assignment on a Hi-Z voltage stays Hi-Z', async () => {
        const script = `${spstCircuit}
create scenario "Switch open":
    set_voltage(v5, 5)
    set_voltage(spst, "EN", 0)

    evaluate()

    v = voltage(out, "OUT")
    v += 1
    v -= 1
    v *= 2
    v /= 2
    v %= 3
    expect(is_z(v))
`;
        const { hasError } = await runScript(script);
        expect(hasError).toBe(false);
    });

    test('comparisons involving a Hi-Z voltage mirror NaN semantics', async () => {
        const script = `${spstCircuit}
create scenario "Switch open":
    set_voltage(v5, 5)
    set_voltage(spst, "EN", 0)

    evaluate()

    v = voltage(out, "OUT")
    eq_result = (v == v)
    neq_result = (v != v)
    gt_result = (v > 1)
    lt_result = (v < 1)
    gte_result = (v >= 1)
    lte_result = (v <= 1)

    expect(eq_result == false)
    expect(neq_result == true)
    expect(gt_result == false)
    expect(lt_result == false)
    expect(gte_result == false)
    expect(lte_result == false)
`;
        const { hasError } = await runScript(script);
        expect(hasError).toBe(false);
    });

    test('chained comparison through a Hi-Z voltage resolves to false', async () => {
        const script = `${spstCircuit}
create scenario "Switch open":
    set_voltage(v5, 5)
    set_voltage(spst, "EN", 0)

    evaluate()

    v = voltage(out, "OUT")
    chained = 1 < v < 10
    expect(chained == false)
`;
        const { hasError } = await runScript(script);
        expect(hasError).toBe(false);
    });

    test('a solved (non Hi-Z) voltage is unaffected by is_z()', async () => {
        const script = `${spstCircuit}
create scenario "Switch closed":
    set_voltage(v5, 5)
    set_voltage(spst, "EN", 3.3)

    evaluate()

    v = voltage(out, "OUT")
    expect(!is_z(v))
    expect(!is_z(v * 2))
    expect((v == v) == true)
`;
        const { hasError } = await runScript(script);
        expect(hasError).toBe(false);
    });
});
