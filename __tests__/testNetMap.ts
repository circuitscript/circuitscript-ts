import { NetMap } from "../src/objects/NetMap.js";
import { Net } from "../src/objects/Net.js";
import { GeneratedNetPrefix } from "../src/globals.js";

describe('NetMap generated net counter', () => {

    test('getUniqueNetName returns sequential names', () => {
        const netMap = new NetMap();
        expect(netMap.getUniqueNetName()).toBe(`${GeneratedNetPrefix}1`);
        expect(netMap.getUniqueNetName()).toBe(`${GeneratedNetPrefix}2`);
        expect(netMap.netCounter).toBe(3);
    });

    test('generated net advances the counter', () => {
        const netMap = new NetMap();
        const net = new Net('ns', `${GeneratedNetPrefix}5`, 0);
        expect(netMap.updateCounter(net)).toBe(6);
        expect(netMap.netCounter).toBe(6);
    });

    test('user-defined net with generated-style name is ignored', () => {
        const netMap = new NetMap();
        netMap.updateCounter(new Net('ns', `${GeneratedNetPrefix}5`, 1));
        expect(netMap.netCounter).toBe(1);
    });

    test('net without the prefix is ignored', () => {
        const netMap = new NetMap();
        netMap.updateCounter(new Net('ns', 'VCC', 0));
        expect(netMap.netCounter).toBe(1);
    });

    test('non-numeric suffix does not produce NaN', () => {
        const netMap = new NetMap();
        netMap.updateCounter(new Net('ns', `${GeneratedNetPrefix}(R1-1)`, 0));
        expect(netMap.netCounter).toBe(1);
        expect(Number.isNaN(netMap.netCounter)).toBe(false);
    });

    test('lower value leaves the counter unchanged', () => {
        const netMap = new NetMap();
        netMap.netCounter = 10;
        expect(netMap.updateCounter(new Net('ns', `${GeneratedNetPrefix}3`, 0))).toBe(10);
        expect(netMap.netCounter).toBe(10);
    });

    test('equal value moves the counter past it', () => {
        const netMap = new NetMap();
        netMap.netCounter = 5;
        netMap.updateCounter(new Net('ns', `${GeneratedNetPrefix}5`, 0));
        expect(netMap.netCounter).toBe(6);
        expect(netMap.getUniqueNetName()).toBe(`${GeneratedNetPrefix}6`);
    });

    test('higher value raises the counter', () => {
        const netMap = new NetMap();
        netMap.netCounter = 2;
        netMap.updateCounter(new Net('ns', `${GeneratedNetPrefix}7`, 0));
        expect(netMap.netCounter).toBe(8);
    });
});
