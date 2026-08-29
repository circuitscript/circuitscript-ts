import { createParseTest, loadScriptFromFile, ScriptTest } from "./helpers";

// Scripts for comparison and logical operators
export const inlineScript17 = new ScriptTest(`
a = 0
b = 9
if b > 10:
    a = 1

print(a)
`, ['0']);

export const inlineScript18 = new ScriptTest(`
a = 0
b = 10
if b > 10:
    a = 1

print(a)
`, ['0']);

export const inlineScript19 = new ScriptTest(`
a = 0
b = 11
if b > 10:
    a = 1

print(a)
`, ['1']);

export const inlineScript20 = new ScriptTest(`
a = 0
b = 9
if b < 10:
    a = 1

print(a)
`, ['1']);

export const inlineScript21 = new ScriptTest(`
a = 0
b = 10
if b < 10:
    a = 1

print(a)
`, ['0']);

export const inlineScript22 = new ScriptTest(`
a = 0
b = 11
if b < 10:
    a = 1

print(a)
`, ['0']);

export const inlineScript23 = new ScriptTest(`
a = 0
b = 9
if b >= 10:
    a = 1

print(a)
`, ['0']);

export const inlineScript24 = new ScriptTest(`
a = 0
b = 10
if b >= 10:
    a = 1

print(a)
`, ['1']);

export const inlineScript25 = new ScriptTest(`
a = 0
b = 11
if b >= 10:
    a = 1

print(a)
`, ['1']);

export const inlineScript26 = new ScriptTest(`
a = 0
b = 9
if b <= 10:
    a = 1

print(a)
`, ['1']);

export const inlineScript27 = new ScriptTest(`
a = 0
b = 10
if b <= 10:
    a = 1

print(a)
`, ['1']);

export const inlineScript28 = new ScriptTest(`
a = 0
b = 11
if b <= 10:
    a = 1

print(a)
`, ['0']);

export const inlineScript29 = new ScriptTest(`
a = 0
b = 9
if b > 10 && b < 20:
    a = 1

print(a)
`, ['0']);

export const inlineScript30 = new ScriptTest(`
a = 0
b = 11
if b > 10 && b < 20:
    a = 1

print(a)
`, ['1']);

export const inlineScript31 = new ScriptTest(`
a = 0
b = 21
if b > 10 && b < 20:
    a = 1

print(a)
`, ['0']);

export const inlineScript32 = new ScriptTest(`
a = 0
b = 9
if b < 10 || b < 20:
    a = 1

print(a)
`, ['1']);

export const inlineScript33 = new ScriptTest(`
a = 0
b = 11
if b < 10 || b < 20:
    a = 1

print(a)
`, ['1']);

export const inlineScript34 = new ScriptTest(`
a = 0
b = 21
if b < 10 || b < 20:
    a = 1

print(a)
`, ['0']);

export const inlineScript35 = new ScriptTest(`
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

export const inlineScript36 = new ScriptTest(`
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

export const inlineScript37 = new ScriptTest(`
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

export const inlineScript38 = new ScriptTest(`
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

export const inlineScript39 = new ScriptTest(`
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

const script20_ = new ScriptTest(
    loadScriptFromFile('__tests__/testData/renderData/script20.cst'),`
/GND | dgnd-0.COMP-1-GND | 1
/GND | COMP-1 | 2
/GND | dgnd-0.COMP-1-GND:0 | 1
/GND | res-3.COMP-1-5k | 2
/GND | dgnd-0.COMP-1-GND:1 | 1
/GND | --.-COMP-1-0.res-1.COMP-1-2k | 2
/GND | --.-COMP-1-0.port-2.COMP-1-signal_c | 1
/GND | --.-COMP-1-0.port-2.COMP-1-signal_c:0 | 1
/NET-(R1-1) | COMP-1 | 5
/NET-(R1-1) | res-3.COMP-1-5k | 1
/NET-(R1-1) | --.-COMP-1-0.res-0.COMP-1-1k | 2
/NET-(R1-1) | --.-COMP-1-0.-branch.--.-COMP-1-0.0 | 1
/NET-(R1-1) | --.-COMP-1-0.port-1.COMP-1-signal_e | 1
/NET-(R1-1) | --.-COMP-1-0.port-1.COMP-1-signal_e:0 | 1
/NET-(R1-1) | --.-COMP-1-0.res-1.COMP-1-2k | 1
/VCC | supply-0.net-0.COMP-1-VCC | 1
/VCC | supply-0.net-0.COMP-1-VCC:0 | 1
/VCC | COMP-1 | 1
/VCC | --.-COMP-1-0.port-0.COMP-1-signal_a | 1
/VCC | --.-COMP-1-0.port-0.COMP-1-signal_a:0 | 1
/VCC | --.-COMP-1-0.res-0.COMP-1-1k | 1
/input | label-0.COMP-1-input | 1
/input | label-0.COMP-1-input:0 | 1
/input | COMP-1 | 4
/input | --.-COMP-1-0.port-3.COMP-1-signal_b | 1
/input | --.-COMP-1-0.port-3.COMP-1-signal_b:0 | 1
/input | --.-COMP-1-0.res-2.COMP-1-3k | 1
/output | COMP-1 | 3
/output | label-1.COMP-1-output | 1
/output | label-1.COMP-1-output:0 | 1
/output | --.-COMP-1-0.res-2.COMP-1-3k | 2
/output | --.-COMP-1-0.port-4.COMP-1-signal_d | 1
/output | --.-COMP-1-0.port-4.COMP-1-signal_d:0 | 1`
);

export const script21_ = `
from "std" import *

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

export const inlineScript40 =  new ScriptTest(`
a = 0

while a < 10:
    print(a)
    if a < 5:
        a = a +1
        continue

    a = a + 2
    `, [
        '0', '1', '2', '3', '4', '5', '7', '9'
    ]);

export const inlineScript41 = new ScriptTest(`
a = [0, "hello", "world", 1,2,3]

for item in a:
    print(item)
`,
    ['0', '"hello"', '"world"', '1', '2', '3']);


export const inlineScript42 = new ScriptTest(`
counter = 0
while counter < 5:
    counter = counter + 1
print(counter)
`, ['5'])

export const inlineScript43 = new ScriptTest(`
outer = 0
inner_sum = 0
while outer < 3:
    inner = 0
    while inner < 2:
        inner_sum = inner_sum + 1
        inner = inner + 1
    outer = outer + 1
print(inner_sum)
`, ['6']);

export const inlineScript44 = new ScriptTest(`
counter = 0
while true:
    counter = counter + 1
    if counter == 10:
        break
print(counter)
`, ['10']);

export const inlineScript45 = new ScriptTest(`
counter = 0
while counter > 5:
    counter = counter + 1
print(counter)
`, ['0'])

export const inlineScript46 = new ScriptTest(`
# Test 1: Skipping even numbers
counter = 0
odd_sum = 0
while counter < 10:
    counter += 1
    if counter % 2 == 0:  # Skip even numbers
        continue
    odd_sum += counter
print(odd_sum)
`, ['25']);

export const inlineScript47 = new ScriptTest(`
counter = 0
while true:
    counter += 1
    if counter < 5:  # Skip first few iterations
        continue
    break
print(counter)
`, ['5']);

export const inlineScript48 = new ScriptTest(`
outer = 0
inner_sum = 0
while outer < 3:
    inner = 0
    while inner < 5:
        inner += 1
        if inner % 2 == 0:  # Skip even numbers
            continue
        inner_sum += inner
    outer += 1
print(inner_sum)
`, ['27'])

export const inlineScript49 = new ScriptTest(`
numbers = [1, 2, 3, 4, 5, 6]
odd_sum = 0
for num in numbers:
    if num % 2 == 0:  # Skip even numbers
        continue
    odd_sum += num
print(odd_sum)
`, ['9']);

export const inlineScript50 = new ScriptTest(`
empty_list = []
count = 0
for _ in empty_list:
    count += 1
    if true:  # Unreachable but should work
        continue
print(count)
`, ['0'])

export const inlineScript51 = new ScriptTest(`
a = range(5)
print(a)

b = range(3, 10)
print(b)
`, ['[0, 1, 2, 3, 4]', '[3, 4, 5, 6, 7, 8, 9]']);

export const inlineScript52 = new ScriptTest(`
a = enumerate(["A", "B", "C", "D"])
print(a)
`, ['[[0, "A"], [1, "B"], [2, "C"], [3, "D"]]']);

export const inlineScript53 = new ScriptTest(`
for index, value in enumerate(["A", "B", "C", "D"]):
    print(index, value)

for tmp in enumerate(["A", "B", "C", "D"]):
    print(tmp)

`, [
    '0 "A"', 
    '1 "B"', 
    '2 "C"', 
    '3 "D"',
    '[0, "A"]',
    '[1, "B"]',
    '[2, "C"]',
    '[3, "D"]'
]);

export const inlineScript54 = new ScriptTest(`
a = 1
b = 0
print(not a)
print(not b)
print(a or b)
print(a and b)
print(a and a)
`, ['true', 'false', '1', '0', '1']);

export const inlineScript55 = new ScriptTest(`
# Test builtin methods for array_push, array_get, array_set and len
tmp = []
array_push(tmp, 1)
array_push(tmp, 2)
array_push(tmp, 3)
print(tmp)
print(array_get(tmp, 2))
print(array_get(tmp, 0))

array_set(tmp, 1, 100)
print(array_get(tmp, 1))

print(len(tmp))
`, ['[1, 2, 3]', '3', '1', '100', '3']);

export const inlineScript56 = new ScriptTest(`
# Test setting and getting component parameters
tmp = create component:
    pins: 2

tmp.color = "red"
print(tmp.color)

tmp.prop123 = "hello"
print(tmp.prop123)

# test undefined parameter
print(tmp.hello)

`, ['"red"', '"hello"', 'undefined']);

export const inlineScript57 = new ScriptTest(`
# Test setting of global net parameters
from "std" import *
tmp1 = net("3V3")
tmp2 = net("3V3")

tmp1.net.color = "blue"
print(tmp2.net.color)
`, ["\"blue\""]);

export const inlineScript58 = new ScriptTest(`
# Test function return values and references
from "std" import *
tmp1 = net("3V3")
tmp1.net.color = "blue"
print(tmp1.net.color)

net("3V3").net.color = "red"
print(tmp1.net.color)

print(net("3V3").net.color)
`, ['"blue"', '"red"', '"red"']);

export const inlineScript59 = new ScriptTest(`
# Test array assignment and value, nested arrays
a = [1, [2, [3, 4, 5], 6], 7]
print(a)
print(a[1][1][1])

# update the value in the nested arrays
a[1][1][1] = 10
print(a)
print(a[1][1][1])
`, [
    "[1, [2, [3, 4, 5], 6], 7]", 
    "4", 
    "[1, [2, [3, 10, 5], 6], 7]",
    "10"
]);

export const inlineScript60 = new ScriptTest(`
# Test multiple nested function calls
def tmp3():
    return 12

def tmp2():
    return tmp3

def tmp1():
    return tmp2
    
a = tmp1()()()
print(a)    
`, ['12']);

export const inlineScript61 = new ScriptTest(`
# Test nested function calls mixed with array indexing
def tmp4():
    return 100

def tmp3():
    return b

def tmp2():
    return tmp3

def tmp1():
    return tmp2

b = [1,tmp4,3,4,5]
c = tmp1()()()[1]()

print(c)
`, ['100']);

export const inlineScript62 = new ScriptTest(`
# Test nested objects within variables.
document.bom.columns = ["a", "b", "c"]
print(document.bom)
print(document.bom.columns)
`, [
    '{"columns":["a","b","c"]}',
    '["a", "b", "c"]',
]);


export const inlineScript63 = new ScriptTest(`
tmp = []
array_push(tmp, "a")
array_push(tmp, "b")
array_push(tmp, "c")
print(tmp)
print(len(tmp))
`, ['["a", "b", "c"]', '3']);

export const inlineScript64 = new ScriptTest(`
a = [10, 20, 30, 40]
print(array_get(a, 0))
print(array_get(a, 3))
`, ['10', '40']);

export const inlineScript65 = new ScriptTest(`
a = [1, 2, 3]
array_set(a, 0, 99)
array_set(a, 2, 77)
print(a)
print(array_get(a, 0))
print(array_get(a, 2))
`, ['[99, 2, 77]', '99', '77']);

export const inlineScript66 = new ScriptTest(`
tmp = [1]
array_push(tmp, "hello")
array_push(tmp, true)
print(tmp)
`, ['[1, "hello", true]']);

export const inlineScript67 = new ScriptTest(`
tmp = create component:
    pins: 2

print(pin_get_type(tmp, 1))
print(pin_get_type(tmp, 2))
`, ['"passive"', '"passive"']);

export const inlineScript68 = new ScriptTest(`
tmp = create component:
    pins: 3

pin_set_type(tmp, 1, "input")
pin_set_type(tmp, 2, "output")
print(pin_get_type(tmp, 1))
print(pin_get_type(tmp, 2))
print(pin_get_type(tmp, 3))
`, ['"input"', '"output"', '"passive"']);

export const inlineScript69 = new ScriptTest(`
tmp = create component:
    pins: 6

pin_set_type(tmp, 1, "power_input")
pin_set_type(tmp, 2, "power_output")
pin_set_type(tmp, 3, "power_reference")
pin_set_type(tmp, 4, "no_connect")
pin_set_type(tmp, 5, "io")
pin_set_type(tmp, 6, "passive")

print(pin_get_type(tmp, 1))
print(pin_get_type(tmp, 2))
print(pin_get_type(tmp, 3))
print(pin_get_type(tmp, 4))
print(pin_get_type(tmp, 5))
print(pin_get_type(tmp, 6))
`, ['"power_input"', '"power_output"', '"power_reference"', '"no_connect"', '"io"', '"passive"']);

export const inlineScript70 = new ScriptTest(`
tmp = create component:
    pins: 1

pin_set_type(tmp, 1, "input")
print(pin_get_type(tmp, 1))
pin_set_type(tmp, 1, "output")
print(pin_get_type(tmp, 1))
`, ['"input"', '"output"']);

export const inlineScript71 = new ScriptTest(`
tmp = create component:
    pins: 3

print(has_pin(tmp, 1))
`, ['true']);

export const inlineScript72 = new ScriptTest(`
tmp = create component:
    pins: 2

print(has_pin(tmp, 5))
`, ['false']);

export const inlineScript73 = new ScriptTest(`
tmp = create component:
    pins: 3

print(has_pin(tmp, 1))
print(has_pin(tmp, 3))
print(has_pin(tmp, 4))
`, ['true', 'true', 'false']);

export const inlineScript74 = new ScriptTest(`
tmp = create component:
    pins:
        1: "passive", "GND"
        2: "passive", "VCC"

print(has_pin(tmp, "GND"))
print(has_pin(tmp, "MISSING"))
`, ['true', 'false']);

// Line continuation tests
export const inlineScript75 = new ScriptTest(`
a = 1 + \
    2
print(a)
`, ['3']);

export const inlineScript76 = new ScriptTest(`
a = 1
b = 2
c = a + \
    b
print(c)
`, ['3']);

export const inlineScript77 = new ScriptTest(`
a = 10
if a > 5 \
    and a < 20:
    print(1)
`, ['1']);

export const inlineScript78 = new ScriptTest(`
result = 1 + \
         2 + \
         3
print(result)
`, ['6']);

export const inlineScript79 = new ScriptTest(`
def sum2(x, y):
    return x + y

r = sum2(1, \
         2)
print(r)
`, ['3']);

// DoubleDot (..) in function parameters tests
export const inlineScript80 = new ScriptTest(`
tmp = create component:
    pins: 3
print(has_pin(.., 1))
`, ['true']);

export const inlineScript81 = new ScriptTest(`
tmp = create component:
    pins: 6
pin_set_type(.., 1, "input")
print(pin_get_type(.., 1))
`, ['"input"']);

export const inlineScript82 = new ScriptTest(`
tmp = create component:
    pins: 3
print(has_pin(.., 1))
print(has_pin(.., 2))
print(has_pin(.., 4))
`, ['true', 'true', 'false']);

export const inlineScript83 = new ScriptTest(`
def check(comp, idx):
    return has_pin(comp, idx)

tmp = create component:
    pins: 2
print(check(comp=.., idx=1))
`, ['true']);

export const inlineScript84 = new ScriptTest(`
tmp1 = create component:
    pins: 2
tmp2 = create component:
    pins: 5
print(has_pin(.., 3))
print(has_pin(.., 5))
print(has_pin(.., 6))
`, ['true', 'true', 'false']);

export const inlineScript85 = new ScriptTest(`
tmp = create component:
    pins: 6
pin_set_type(.., 2, "output")
print(pin_get_type(.., 2))
`, ['"output"']);

// Chained comparison tests (e.g. `1 < 2 < 3`)
export const inlineScriptChain1 = new ScriptTest(`
print(1 < 2 < 3)
`, ['true']);

export const inlineScriptChain2 = new ScriptTest(`
print(3 < 2 < 1)
`, ['false']);

export const inlineScriptChain3 = new ScriptTest(`
print(1 < 5 < 3)
`, ['false']);

export const inlineScriptChain4 = new ScriptTest(`
print(1 < 2 < 3 < 4)
`, ['true']);

export const inlineScriptChain5 = new ScriptTest(`
print(1 < 5 < 3 < 10)
`, ['false']);

export const inlineScriptChain6 = new ScriptTest(`
print(3 > 2 > 1)
`, ['true']);

export const inlineScriptChain7 = new ScriptTest(`
print(1 > 2 > 3)
`, ['false']);

export const inlineScriptChain8 = new ScriptTest(`
print(1 <= 2 <= 2)
`, ['true']);

export const inlineScriptChain9 = new ScriptTest(`
print(2 <= 2 <= 1)
`, ['false']);

export const inlineScriptChain10 = new ScriptTest(`
print(1 < 2 <= 2)
`, ['true']);

export const inlineScriptChain11 = new ScriptTest(`
print(1 == 1 == 1)
`, ['true']);

export const inlineScriptChain12 = new ScriptTest(`
a = 5
b = 10
c = 15
print(a < b < c)
`, ['true']);

export const inlineScriptChain13 = new ScriptTest(`
print(10k < 20k < 30k)
`, ['true']);

export const inlineScriptChain14 = new ScriptTest(`
print(30k < 20k < 10k)
`, ['false']);

export const inlineScriptChain15 = new ScriptTest(`
a = 0
if 1 < 2 < 3:
    a = 1
else:
    a = 2
print(a)
`, ['1']);

export const inlineScriptChain16 = new ScriptTest(`
a = 0
if 3 < 2 < 1:
    a = 1
else:
    a = 2
print(a)
`, ['2']);

export const inlineScriptChain17 = new ScriptTest(`
print(5 < 1 < 2 < 3)
`, ['false']);

export const inlineScriptChain18 = new ScriptTest(`
print(9 < 8 < 7 < 6)
`, ['false']);

export const inlineScriptChain19 = new ScriptTest(`
print(1 < 2 < 3 < 4 < 5)
`, ['true']);

// 6-term chain, short-circuits on the interior 3rd link (3 < 1 is false).
// Without the fix, that false is lost and coerced to 0, letting the 5th
// link wrongly compute 0 < 6 = true. This is the case that actually
// exercises the new extraData === false branch.
export const inlineScriptChain20 = new ScriptTest(`
print(1 < 2 < 3 < 1 < 5 < 6)
`, ['false']);

// pin_set_type / pin_get_type - explicit component/pin args
export const inlineScript86 = `
tmp = create component:
    pins: 4

pin_set_type(tmp, 1, "input")
print(pin_get_type(tmp, 1))
`;

export const inlineScript87 = `
tmp = create component:
    pins: 4

print("marker")
pin_set_type(tmp, 1, "not_a_type")
`;

export const inlineScript88 = `
tmp = create component:
    pins: 4

pin_set_type(tmp, 99, "input")
`;

export const inlineScript89 = `
tmp = create component:
    pins: 4

print(pin_get_type(tmp, 99))
`;

export const inlineScript90 = `
tmp = create component:
    pins: 4

pin_set_type(tmp, "input")
`;

export const inlineScript91 = `
tmp = create component:
    pins: 4

print(pin_get_type(tmp))
`;

// pin_set_type / pin_get_type - cursor form
export const inlineScript92 = `
tmp = create component:
    pins: 4

at tmp pin 1
pin_set_type("output")
print(pin_get_type())
`;

export const inlineScript93 = `
tmp = create component:
    pins: 4

print(pin_get_type())
`;

// net_get
export const inlineScript94 = `
compA = create component:
    pins: 2
compB = create component:
    pins: 2

at compA pin 1
wire right 100
to compB pin 1

net_get(compA, 1).color = "blue"
print(net_get(compB, 1).color)
`;

export const inlineScript95 = `
compA = create component:
    pins: 2
compB = create component:
    pins: 2

at compA pin 1
wire right 100
to compB pin 1

net_get(compA, 1).color = "green"
at compA pin 1
print(net_get().color)
`;

export const inlineScript96 = `
compA = create component:
    pins: 2
compB = create component:
    pins: 2

at compA pin 1
wire right 100
to compB pin 1

net_get(compA, 1).color = "yellow"
print(net_get(compA).color)
`;

export const inlineScript97 = `
compA = create component:
    pins: 2

print(net_get(compA, 1))
`;

export const inlineScript98 = `
print(net_get("not_a_component"))
`;

// has_pin - malformed arity
export const inlineScript99 = `
tmp = create component:
    pins: 4

has_pin(tmp)
`;

export const inlineScript100 = `
tmp = create component:
    pins: 4

has_pin(tmp, 1, 2)
`;

export const inlineScript101 = new ScriptTest(`
def test1(a, b, c):
    return a + b + c
print(test1(c=3, a=1, b=2))
`, ['6']);

export const inlineScript102 = new ScriptTest(`
def test1(a, b=10, c=20):
    return a + b + c
print(test1(1))
print(test1(1, c=5))
print(test1(1, 2, 3))
`, ['31', '16', '6']);

export const inlineScript103 = new ScriptTest(`
def test1(a, b, c=100):
    return a + b + c
print(test1(1, c=2, b=3))
`, ['6']);

export const inlineScript104 = new ScriptTest(`
from "std" import *
def get_value(r):
    return r.value
r1 = res(10k)
print(get_value(r1))
`, ['10k']);

export const inlineScript105 = new ScriptTest(`
s = "    line one
    line two
    line three"
print(textwrap_dedent(s))
`, ['"line one\nline two\nline three"']);

export const inlineScript106 = new ScriptTest(`
s = "  outer
    inner
  outer2"
print(textwrap_dedent(s))
`, ['"outer\n  inner\nouter2"']);

export const inlineScript107 = new ScriptTest(`
s = "no indent
same here"
print(textwrap_dedent(s))
`, ['"no indent\nsame here"']);

export const inlineScript108 = new ScriptTest(`
s = "    line one

    line three"
print(textwrap_dedent(s))
`, ['"line one\n\nline three"']);

export const inlineScript109 = new ScriptTest(`
s = "  line one
    
  line two"
print(textwrap_dedent(s))
`, ['"line one\n\nline two"']);

export const inlineScript110 = `
print(textwrap_dedent(5))
`;

export const inlineScript111 = new ScriptTest(`
s = "   hello world   "
print(strip(s))
`, ['"hello world"']);

export const inlineScript112 = new ScriptTest(`
s = "\txhello\n"
print(strip(s))
`, ['"xhello"']);

export const inlineScript113 = new ScriptTest(`
s = "xxhelloxx"
print(strip(s, "x"))
`, ['"hello"']);

export const inlineScript114 = new ScriptTest(`
s = "xyxhelloxyx"
print(strip(s, "xy"))
`, ['"hello"']);

export const inlineScript115 = new ScriptTest(`
s = "no strip needed"
print(strip(s))
`, ['"no strip needed"']);

export const inlineScript116 = `
print(strip(5))
`;

const scriptPath = '__tests__/testData/parseData';

export const inlineScriptTests = [
    ["create component command", createParseTest(scriptPath, 'script1')],
    ["function to create component and branching", createParseTest(scriptPath, 'script2')],
    ["nested branching, add with pin selected", createParseTest(scriptPath, 'script3')],
    ["'at' and 'to' commands will clone net components", createParseTest(scriptPath, 'script6')],
    ["resolve instances in upper contexts", createParseTest(scriptPath, 'script7')],
    ["components in function parameters", createParseTest(scriptPath, 'script8')],
    ["resolve nets in local and upper contexts", createParseTest(scriptPath, 'script9')],
    ["assignment in at/to/add statement", createParseTest(scriptPath, 'script10')],
    ["net namespace local and global", createParseTest(scriptPath, 'script11')],
    ["create component with copy and is net", createParseTest(scriptPath, 'script12')],
    
    /*
    After a function call, the correct graph position should be resumed from.
    This test also checks the join keyword
    */
   ["correct nets after function call and also `join` keyword", createParseTest(scriptPath, 'script13')],
   
   ["path with 'point' keyword", createParseTest(scriptPath, 'script14')],
   ["path with 'parallel' keyword", createParseTest(scriptPath, 'script15')],
   
   /*
   Test that consecutive blocks with different block type
   are parsed correctly.
   */
  ["consecutive blocks with 'join' then 'point'", createParseTest(scriptPath, 'script16')],
  ['module nets', script20_],

  ["net namespace computed/string/variable", createParseTest(scriptPath, 'script17')],
];
