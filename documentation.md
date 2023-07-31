# Circuitscript 
A language to draw schematics using programming flow

## Language principles
1. Easy to reason, write and read. The language is heavily inspired by python to improve readability and usage.
2. Improved productivity: getting more done with lesser code
3. Generate useful schematics for PCB layouts
4. Testable/queryable circuits
5. Encourage modular designs/circuits
  
## Language description

### Components and pins
A component is defined as a point in the circuit graph. This component is created from a component definition and has a fixed number of pins. 

For example: `R1 = res(10k)` creates a component with symbol class `res` and assigns it to the variable R1. The `res` symbol class defines a symbol that has 2 pins and this can be used to represent a resistor component.

### Execution state
The circuit are built programmatically by adding and connecting different pins of symbols. There is always a "cursor" in the execution state, this represents the current (component, pin) location the cursor is at. Commands executed will usually depend on the current cursor.

For example:
```
R1 = res(10k)
at R1 pin 2
to R2 = res(20k)
```
The first line creates a resistor R1 with a value of 10k.  
The second line moves the "cursor" to pin 2 of R1.  
The next line creates a resistor R2 with a value of 20k and connects the cursor to pin 1 of R2.


### Building circuits

The `add` command is useful for combining the first line and second lines together:
```
add R1 = res(10k)   # Creates 10k resistor and assign it to variable R1. 
                    # The `add` commands automatically moves to the next pin of the component.
add R2 = res(20k)   # Creates 20k resistor and assign it to variable R2. 
                    # Pin 2 of R1 and Pin 1 of R2 are joined together in the same net. 
                    # After this line is executed, the cursor is now at pin 2 of R2.
to gnd              # Connect pin 2 of R2 to `gnd` net.
```

The variable names can also be omitted, if references to the component are not required:
```
add R1 = res(10k)
add res(20k)
to gnd
```


## component instance creation
`res()` or `R1 = res(10k)`

The first expression creates a new instance of symbol `res` and this is an unnamed component. During execution, it will be assigned a random name. Note that this is just an internal name and may be different from the name used in the BOM.

The second expression creates an instance of `res` and assigns into the variable name `R1`.

### `add` command
`add res()` 

This creates a resistor and adds it's pin 1 to the current net.
The current net is moved to pin 2 of the resistor

`add R1 = res()`

Same as the `add` command, except that the newly created component is assigned to the variable `R1`

### `at` command
This command moves the cursor to the specified component. If no pin is specified, then the default pin, usually pin 1, is selected.

Example:
```
add res(10k)
add R2 = res(20k)
add res(20k)
to gnd

at R2
add cap(20n)
to gnd
```

### `at` with pin definition branching

This allows multiple pins of the same component to be built without having to go to the component after each statement.

Example:
```
at U1:
    "VCC": to V5V
    "GND": to gnd
    "IO1": to pin_header_1 pin 1
    "IO2": to pin_header_2 pin 2
```

### `at <component> to <component1>, <component2>`
This statement allows pins from multiple components to be linked together.

Example:
```
at U1 to conn1, conn2:
    1: 1, 4
    2: 2, 3
    3: 3, 2
    4: 4, 1
```

### `to` command
This command connects the cursor to the specified component. If no pin is specified, then the default pin of the specified component is connected.

Example:
```
R1 = res(10k)
V5V = net('5V')
at V5V
to R1  # goes to pin 1 of R1 by default
```

### `section` command
Provides a logical grouping of components and nets


### Selecting (component, pin) pairs:
Possible options:
- `at component pin 1` / `at component pin "IO1"`
- `at component 1`/ `at component "IO1"`
- `at component.1` / `at component."IO1"` / `at component.IO1`
- `at component:1` / `at component:"IO1"` / `at component:IO1`
- `at component-1` / `at compoennt-"IO1"` / `at component-IO1`


### Definitions
| Term       | Description                                     |
|------------|-------------------------------------------------|
| Symbol     | Defines the pins and parameters in a component  
| Component  | A single instance of a symbol that is placed in a circuit
| Pins       | Physical pins or connection points on a device     


### Defining components
A new symbol is defined by:
```
new_comp create symbol:
    pins: 2
```
The code above creates a symbol object with 2 pins. The pins are automatically generated with a pin ID of 1 and 2 respectively.

Pin names can also be defined in the symbol object:
```
new_comp = create symbol:
    pins:
        1: "anode"
        2: "cathode"
```

If a pin type is specified, it has to be the first item in the pin definition. The following pin types are currently supported: `Any, Input, Output, IO, Power`
```
new_comp = create symbol:
    pins:
        1: power, "VCC"
        2: power, "GND"
```



### Functions and symbols
New symbols are created with the `create symbol` command. Functions can create circuit blocks and return them.

Using functions to contain circuit blocks allows them to be reused.

Example:
```
# Define a new function that is a resistor component
def res(value):
    return create component:
        pins: 2
        params:
            value: value

add res(10k)
to gnd
```

### To expand: Multi-cursor constructions:
Example:
```
foreach connector1 pin 2,3,4,5 to connector2 pin 2,3,4,5:
    add res(22)
    add cap(10n)
```


### To expand: Branching
This defines parallel branches of circuits that start at the same net/component

`branch`

Starts the branch point at the current net/component. Branch blocks must be specified immediately after each other so that the branch point will be the same.
When all branching is done within the branch sequence, then any hanging nets will be joined together and used as the current insertion point.

`break`

This keyword will stop further processing of expressions in a branch. When the branching ends, the hanging net in this branch will not be joined with the others.



### Component definitions
TDB

### Variables
TBD

### Conditions
TDB

### Do not place/fit
TDB


### Tests/Unit tests

### Outputs
- SPICE nets for testing/verifyings

### Drawing/graphics
- KiCAD output?

# New ideas:
- object for bundle/harnesses
### `before` command

Example:
```
add res(10k)
before to gnd:
    add res(10k)
    add res(20k)
