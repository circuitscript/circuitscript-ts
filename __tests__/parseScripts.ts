import { ComponentPinNet } from "../src/objects/types";
import { loadScriptFromFile } from "./helpers";

export class ScriptTest<T>{

    script: string;
    expected: T[];

    constructor(script: string, expected: T[]) {
        this.script = script;
        this.expected = expected;
    }
}

export const script1 = new ScriptTest<ComponentPinNet>(`
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
gnd = dgnd("XGND")

# Test functions
def power_input():
    return create component:
        pins: 
            1: input, "1"
            2: any, "2"
            3: input, "3"
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
    ['/XGND', 'gnd', 1],
    ['/XGND', 'J1', 1],
    ['/XGND', 'J1', 3],
    ['/XGND', 'gnd:0', 1]
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
    ['/NET_1', 'diode_1.COMP_1', 1],
    ['/NET_1', 'diode_2.COMP_1', 1],
    ['/hello', 'label_0.COMP_1_hello', 1],
    ['/hello', 'label_0.COMP_1_hello:0', 1],
    ['/hello', 'diode_0.COMP_1', 1],
    ['/hello', 'diode_1.COMP_1', 2],
    ['/hello', 'diode_3.COMP_1', 1]
]);

export const script6 = new ScriptTest(`
import lib

vcc = net("3v3")
midpt = net("out")
gnd = dgnd()

at vcc
wire down 20
add res(20k) angle:90
wire down 20
branch:
    wire down 20
    add res(20k) angle:90
    wire down 20
    to gnd
wire right 60
to midpt ..angle = 90

at vcc
wire down 20
add res(10k) angle:90
wire down 20 right 40 up 20
to midpt
`, [
    ['/3v3', 'vcc', 1],
    ['/3v3', 'vcc:0', 1],
    ['/3v3', 'res_0.COMP_1_20k', 1],
    ['/3v3', 'vcc:1', 1],
    ['/3v3', 'res_2.COMP_1_10k', 1],
    ['/GND', 'gnd', 1],
    ['/GND', 'gnd:0', 1],
    ['/GND', 'res_1.COMP_1_20k', 2],
    ['/out', 'midpt', 1],
    ['/out', 'res_0.COMP_1_20k', 2],
    ['/out', 'res_1.COMP_1_20k', 1],
    ['/out', 'midpt:0', 1],
    ['/out', 'midpt:1', 1],
    ['/out', 'res_2.COMP_1_10k', 2]
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
    ['/5V', 'v5v', 1],
    ['/5V', 'tmp1_0.v5v:0', 1],
    ['/5V', 'tmp1_0.res_0.COMP_1_10k', 1],
    ['/5V', 'tmp1_1.v5v:0', 1],
    ['/5V', 'tmp1_1.res_1.COMP_1_10k', 1],
    ['/GND', 'gnd', 1],
    ['/GND', 'tmp1_0.gnd:0', 1],
    ['/GND', 'tmp1_0.res_0.COMP_1_10k', 2],
    ['/GND', 'tmp1_1.gnd:0', 1],
    ['/GND', 'tmp1_1.res_1.COMP_1_10k', 2]
]);

export const script8 = new ScriptTest(`
import lib

v5v = supply("5v")
gnd = dgnd()

def divider(power_net, r1, r2, output_net):
    at power_net
    wire down 20
    add res(r1) angle:90
    wire down 20

    branch:
        wire right 20
        add output_net
        wire right 20

    wire down 20
    add res(r2) angle:90
    wire down 20
    to gnd

divider(v5v, 10k, 20k, label("hello"))
`, [
    ['/5v', 'v5v', 1],
    ['/5v', 'divider_0.v5v:0', 1],
    ['/5v', 'divider_0.res_0.COMP_1_10k', 1],
    ['/GND', 'gnd', 1],
    ['/GND', 'divider_0.gnd:0', 1],
    ['/GND', 'divider_0.res_1.COMP_1_20k', 2],
    ['/hello', 'label_0.COMP_1_hello', 1],
    ['/hello', 'divider_0.label_0.COMP_1_hello:0', 1],
    ['/hello', 'divider_0.res_0.COMP_1_10k', 2],
    ['/hello', 'divider_0.res_1.COMP_1_20k', 1]
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
        add res(r1) angle:90
        wire down 20

        branch:
            wire right 20
            add label("inner_name")
            wire right 60
            add res(100k)
            wire right 20
            add / label("global_name")
            wire right 40

            add res(0)

            add / label("global_name_2")

        wire down 20
        add res(r2) angle:90
        wire down 20
        to gnd

frame:
    ..border = 0
    ..direction = "row"

    /div1 divider(v5v, 10k, 20k, "hello2")
    /div2 divider(v5v, 10k, 20k, "hello1")
`, [
    ['/5v', 'v5v', 1],
    ['/5v', 'divider_0.v5v:0', 1],
    ['/5v', 'divider_0.res_0.COMP_1_10k', 1],
    ['/5v', 'divider_1.v5v:0', 1],
    ['/5v', 'divider_1.res_4.COMP_1_10k', 1],
    ['/GND', 'gnd', 1],
    ['/GND', 'divider_0.gnd:0', 1],
    ['/GND', 'divider_0.res_3.COMP_1_20k', 2],
    ['/GND', 'divider_1.gnd:0', 1],
    ['/GND', 'divider_1.res_7.COMP_1_20k', 2],
    ['/div1/inner_name', 'divider_0.label_0.COMP_1_inner_name', 1],
    ['/div1/inner_name', 'divider_0.label_0.COMP_1_inner_name:0', 1],
    ['/div1/inner_name', 'divider_0.res_0.COMP_1_10k', 2],
    ['/div1/inner_name', 'divider_0.res_1.COMP_1_100k', 1],
    ['/div1/inner_name', 'divider_0.res_3.COMP_1_20k', 1],
    ['/div2/inner_name', 'divider_1.label_3.COMP_1_inner_name', 1],
    ['/div2/inner_name', 'divider_1.label_3.COMP_1_inner_name:0', 1],
    ['/div2/inner_name', 'divider_1.res_4.COMP_1_10k', 2],
    ['/div2/inner_name', 'divider_1.res_5.COMP_1_100k', 1],
    ['/div2/inner_name', 'divider_1.res_7.COMP_1_20k', 1],
    ['/global_name', 'net_0.COMP_1_global_name', 1],
    ['/global_name', 'divider_0.label_1.COMP_1_global_name', 1],
    ['/global_name', 'divider_0.label_1.COMP_1_global_name:0', 1],
    ['/global_name', 'divider_0.res_1.COMP_1_100k', 2],
    ['/global_name', 'divider_0.res_2.COMP_1_0', 1],
    ['/global_name', 'divider_1.label_4.COMP_1_global_name', 1],
    ['/global_name', 'divider_1.label_4.COMP_1_global_name:0', 1],
    ['/global_name', 'divider_1.res_5.COMP_1_100k', 2],
    ['/global_name', 'divider_1.res_6.COMP_1_0', 1],
    ['/global_name_2', 'divider_0.label_2.COMP_1_global_name_2', 1],
    ['/global_name_2', 'divider_0.label_2.COMP_1_global_name_2:0', 1],
    ['/global_name_2', 'divider_0.res_2.COMP_1_0', 2],
    ['/global_name_2', 'divider_1.label_5.COMP_1_global_name_2', 1],
    ['/global_name_2', 'divider_1.label_5.COMP_1_global_name_2:0', 1],
    ['/global_name_2', 'divider_1.res_6.COMP_1_0', 2]
]);

export const script10 = new ScriptTest(`
import lib
gnd = dgnd()

at v5v = supply("5V")
wire down 20
add R1 = res(10k) angle:90
wire down 20
add R2 = res(10k) angle:90
wire down 20
to C1 = cap(10n) angle:90

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
    ['/global_label', 'tmp1_0.label_1.COMP_1_global_label', 1],
    ['/global_label', 'tmp1_0.label_1.COMP_1_global_label:0', 1],
    ['/global_label', 'tmp1_0.res_1.COMP_1_0', 2],
    ['/global_label', 'tmp1_0.res_2.COMP_1_0', 1],
    ['/global_label', 'tmp1_1.label_4.COMP_1_global_label', 1],
    ['/global_label', 'tmp1_1.label_4.COMP_1_global_label:0', 1],
    ['/global_label', 'tmp1_1.res_5.COMP_1_0', 2],
    ['/global_label', 'tmp1_1.res_6.COMP_1_0', 1],
    ['/scope1/inner/NET_1', 'tmp2_0.__root', 1],
    ['/scope1/inner/NET_1', 'tmp1_0.tmp2_0.res_3.COMP_1_0', 1],
    ['/scope1/inner/NET_1', 'tmp1_0.res_2.COMP_1_0', 2],
    [
        '/scope1/inner/label_2',
        'tmp1_0.tmp2_0.label_2.COMP_1_label_2',
        1
    ],
    [
        '/scope1/inner/label_2',
        'tmp1_0.tmp2_0.label_2.COMP_1_label_2:0',
        1
    ],
    ['/scope1/inner/label_2', 'tmp1_0.tmp2_0.res_3.COMP_1_0', 2],
    ['/scope1/label_1', 'tmp1_0.label_0.COMP_1_label_1', 1],
    ['/scope1/label_1', 'tmp1_0.label_0.COMP_1_label_1:0', 1],
    ['/scope1/label_1', 'tmp1_0.res_0.COMP_1_0', 2],
    ['/scope1/label_1', 'tmp1_0.res_1.COMP_1_0', 1],
    ['/scope2/inner/NET_1', 'tmp2_1.__root', 1],
    ['/scope2/inner/NET_1', 'tmp1_1.tmp2_1.res_7.COMP_1_0', 1],
    ['/scope2/inner/NET_1', 'tmp1_1.res_6.COMP_1_0', 2],
    [
        '/scope2/inner/label_2',
        'tmp1_1.tmp2_1.label_5.COMP_1_label_2',
        1
    ],
    [
        '/scope2/inner/label_2',
        'tmp1_1.tmp2_1.label_5.COMP_1_label_2:0',
        1
    ],
    ['/scope2/inner/label_2', 'tmp1_1.tmp2_1.res_7.COMP_1_0', 2],
    ['/scope2/label_1', 'tmp1_1.label_3.COMP_1_label_1', 1],
    ['/scope2/label_1', 'tmp1_1.label_3.COMP_1_label_1:0', 1],
    ['/scope2/label_1', 'tmp1_1.res_4.COMP_1_0', 2],
    ['/scope2/label_1', 'tmp1_1.res_5.COMP_1_0', 1]
]);

export const script12 = new ScriptTest(`
my_net = create component:
    pins: 1
    copy: 1
    type: "net"
    params:
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
export const script13 = new ScriptTest(`
import lib

v5v = supply("5V")
gnd = dgnd()

def led_with_res():
    add led("yellow") angle:180 pin 2
    wire right 20
    add res(1k)
    wire right 20

join:
    at gnd angle:90
    wire right 20
    add label("TXLED")
    wire right 60
    led_with_res()

join:
    at gnd angle:90
    wire right 20
    add label("RXLED")
    wire right 60
    led_with_res()
    wire up 100

wire up 20
to v5v`,
    [
        ['/5V', 'v5v', 1],
        ['/5V', 'led_with_res_0.res_0.COMP_1_1k', 2],
        ['/5V', '_join.__.0', 1],
        ['/5V', 'led_with_res_1.res_1.COMP_1_1k', 2],
        ['/5V', 'v5v:0', 1],
        ['/GND', 'gnd', 1],
        ['/GND', 'gnd:0', 1],
        ['/GND', 'label_0.COMP_1_TXLED', 1],
        ['/GND', 'label_0.COMP_1_TXLED:0', 1],
        ['/GND', 'led_with_res_0.__root', 1],
        ['/GND', 'led_with_res_0.led_0.COMP_1_0603', 2],
        ['/GND', 'gnd:1', 1],
        ['/GND', 'label_1.COMP_1_RXLED', 1],
        ['/GND', 'label_1.COMP_1_RXLED:0', 1],
        ['/GND', 'led_with_res_1.__root', 1],
        ['/GND', 'led_with_res_1.led_1.COMP_1_0603', 2],
        ['/NET_2', 'led_with_res_0.led_0.COMP_1_0603', 1],
        ['/NET_2', 'led_with_res_0.res_0.COMP_1_1k', 1],
        ['/NET_2', 'led_with_res_1.led_1.COMP_1_0603', 1],
        ['/NET_2', 'led_with_res_1.res_1.COMP_1_1k', 1]
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
add res(360) angle:90
wire down 20

point:
    at v5v
    wire down 20
    add res(360) angle:90
    wire down 20 

    branch:
        wire left 100
        to point

    wire down 20
    add res(360) angle:90
    wire down 20
    to gnd

    at point
    wire right 200 down 20
    add res(360) angle:90
    wire down 20
    to gnd

wire down 20
add led("red") angle:90
wire down 40
to gnd`, [
    ['/5V', 'v5v', 1],
    ['/5V', 'v5v:0', 1],
    ['/5V', 'res_0.COMP_1_360', 1],
    ['/5V', 'v5v:1', 1],
    ['/5V', 'res_1.COMP_1_360', 1],
    ['/GND', 'gnd', 1],
    ['/GND', 'gnd:0', 1],
    ['/GND', 'res_2.COMP_1_360', 2],
    ['/GND', 'gnd:1', 1],
    ['/GND', 'res_3.COMP_1_360', 2],
    ['/GND', 'gnd:2', 1],
    ['/GND', 'led_0.COMP_1_0603', 2],
    ['/NET_1', 'res_0.COMP_1_360', 2],
    ['/NET_1', '_point.__.0', 1],
    ['/NET_1', 'res_1.COMP_1_360', 2],
    ['/NET_1', 'res_2.COMP_1_360', 1],
    ['/NET_1', 'res_3.COMP_1_360', 1],
    ['/NET_1', 'led_0.COMP_1_0603', 1]
]);

/*
Test with `paralell` keyword
*/
export const script15 = new ScriptTest(`
import lib

v5v = supply("5V")
gnd = dgnd()

at v5v
wire down 20

parallel:
    wire down 20
    add res(1k) angle:90
    wire down 20

parallel:
    wire right 60 down 20
    add res(1k) angle:90
    wire auto

parallel:
    wire right 120 down 20
    add res(1k) angle:90
    wire auto

wire down 20
to gnd
`, [
    ['/5V', 'v5v', 1],
    ['/5V', 'v5v:0', 1],
    ['/5V', '_parallel.__.0', 1],
    ['/5V', 'res_0.COMP_1_1k', 1],
    ['/5V', 'res_1.COMP_1_1k', 1],
    ['/5V', 'res_2.COMP_1_1k', 1],
    ['/GND', 'gnd', 1],
    ['/GND', 'res_0.COMP_1_1k', 2],
    ['/GND', '_parallel.__.1', 1],
    ['/GND', 'res_1.COMP_1_1k', 2],
    ['/GND', 'res_2.COMP_1_1k', 2],
    ['/GND', 'gnd:0', 1]
]);

/*
Test that consecutive blocks with different block type
are parsed correctly.
*/
export const script16 = new ScriptTest(`
import lib

v5v = supply("5V")
gnd = dgnd()

join:
    at v5v
    wire down 20
    add res(1k) angle:90 
    wire down 20

join:
    at v5v
    wire down 20
    add res(1k) angle:90
    wire left 100

point:
    at v5v
    wire right 20
    add res(1k)
    wire right 20
    to point

    wire down 20
    to gnd
`, [
    ['/5V', 'v5v', 1],
    ['/5V', 'v5v:0', 1],
    ['/5V', 'res_0.COMP_1_1k', 1],
    ['/5V', 'v5v:1', 1],
    ['/5V', 'res_1.COMP_1_1k', 1],
    ['/5V', 'v5v:2', 1],
    ['/5V', 'res_2.COMP_1_1k', 1],
    ['/GND', 'gnd', 1],
    ['/GND', 'res_0.COMP_1_1k', 2],
    ['/GND', '_join.__.0', 1],
    ['/GND', 'res_1.COMP_1_1k', 2],
    ['/GND', '_point.__.1', 1],
    ['/GND', 'res_2.COMP_1_1k', 2],
    ['/GND', 'gnd:0', 1]
]);



// Scripts for comparison and logical operators
export const script17 = new ScriptTest(`
a = 0
b = 9
if b > 10:
    a = 1

print(a)
`, ['0']);

export const script18 = new ScriptTest(`
a = 0
b = 10
if b > 10:
    a = 1

print(a)
`, ['0']);

export const script19 = new ScriptTest(`
a = 0
b = 11
if b > 10:
    a = 1

print(a)
`, ['1']);

export const script20 = new ScriptTest(`
a = 0
b = 9
if b < 10:
    a = 1

print(a)
`, ['1']);

export const script21 = new ScriptTest(`
a = 0
b = 10
if b < 10:
    a = 1

print(a)
`, ['0']);

export const script22 = new ScriptTest(`
a = 0
b = 11
if b < 10:
    a = 1

print(a)
`, ['0']);

export const script23 = new ScriptTest(`
a = 0
b = 9
if b >= 10:
    a = 1

print(a)
`, ['0']);

export const script24 = new ScriptTest(`
a = 0
b = 10
if b >= 10:
    a = 1

print(a)
`, ['1']);

export const script25 = new ScriptTest(`
a = 0
b = 11
if b >= 10:
    a = 1

print(a)
`, ['1']);

export const script26 = new ScriptTest(`
a = 0
b = 9
if b <= 10:
    a = 1

print(a)
`, ['1']);

export const script27 = new ScriptTest(`
a = 0
b = 10
if b <= 10:
    a = 1

print(a)
`, ['1']);

export const script28 = new ScriptTest(`
a = 0
b = 11
if b <= 10:
    a = 1

print(a)
`, ['0']);

export const script29 = new ScriptTest(`
a = 0
b = 9
if b > 10 && b < 20:
    a = 1

print(a)
`, ['0']);

export const script30 = new ScriptTest(`
a = 0
b = 11
if b > 10 && b < 20:
    a = 1

print(a)
`, ['1']);

export const script31 = new ScriptTest(`
a = 0
b = 21
if b > 10 && b < 20:
    a = 1

print(a)
`, ['0']);

export const script32 = new ScriptTest(`
a = 0
b = 9
if b < 10 || b < 20:
    a = 1

print(a)
`, ['1']);

export const script33 = new ScriptTest(`
a = 0
b = 11
if b < 10 || b < 20:
    a = 1

print(a)
`, ['1']);

export const script34 = new ScriptTest(`
a = 0
b = 21
if b < 10 || b < 20:
    a = 1

print(a)
`, ['0']);

export const script35 = new ScriptTest(`
a = 0
b = 0

if b > 10 && b < 20:
    a = 1
else if b >= 20 && b < 30:
    a = 2
else if b >= 30 && b < 40:
    a = 3
else:
    a = 4

print(a)
`, ['4']);

export const script36 = new ScriptTest(`
a = 0
b = 11

if b > 10 && b < 20:
    a = 1
else if b >= 20 && b < 30:
    a = 2
else if b >= 30 && b < 40:
    a = 3
else:
    a = 4

print(a)
`, ['1']);

export const script37 = new ScriptTest(`
a = 0
b = 21

if b > 10 && b < 20:
    a = 1
else if b >= 20 && b < 30:
    a = 2
else if b >= 30 && b < 40:
    a = 3
else:
    a = 4

print(a)
`, ['2']);

export const script38 = new ScriptTest(`
a = 0
b = 31

if b > 10 && b < 20:
    a = 1
else if b >= 20 && b < 30:
    a = 2
else if b >= 30 && b < 40:
    a = 3
else:
    a = 4

print(a)
`, ['3']);

export const script39 = new ScriptTest(`
a = 0
b = 41

if b > 10 && b < 20:
    a = 1
else if b >= 20 && b < 30:
    a = 2
else if b >= 30 && b < 40:
    a = 3
else:
    a = 4

print(a)
`, ['4']);

export const script20_ = new ScriptTest(
    loadScriptFromFile('__tests__/renderData/script20.cst'),
    [
        [ '/GND', 'gnd', 1 ],
        [ '/GND', 'gnd:0', 1 ],
        [ '/GND', 'tmp', 3 ],
        [ '/GND', 'gnd:1', 1 ],
        [ '/GND', 'res_3.COMP_1_5k', 2 ],
        [ '/GND', '__._COMP_1_0.port_2.COMP_1_signal_c', 1 ],
        [ '/GND', '__._COMP_1_0.port_2.COMP_1_signal_c:0', 1 ],
        [ '/GND', '__._COMP_1_0.res_1.COMP_1_2k', 2 ],
        [ '/NET_1', 'tmp', 5 ],
        [ '/NET_1', 'res_3.COMP_1_5k', 1 ],
        [ '/NET_1', '__._COMP_1_0.port_1.COMP_1_signal_e', 1 ],
        [ '/NET_1', '__._COMP_1_0.port_1.COMP_1_signal_e:0', 1 ],
        [ '/NET_1', '__._COMP_1_0.res_0.COMP_1_1k', 2 ],
        [ '/NET_1', '__._COMP_1_0.res_1.COMP_1_2k', 1 ],
        [ '/VCC', 'vcc', 1 ],
        [ '/VCC', 'vcc:0', 1 ],
        [ '/VCC', 'tmp', 1 ],
        [ '/VCC', '__._COMP_1_0.port_0.COMP_1_signal_a', 1 ],
        [ '/VCC', '__._COMP_1_0.port_0.COMP_1_signal_a:0', 1 ],
        [ '/VCC', '__._COMP_1_0.res_0.COMP_1_1k', 1 ],
        [ '/input', 'label_0.COMP_1_input', 1 ],
        [ '/input', 'label_0.COMP_1_input:0', 1 ],
        [ '/input', 'tmp', 2 ],
        [ '/input', '__._COMP_1_0.port_3.COMP_1_signal_b', 1 ],
        [ '/input', '__._COMP_1_0.port_3.COMP_1_signal_b:0', 1 ],
        [ '/input', '__._COMP_1_0.res_2.COMP_1_3k', 1 ],
        [ '/output', 'label_1.COMP_1_output', 1 ],
        [ '/output', 'label_1.COMP_1_output:0', 1 ],
        [ '/output', 'tmp', 4 ],
        [ '/output', '__._COMP_1_0.port_4.COMP_1_signal_d', 1 ],
        [ '/output', '__._COMP_1_0.port_4.COMP_1_signal_d:0', 1 ],
        [ '/output', '__._COMP_1_0.res_2.COMP_1_3k', 2 ]
      ]
);

export const script21_ = `
import lib

vcc = supply("3v3")
gnd = dgnd()

tmp = create component:
    pins: 6

at vcc
wire down 100 right 100
to tmp pin 1

tmp2 = create component:
    pins: 3

at label("helo")
wire right 200
to tmp2 pin 1

at tmp pin 4 
wire right 400 down 500 auto
to tmp2 pin 2
`