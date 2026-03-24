# Circuitscript

A code-based language for creating electronic schematics. Instead of clicking through GUI tools, you write Circuitscript to describe circuits — and get SVG/PDF schematics and KiCAD-compatible netlists as output.

**Homepage:** https://circuitscript.net

---

## Features

- **Code-first design** — capture schematics using a simple scripting language
- **Version control friendly** — plain text files work naturally with git
- **SVG and PDF output** — high-quality schematic diagrams
- **KiCAD netlist export** — use generated netlists directly in KiCAD layout
- **Bill of Materials** — export BOM as CSV
- **Programmatic constructs** — loops, functions, conditionals, and modules for reusable circuit blocks
- **Standard library of components** — resistors, capacitors, inductors, LEDs, etc.
- **Custom components** — define components with arbitrary pin layouts and graphics
- **ERC** — basic electrical rules check (more to be added)

---

## Installation

Requires Node.js 16 or later.

```bash
npm install -g circuitscript
```

Or install locally as a library:

```bash
npm install circuitscript
```

---

## Quick Start

Create a file `circuit.cst`:

```
from "std" import *

v5 = supply("5V")
gnd = dgnd()

at v5
wire down 100
add res(100k)
wire down 100
to gnd

at v5
wire down 100
add cap(100n)
wire down 100
to gnd
```

Generate a schematic:

```bash
circuitscript circuit.cst output.svg
```

---

## CLI Usage

```
circuitscript [input path] [output path] [options]
```

### Options

| Option | Description |
|--------|-------------|
| `-w, --watch` | Watch for file changes and regenerate |
| `-u, --update-source` | Update source file with reference designator annotation |
| `-j, --annotated-path [file]` | Save annotated source file at given path |
| `-n, --dump-nets` | Print net information |
| `-d, --dump-data` | Dump data during parsing |
| `-s, --stats` | Show stats during generation |
| `-x, --skip-output` | Skip output generation |
| `-e, --erc` | Enable ERC output |
| `-b, --bom [output-path]` | Generate Bill of Materials as CSV |
| `-i, --input text <text>` | Provide input text directly instead of a file |
| `--version` | Show version |

### Examples

```bash
# Generate SVG
circuitscript schematic.cst schematic.svg

# Generate PDF
circuitscript schematic.cst schematic.pdf

# Generate BOM
circuitscript schematic.cst schematic.svg --bom bom.csv

# Print to stdout
circuitscript schematic.cst
```