import { ComponentPinNet } from "../src/objects/types";


export class ScriptTest {

    script: string;
    expected: ComponentPinNet[];

    constructor(script:string, expected: ComponentPinNet[]){
        this.script = script;
        this.expected = expected;
    }
}

export const script1 = new ScriptTest(`
U1 = create component:
    pins: 10

U2 = create component:
    pins: 10

at U1: 
    2:
        wire right 200 
        to U2 pin 1

at U1 pin 10
wire right 180 up 40

branch:
    wire auto
    to U2 pin 5

wire auto
to U2 pin 3
`, [
    ['/NET_1', 'U1', 2],
    ['/NET_1', 'U2', 1],
    ['/NET_2', 'U1', 10],
    ['/NET_2', 'U2', 5],
    ['/NET_2', 'U2', 3]
]);

export const script2 = new ScriptTest(`
import lib
gnd = dgnd()

# Test functions
def power_input():
    return create component:
        pins: 3
        arrange:
            left: 1,3
            right: 2


J1 = power_input()

at J1 pin 1
wire left 20 down 20

branch:
    wire right 20
    to J1 pin 3

wire down 20
to gnd
`, [
    [ '/GND', 'gnd', 1 ],
    [ '/GND', 'J1', 1 ],
    [ '/GND', 'J1', 3 ],
    [ '/GND', 'gnd:0', 1 ]
  ]);

export const script3 = new ScriptTest(`
import lib

at label("hello")
wire right 40 

branch:
    wire down 40
    
    branch:
        wire down 20
        add diode() ..angle = 90

    wire left 20
    add diode() pin 2
    wire left 20 down 20
    add diode() ..angle = 90

wire right 40 
add diode()
`, [
    [ '/NET_1', 'diode_1.COMP_1', 1 ],
    [ '/NET_1', 'diode_2.COMP_1', 1 ],
    [ '/hello', 'label_0.COMP_1_1', 1 ],
    [ '/hello', 'label_0.COMP_1_1:0', 1 ],
    [ '/hello', 'diode_0.COMP_1', 1 ],
    [ '/hello', 'diode_1.COMP_1', 2 ],
    [ '/hello', 'diode_3.COMP_1', 1 ]
  ]);

export const script6 = new ScriptTest(`
import lib

vcc = net("3v3")
midpt = net("out")
gnd = dgnd()

at vcc
wire down 20
add res(20k) down
wire down 20
branch:
    wire down 20
    add res(20k) down
    wire down 20
    to gnd
wire right 60
to midpt ..angle = 90

at vcc
wire down 20
add res(10k) down
wire down 20 right 40 up 20
to midpt
`, [
    [ '/3v3', 'vcc', 1 ],
    [ '/3v3', 'vcc:0', 1 ],
    [ '/3v3', 'res_0.COMP_1_20k', 1 ],
    [ '/3v3', 'vcc:1', 1 ],
    [ '/3v3', 'res_2.COMP_1_10k', 1 ],
    [ '/GND', 'gnd', 1 ],
    [ '/GND', 'gnd:0', 1 ],
    [ '/GND', 'res_1.COMP_1_20k', 2 ],
    [ '/out', 'midpt', 1 ],
    [ '/out', 'res_0.COMP_1_20k', 2 ],
    [ '/out', 'res_1.COMP_1_20k', 1 ],
    [ '/out', 'midpt:0', 1 ],
    [ '/out', 'midpt:1', 1 ],
    [ '/out', 'res_2.COMP_1_10k', 2 ]
  ]);

export const script7 = new ScriptTest(`
import lib

v5v = net("5V")
gnd = dgnd()

def tmp1():
    at v5v
    wire down 20
    add res(10k)
    wire down 20
    to gnd

tmp1()

tmp1()
`, [
    [ '/5V', 'v5v', 1 ],
    [ '/5V', 'tmp1_0.v5v:0', 1 ],
    [ '/5V', 'tmp1_0.res_0.COMP_1_10k', 1 ],
    [ '/5V', 'tmp1_1.v5v:0', 1 ],
    [ '/5V', 'tmp1_1.res_1.COMP_1_10k', 1 ],
    [ '/GND', 'gnd', 1 ],
    [ '/GND', 'tmp1_0.gnd:0', 1 ],
    [ '/GND', 'tmp1_0.res_0.COMP_1_10k', 2 ],
    [ '/GND', 'tmp1_1.gnd:0', 1 ],
    [ '/GND', 'tmp1_1.res_1.COMP_1_10k', 2 ]
  ]);

export  const script8 = new ScriptTest(`
import lib

v5v = supply("5v")
gnd = dgnd()

def divider(power_net, r1, r2, output_net):
    at power_net
    wire down 20
    add res(r1) down
    wire down 20

    branch:
        wire right 20
        add output_net
        wire right 20

    wire down 20
    add res(r2) down
    wire down 20
    to gnd

divider(v5v, 10k, 20k, label("hello"))
`,  [
    [ '/5v', 'v5v', 1 ],
    [ '/5v', 'divider_0.v5v:0', 1 ],
    [ '/5v', 'divider_0.res_0.COMP_1_10k', 1 ],
    [ '/GND', 'gnd', 1 ],
    [ '/GND', 'divider_0.gnd:0', 1 ],
    [ '/GND', 'divider_0.res_1.COMP_1_20k', 2 ],
    [ '/hello', 'label_0.COMP_1_1', 1 ],
    [ '/hello', 'divider_0.res_0.COMP_1_10k', 2 ],
    [ '/hello', 'divider_0.res_1.COMP_1_20k', 1 ]
  ]);

export const script9 = new ScriptTest(`
import lib

v5v = supply("5v")
gnd = dgnd()

net("global_name")

def divider(power_net, r1, r2, net_name):
    frame:
        ..border = 0
        
        at power_net
        wire down 20
        add res(r1) down
        wire down 20

        branch:
            wire right 20
            add label("inner_name")
            wire right 60
            add res(100k) right
            wire right 20
            add / label("global_name")
            wire right 40

            add res(0)

            add / label("global_name_2")

        wire down 20
        add res(r2) down
        wire down 20
        to gnd

frame:
    ..border = 0
    ..direction = "row"

    /div1 divider(v5v, 10k, 20k, "hello2")
    /div2 divider(v5v, 10k, 20k, "hello1")
`, [
    [ '/5v', 'v5v', 1 ],
    [ '/5v', 'divider_0.v5v:0', 1 ],
    [ '/5v', 'divider_0.res_0.COMP_1_10k', 1 ],
    [ '/5v', 'divider_1.v5v:0', 1 ],
    [ '/5v', 'divider_1.res_4.COMP_1_10k', 1 ],
    [ '/GND', 'gnd', 1 ],
    [ '/GND', 'divider_0.gnd:0', 1 ],
    [ '/GND', 'divider_0.res_3.COMP_1_20k', 2 ],
    [ '/GND', 'divider_1.gnd:0', 1 ],
    [ '/GND', 'divider_1.res_7.COMP_1_20k', 2 ],
    [ '/div1/inner_name', 'divider_0.label_0.COMP_1_1', 1 ],
    [ '/div1/inner_name', 'divider_0.res_0.COMP_1_10k', 2 ],
    [ '/div1/inner_name', 'divider_0.res_1.COMP_1_100k', 1 ],
    [ '/div1/inner_name', 'divider_0.res_3.COMP_1_20k', 1 ],
    [ '/div2/inner_name', 'divider_1.label_3.COMP_1_1', 1 ],
    [ '/div2/inner_name', 'divider_1.res_4.COMP_1_10k', 2 ],
    [ '/div2/inner_name', 'divider_1.res_5.COMP_1_100k', 1 ],
    [ '/div2/inner_name', 'divider_1.res_7.COMP_1_20k', 1 ],
    [ '/global_name', 'net_0.COMP_1_1', 1 ],
    [ '/global_name', 'divider_0.label_1.COMP_1_1', 1 ],
    [ '/global_name', 'divider_0.res_1.COMP_1_100k', 2 ],
    [ '/global_name', 'divider_0.res_2.COMP_1_0', 1 ],
    [ '/global_name', 'divider_1.label_4.COMP_1_1', 1 ],
    [ '/global_name', 'divider_1.res_5.COMP_1_100k', 2 ],
    [ '/global_name', 'divider_1.res_6.COMP_1_0', 1 ],
    [ '/global_name_2', 'divider_0.label_2.COMP_1_1', 1 ],
    [ '/global_name_2', 'divider_0.res_2.COMP_1_0', 2 ],
    [ '/global_name_2', 'divider_1.label_5.COMP_1_1', 1 ],
    [ '/global_name_2', 'divider_1.res_6.COMP_1_0', 2 ]
  ]);

export const script10 = new ScriptTest(`
import lib
gnd = dgnd()

at v5v = supply("5V")
wire down 20
add R1 = res(10k) down
wire down 20
add R2 = res(10k) down
wire down 20
to C1 = cap(10n) down

at C1 pin 2
wire down 20
to gnd
`, [
    ['/5V', 'v5v', 1],
    ['/5V', 'v5v:0', 1],
    ['/5V', 'R1', 1],
    ['/GND', 'gnd', 1],
    ['/GND', 'gnd:0', 1],
    ['/GND', 'C1', 2],
    ['/NET_1', 'R1', 2],
    ['/NET_1', 'R2', 1],
    ['/NET_2', 'R2', 2],
    ['/NET_2', 'C1', 1]
]);

export const script11 = new ScriptTest(`
import lib

v5v = supply("5V")

def tmp1():
    wire right 20
    add res(0)
    wire right 20
    add label("label_1")

    wire right 40
    add res(0)
    add / label("global_label")

    wire right 80
    add res(0)
    
    +/inner tmp2()

def tmp2():
    wire right 20
    add res(0)
    add label("label_2")
    wire right 40

at v5v
wire down 20
branch:
    /scope1 tmp1()

wire down 40
branch:
    /scope2 tmp1()
`, [
    ['/5V', 'v5v', 1],
    ['/5V', 'v5v:0', 1],
    ['/5V', 'tmp1_0.__root', 1],
    ['/5V', 'tmp1_0.res_0.COMP_1_0', 1],
    ['/5V', 'tmp1_1.__root', 1],
    ['/5V', 'tmp1_1.res_4.COMP_1_0', 1],
    ['/global_label', 'tmp1_0.label_1.COMP_1_1', 1],
    ['/global_label', 'tmp1_0.res_1.COMP_1_0', 2],
    ['/global_label', 'tmp1_0.res_2.COMP_1_0', 1],
    ['/global_label', 'tmp1_1.label_4.COMP_1_1', 1],
    ['/global_label', 'tmp1_1.res_5.COMP_1_0', 2],
    ['/global_label', 'tmp1_1.res_6.COMP_1_0', 1],
    ['/scope1/inner/NET_1', 'tmp2_0.__root', 1],
    ['/scope1/inner/NET_1', 'tmp1_0.tmp2_0.res_3.COMP_1_0', 1],
    ['/scope1/inner/NET_1', 'tmp1_0.res_2.COMP_1_0', 2],
    ['/scope1/inner/label_2', 'tmp1_0.tmp2_0.label_2.COMP_1_1', 1],
    ['/scope1/inner/label_2', 'tmp1_0.tmp2_0.res_3.COMP_1_0', 2],
    ['/scope1/label_1', 'tmp1_0.label_0.COMP_1_1', 1],
    ['/scope1/label_1', 'tmp1_0.res_0.COMP_1_0', 2],
    ['/scope1/label_1', 'tmp1_0.res_1.COMP_1_0', 1],
    ['/scope2/inner/NET_1', 'tmp2_1.__root', 1],
    ['/scope2/inner/NET_1', 'tmp1_1.tmp2_1.res_7.COMP_1_0', 1],
    ['/scope2/inner/NET_1', 'tmp1_1.res_6.COMP_1_0', 2],
    ['/scope2/inner/label_2', 'tmp1_1.tmp2_1.label_5.COMP_1_1', 1],
    ['/scope2/inner/label_2', 'tmp1_1.tmp2_1.res_7.COMP_1_0', 2],
    ['/scope2/label_1', 'tmp1_1.label_3.COMP_1_1', 1],
    ['/scope2/label_1', 'tmp1_1.res_4.COMP_1_0', 2],
    ['/scope2/label_1', 'tmp1_1.res_5.COMP_1_0', 1]
]);

export const script12 = new ScriptTest(`
my_net = create component:
    pins: 1
    params:
        __is_net: 1
        net_name: "hello"

at my_net
`, [
    ['/hello', 'my_net', 1],
    ['/hello', 'my_net:0', 1
    ]]);


/*
After a function call, the correct graph position should be resumed from.
This test also checks the join keyword
*/
export const script13 = new ScriptTest(`import lib

v5v = supply("5V")
gnd = dgnd()

def led_with_res():
    add led("yellow") pin 2 right
    wire right 20
    add res(1k)
    wire right 20

join:
    at gnd left
    wire right 20
    add label("TXLED")
    wire right 60
    led_with_res()

join:
    at gnd left
    wire right 20
    add label("RXLED")
    wire right 60
    led_with_res()
    wire up 100

wire up 20
to v5v`,
[
    [ '/5V', 'v5v', 1 ],
    [ '/5V', 'led_with_res_0.res_0.COMP_1_1k', 2 ],
    [ '/5V', '_join.__.0', 1 ],
    [ '/5V', 'led_with_res_1.res_1.COMP_1_1k', 2 ],
    [ '/5V', 'v5v:0', 1 ],
    [ '/GND', 'gnd', 1 ],
    [ '/GND', 'gnd:0', 1 ],
    [ '/GND', 'label_0.COMP_1_1', 1 ],
    [ '/GND', 'led_with_res_0.__root', 1 ],
    [ '/GND', 'led_with_res_0.led_0.COMP_1_0603', 2 ],
    [ '/GND', 'gnd:1', 1 ],
    [ '/GND', 'label_1.COMP_1_1', 1 ],
    [ '/GND', 'led_with_res_1.__root', 1 ],
    [ '/GND', 'led_with_res_1.led_1.COMP_1_0603', 2 ],
    [ '/NET_2', 'led_with_res_0.led_0.COMP_1_0603', 1 ],
    [ '/NET_2', 'led_with_res_0.res_0.COMP_1_1k', 1 ],
    [ '/NET_2', 'led_with_res_1.led_1.COMP_1_0603', 1 ],
    [ '/NET_2', 'led_with_res_1.res_1.COMP_1_1k', 1 ]
  ]);



/**
Tests the `point` branching keyword
 */
export const script14 = new ScriptTest(`
import lib

v5v = supply("5V")
gnd = dgnd()

at v5v
wire down 20
add res(360) down
wire down 20

point:
    at v5v
    wire down 20
    add res(360) down
    wire down 20 

    branch:
        wire left 100
        to point

    wire down 20
    add res(360) down
    wire down 20
    to gnd

    at point
    wire right 200 down 20
    add res(360) down
    wire down 20
    to gnd

wire down 20
add led("red") down
wire down 40
to gnd`, [
    [ '/5V', 'v5v', 1 ],
    [ '/5V', 'v5v:0', 1 ],
    [ '/5V', 'res_0.COMP_1_360', 1 ],
    [ '/5V', 'v5v:1', 1 ],
    [ '/5V', 'res_1.COMP_1_360', 1 ],
    [ '/GND', 'gnd', 1 ],
    [ '/GND', 'gnd:0', 1 ],
    [ '/GND', 'res_2.COMP_1_360', 2 ],
    [ '/GND', 'gnd:1', 1 ],
    [ '/GND', 'res_3.COMP_1_360', 2 ],
    [ '/GND', 'gnd:2', 1 ],
    [ '/GND', 'led_0.COMP_1_0603', 2 ],
    [ '/NET_1', 'res_0.COMP_1_360', 2 ],
    [ '/NET_1', '_point.__.0', 1 ],
    [ '/NET_1', 'res_1.COMP_1_360', 2 ],
    [ '/NET_1', 'res_2.COMP_1_360', 1 ],
    [ '/NET_1', 'res_3.COMP_1_360', 1 ],
    [ '/NET_1', 'led_0.COMP_1_0603', 1 ]
]);