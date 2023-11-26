import { LayoutEngine } from "../src/layout2";
import { generateSVG2 } from "../src/render2";
import { runScript } from "./helpers";

describe('Render tests', () => {

    test('component annotation', async () => {
        const {hasError, visitor} = await runScript(script1);
        expect(hasError).toBe(false);
        visitor.annotateComponents();

        const { sequence, nets } = visitor.getGraph();

        const layoutEngine = new LayoutEngine();
        const graph = await layoutEngine.runLayout(sequence, nets);

        const svgOutput = generateSVG2(graph);
        expect(svgOutput).toBe(expectedSvgOutput);
    });
});

const script1 = `
import lib

variant = "MainVariantX"

at net("5V")
wire down 20
branch:
    wire down 20
    add res(10k) [angle = 90]
    ..place = (variant == "MainVariant")
    wire down 20 to gnd

wire right 40
branch:
    wire down 20
    add res(20k) [angle=90]
    ..place = true
    wire down 20
    to gnd

wire right 40
branch:
    wire down 20
    add cap(100n)
    wire down 20
    to gnd
`

const expectedSvgOutput = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="190" height="250" viewBox="-45 -65 190 250"><g transform="matrix(1,0,0,1,0,0)"><path d="M -40 -60 L -40 180 M -20 -60 L -20 180 M 0 -60 L 0 180 M 20 -60 L 20 180 M 40 -60 L 40 180 M 60 -60 L 60 180 M 80 -60 L 80 180 M 100 -60 L 100 180 M 120 -60 L 120 180 M 140 -60 L 140 180 M -40 -60 L 140 -60 M -40 -40 L 140 -40 M -40 -20 L 140 -20 M -40 0 L 140 0 M -40 20 L 140 20 M -40 40 L 140 40 M -40 60 L 140 60 M -40 80 L 140 80 M -40 100 L 140 100 M -40 120 L 140 120 M -40 140 L 140 140 M -40 160 L 140 160 M -40 180 L 140 180" fill="none" stroke-width="1" stroke="#eeeeee"></path></g><g transform="matrix(1,0,0,1,0,-10)"><g><path d="M -15 0 L 15 0" stroke-width="2" stroke="#333333" fill="#fffeaf"></path><path d="M 0 0 L 0 10" stroke-width="2" stroke="#333333"></path><text fill="#333333" font-family="Inter, Arial" font-size="10" text-anchor="middle" dominant-baseline="text-top" transform="matrix(1,0,0,1,0,-5)" svgjs:data="{&quot;leading&quot;:&quot;1.3&quot;}"><tspan dy="0" x="0" svgjs:data="{&quot;newLined&quot;:true}">5V</tspan></text></g></g><g transform="matrix(1,0,0,1,2.4492935982947065e-15,80)"><g><path d="M 9.999999999999998 -20 L 10.000000000000002 20 L -9.999999999999998 20 L -10.000000000000002 -20 L 9.999999999999998 -20" stroke-width="2" stroke="#333333" fill="#fffeaf"></path><path d="M -1.2246467991473533e-15 -20 L -2.4492935982947065e-15 -40 M 1.2246467991473533e-15 20 L 2.4492935982947065e-15 40" stroke-width="2" stroke="#333333"></path><text fill="#333333" font-family="Inter, Arial" font-size="10" text-anchor="middle" dominant-baseline="middle" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)" svgjs:data="{&quot;leading&quot;:&quot;1.3&quot;}"><tspan dy="0" x="0" svgjs:data="{&quot;newLined&quot;:true}">10k</tspan></text><text fill="#333333" font-family="Inter, Arial" font-size="10" text-anchor="start" dominant-baseline="text-top" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,14.999999999999998,-20)" svgjs:data="{&quot;leading&quot;:&quot;1.3&quot;}"><tspan dy="0" x="0" svgjs:data="{&quot;newLined&quot;:true}">R1</tspan></text><path d="M -10.000000000000002 -40 L 10.000000000000002 40 M 10.000000000000002 -40 L -10.000000000000002 40" stroke-width="2" stroke="red"></path></g></g><g transform="matrix(1,0,0,1,4.898587196589413e-15,150)"><g><path d="M -15 0 L 15 0 M -10 5 L 10 5 M -5 10 L 5 10" stroke-width="2" stroke="#333333" fill="#fffeaf"></path><path d="M 0 0 L 0 -10" stroke-width="2" stroke="#333333"></path></g></g><g transform="matrix(1,0,0,1,40,80)"><g><path d="M 9.999999999999998 -20 L 10.000000000000002 20 L -9.999999999999998 20 L -10.000000000000002 -20 L 9.999999999999998 -20" stroke-width="2" stroke="#333333" fill="#fffeaf"></path><path d="M -1.2246467991473533e-15 -20 L -2.4492935982947065e-15 -40 M 1.2246467991473533e-15 20 L 2.4492935982947065e-15 40" stroke-width="2" stroke="#333333"></path><text fill="#333333" font-family="Inter, Arial" font-size="10" text-anchor="middle" dominant-baseline="middle" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)" svgjs:data="{&quot;leading&quot;:&quot;1.3&quot;}"><tspan dy="0" x="0" svgjs:data="{&quot;newLined&quot;:true}">20k</tspan></text><text fill="#333333" font-family="Inter, Arial" font-size="10" text-anchor="start" dominant-baseline="text-top" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,14.999999999999998,-20)" svgjs:data="{&quot;leading&quot;:&quot;1.3&quot;}"><tspan dy="0" x="0" svgjs:data="{&quot;newLined&quot;:true}">R2</tspan></text></g></g><g transform="matrix(1,0,0,1,40,150)"><g><path d="M -15 0 L 15 0 M -10 5 L 10 5 M -5 10 L 5 10" stroke-width="2" stroke="#333333" fill="#fffeaf"></path><path d="M 0 0 L 0 -10" stroke-width="2" stroke="#333333"></path></g></g><g transform="matrix(1,0,0,1,80,60)"><g><path d="M -10 -3 L 10 -3 M -10 3 L 10 3" stroke-width="2" stroke="#333333" fill="#fffeaf"></path><path d="M 0 -3 L 0 -20 M 0 3 L 0 20" stroke-width="2" stroke="#333333"></path><text fill="#333333" font-family="Inter, Arial" font-size="10" text-anchor="start" dominant-baseline="text-top" transform="matrix(1,0,0,1,12,0)" svgjs:data="{&quot;leading&quot;:&quot;1.3&quot;}"><tspan dy="0" x="0" svgjs:data="{&quot;newLined&quot;:true}">C1</tspan></text><text fill="#333333" font-family="Inter, Arial" font-size="10" text-anchor="start" dominant-baseline="hanging" transform="matrix(1,0,0,1,12,12)" svgjs:data="{&quot;leading&quot;:&quot;1.3&quot;}"><tspan dy="0" x="0" svgjs:data="{&quot;newLined&quot;:true}">100n</tspan></text></g></g><g transform="matrix(1,0,0,1,80,110)"><g><path d="M -15 0 L 15 0 M -10 5 L 10 5 M -5 10 L 5 10" stroke-width="2" stroke="#333333" fill="#fffeaf"></path><path d="M 0 0 L 0 -10" stroke-width="2" stroke="#333333"></path></g></g><g><line x1="0" y1="0" x2="0" y2="20" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line><line x1="0" y1="20" x2="0" y2="40" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line><line x1="0" y1="20" x2="40" y2="20" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line><line x1="40" y1="20" x2="40" y2="40" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line><line x1="40" y1="20" x2="80" y2="20" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line><line x1="80" y1="20" x2="80" y2="40" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line><circle r="2.5" cx="2.5" cy="2.5" transform="matrix(1,0,0,1,-2.5,17.5)" fill="#008400" stroke="none"></circle><circle r="2.5" cx="2.5" cy="2.5" transform="matrix(1,0,0,1,37.5,17.5)" fill="#008400" stroke="none"></circle><line x1="4.898587196589413e-15" y1="120" x2="4.898587196589413e-15" y2="140" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line><line x1="40" y1="120" x2="40" y2="140" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line><line x1="80" y1="80" x2="80" y2="100" stroke-linecap="square" stroke-width="1" stroke="#008400" fill="none"></line></g><g transform="matrix(1,0,0,1,0,0)"><circle r="2.5" cx="2.5" cy="2.5" transform="matrix(1,0,0,1,-2.5,-2.5)" stroke="none" fill="red"></circle></g></svg>`;
