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
import std

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
while True:
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
while True:
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

`, ['0 "A"', '1 "B"', '2 "C"', '3 "D"']);


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
# Test builtin methods for arrayPush, arrayGet, arraySet and len
tmp = []
arrayPush(tmp, 1)
arrayPush(tmp, 2)
arrayPush(tmp, 3)
print(tmp)
print(arrayGet(tmp, 2))
print(arrayGet(tmp, 0))

arraySet(tmp, 1, 100)
print(arrayGet(tmp, 1))

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
import std
tmp1 = net("3V3")
tmp2 = net("3V3")

tmp1.color = "blue"
print(tmp2.color)
`, ["\"blue\""]);

export const inlineScript58 = new ScriptTest(`
# Test function return values and references
import std
tmp1 = net("3V3")
tmp1.color = "blue"
print(tmp1.color)

net("3V3").color = "red"
print(tmp1.color)

print(net("3V3").color)
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
    ['module nets', script20_]
];