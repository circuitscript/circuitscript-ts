# Changelog

## [v0.4.0](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.3.2...v0.4.0)

[5f67814](https://gitlab.com/circuitscript/circuitscript-ts/commit/5f678149024091dc5b469c92a1d54d1fdcebbcc3)Split ANTLR grammar into separate lexer and parser files
- 
- Refactored the monolithic CircuitScript.g4 grammar file into separate
- CircuitScriptLexer.g4 and CircuitScriptParser.g4 files for improved
- modularity and performance. Added comprehensive lexer diagnostics system
- with token-level tracing and performance analysis capabilities.
- 
- Key changes:
- - Split CircuitScript.g4 into CircuitScriptLexer.g4 and CircuitScriptParser.g4
- - Added LexerDiagnosticListener.ts for detailed lexer performance analysis
- - Renamed CircuitScriptVisitor.ts to CircuitScriptParserVisitor.ts
- - Updated all imports and references throughout codebase
- - Added CLI flags for lexer diagnostics (--lexer-diagnostics, --lexer-verbose, etc.)
- - Updated package dependencies for ANTLR4 tooling
- - Regenerated parser and lexer TypeScript files from new grammar split
- 
- This change improves grammar maintainability and adds powerful debugging
- capabilities for language development.

[2396652](https://gitlab.com/circuitscript/circuitscript-ts/commit/2396652b4129b23b5f3b01961dcca4db7ae68f71)Refactor parser grammar and simplify visitor pattern
- 
- Simplified expression handling in the ANTLR grammar by consolidating
- value_expr and atom_expr rules, removing redundant intermediate nodes.
- Updated visitor methods to use new passResult helper for cleaner
- result propagation. Regenerated parser files with optimized grammar.

[503d6ac](https://gitlab.com/circuitscript/circuitscript-ts/commit/503d6ac544d172d0bd05308a407d943c55e1a08f)Refactor grammar rules for clarity and consistency
- 
- - Move assignment_expr before add_component_expr for better rule ordering
- - Replace pin_select_expr2 with property_key_expr in at_block_pin_expr
- - Extract properties_block as a reusable rule for component/module/graphic blocks
- - Simplify parameters rule to reduce ambiguity
- - Simplify function_args_expr rule structure
- - Remove extra STRING_VALUE from property_expr
- - Reorder at_block_header before at_block for forward reference clarity
- - Reorder to_component_expr after at_block in graph_expressions alternatives
- - Regenerate parser and update visitor accordingly

[7592080](https://gitlab.com/circuitscript/circuitscript-ts/commit/7592080bc7c486fbd9df076050d0dbdc7a669f40)Unify atom_expr and function_call_expr into callable_expr with trailer rule
- 
- Replace separate atom_expr/function_call_expr/trailer_expr/trailer_expr2
- grammar rules with a single callable_expr + trailer rule. Implement
- visitCallableExpr and visitTrailer in BaseVisitor to handle dot access,
- array index, and function call trailers in a unified traversal. Update
- assignment_expr and operator_assignment_expr to use callable_expr on LHS.

[c458333](https://gitlab.com/circuitscript/circuitscript-ts/commit/c458333bdf8efec9f536a7bd85102ba020149802)Optimize lexer token ordering and inline binary operators in grammar
- 
- - Reorder WS rule after NEWLINE to fix token precedence
- - Extract DecimalIntegerLiteral and DecimalLiteral as fragments
- - Make NUMERIC_VALUE require a unit suffix (remove optional modifier)
- - Inline binary_operator rule into BinaryOperatorExpr for flatter AST
- - Remove property_set_expr rule (superseded by assignment_expr)
- - Reorder expression alternatives to improve parse performance
- - Update visitor to use inlined operator tokens directly from context

[49bd73b](https://gitlab.com/circuitscript/circuitscript-ts/commit/49bd73b851f49524b81b47d66827e336b755c826)Refactor import grammar rules and improve token definitions
- 
- Consolidate import_all_simple and import_specific grammar rules into a single import_specific_or_all rule using a choice operator for cleaner syntax. Add proper escape sequence support to STRING_VALUE tokens and simplify INTEGER_VALUE definition using DecimalIntegerLiteral fragment. Remove unused ALPHA_NUMERIC token.

[073850b](https://gitlab.com/circuitscript/circuitscript-ts/commit/073850b4e373d4a78469514ae5e18a4051d6917f)Merge operator_assignment_expr into assignment_expr
- 
- Consolidate simple (=) and compound (+=, -=, *=, /=, %=) assignments
- into a single grammar rule and visitor method, removing the separate
- operator_assignment_expr rule and its associated visitor methods.

[74681b7](https://gitlab.com/circuitscript/circuitscript-ts/commit/74681b7e40a0f90429a66cd8fec1cf74fb624f97)Improve grammar organization and simplify visitor pattern
- 
- Reorganized ANTLR grammar rules for better clarity and consistency:
- - Aligned token definitions in lexer for improved readability
- - Restructured graph_expressions to flatten rule hierarchy
- - Simplified part_match_block handling to filter undefined results
- - Refactored visitor methods to use visitChildren() where appropriate
- 
- These changes improve code maintainability without altering language semantics.

[eabfdc7](https://gitlab.com/circuitscript/circuitscript-ts/commit/eabfdc71f5d82086581f71e336b732f69fedb545)Remove property_set_expr2 and simplify component_modifier_expr
- 
- Remove the redundant property_set_expr2 and assignment_expr2 grammar rules,
- and broaden component_modifier_expr to accept data_expr instead of the
- narrower (value_expr | ID). Update generated parser and visitor accordingly.

[12b41bf](https://gitlab.com/circuitscript/circuitscript-ts/commit/12b41bf9ac4925b0c2b581fe8cc35df6e36f521f)Inline wire_atom_expr into wire_expr and reorder grammar rules
- 
- Simplify the grammar by removing the wire_atom_expr intermediate rule
- and handling wire segments directly in wire_expr. Also reorder function-
- related rules for better logical grouping and simplify function_args_expr
- and function_def_expr.

[3b0c927](https://gitlab.com/circuitscript/circuitscript-ts/commit/3b0c927b19ded014f55e44d4ca419a7b60b7a694)Remove redundant grammar rules and consolidate annotation handling
- 
- - Remove at_block_pin_expression_simple/complex sub-rules, inlining them directly into at_block_pin_expr
- - Remove import_annotation_expr rule, reusing annotation_comment_expr for import annotations
- - Update annotation_comment_expr to support optional IDs and minus tokens (matching previous import_annotation_expr behavior)
- - Update BaseVisitor and visitor to use the renamed/consolidated rule methods
- - Re-number parser rule constants to reflect removed rules

[eddeb5a](https://gitlab.com/circuitscript/circuitscript-ts/commit/eddeb5a8ccf36a8e294afabe0b72b64dd3d81543)Reorganize source into render/ and semantic-tokens/ subdirectories
- 
- Move draw_symbols, export, geometry, graph, layout, and render into
- src/render/, and SemanticTokenVisitor into src/semantic-tokens/.
- Extract pipeline logic from helpers into src/pipeline.ts, and add
- KiCadNetListOutputHandler, PaperSizes, getSemanticTokens, and
- validateScript modules.

[a43ee13](https://gitlab.com/circuitscript/circuitscript-ts/commit/a43ee13beebd2f61e96f4f80ff0f89c03e7c97bf)Merge part_condition_key_only_expr into part_value_expr
- 
- Consolidates the two similar grammar rules by extending part_value_expr
- to accept either a match block or data expressions, removing the need
- for the separate part_condition_key_only_expr rule.

[84b5cf9](https://gitlab.com/circuitscript/circuitscript-ts/commit/84b5cf9ccb2eec614630b59ab8837790e05d3805)Fix pin label rendering for vertical pins and improve robustness
- 
-  Fix pin name/id label positioning for 90° and 270° angle pins
-  Add display_id=false to std.cst pins (res, cap, ind) to suppress pin IDs
-  Relax string escape handling in lexer to support arbitrary escape sequences
-  Support .cst file extension in import paths (optional now)
-  Fix getDirPath to return directory itself when path is a directory
-  Skip empty string import paths in resolveAllImportFilepaths
-  Add parseError flag and importStatement to ImportedLibrary
-  Store imports as SerializedExpression in LibraryCacheIR (schema v3)
-  Clear errors array before parsing imported files in renderScriptCustom
-  Update golden SVG test fixtures for all affected test scripts

[812b5c8](https://gitlab.com/circuitscript/circuitscript-ts/commit/812b5c8864f86f9d4653d9294088983bc5cfc852)Simplify point_expr to always use data_expr
- 
- Remove the ID-only alternative from point_expr grammar rule, requiring
- all point references to use data_expr. Update the visitor to use
- keepReference when resolving point values, falling back to result.name
- for identifier-based lookups.

[7cbbd29](https://gitlab.com/circuitscript/circuitscript-ts/commit/7cbbd29f2fdb47e07cecd8614898201c4fa63242)Pre-load all imports synchronously before visitor execution
- 
- Introduce an import resolver that eagerly resolves and reads all
- transitive import file paths before the visitor runs, storing them in
- a `loadedFiles` map. The visitor then reads from this in-memory store
- instead of performing async file I/O during tree traversal, allowing
- the visitor pipeline (visitScript, importCommon, handleImportFile,
- parseFileWithVisitor) to become fully synchronous. Also adds opt-in
- cache support for imported library scopes via content hash.

[11ee2d8](https://gitlab.com/circuitscript/circuitscript-ts/commit/11ee2d8eaeb8bd5420734d8feabc0358535aba25)Extract DefaultPostAnnotationCallback and fix cache token tracking
- 
- - Move DefaultPostAnnotationCallback out of helpers.ts into its own file
- - Track parsed tokens/tree pairs in ImportedLibrary.referencedTokens for cached library annotation support
- - Store tokens/tree on CFunctionEntry after lazy loading
- - Fix serializer to strip trailing NEWLINE/DEDENT tokens from function definitions
- - Fix top-level expression grouping to join with empty string and preserve newlines within groups
- - Merge imported library scope into main executor after processing
- - Export AnnotatedFile, ExternalLibAnnotationFile, RefdesOutputType types from helpers.ts

[7022ba3](https://gitlab.com/circuitscript/circuitscript-ts/commit/7022ba3a4644d47957b1260f3d8ea28f97e60261)Extract annotation utilities and apply refdes to cache serialization
- 
- Move RefdesModification type and generateModifiedSourceText into a shared
- utils module under src/annotate/. Apply refdes annotations when serializing
- library scope to cache so cached output reflects annotation comments.
- Rename addModifications to addRefdesModifications for clarity.

[806af3c](https://gitlab.com/circuitscript/circuitscript-ts/commit/806af3ca1011dea83991b001fc717e33c098cbf8)Add cache test suite and simplify cache storage paths
- 
- - Add comprehensive tests for cache hash, storage, and import integration
- - Add lib1.cst test fixture for cache integration tests
- - Simplify getCachePath to use a single file per library (no hash in filename)
- - Improve duplicate function warning to include function name

[39ede42](https://gitlab.com/circuitscript/circuitscript-ts/commit/39ede42ccc4a12c8e3f9d4c8741f880aec8644b1) Changed import syntax from ID to string
-  updated tests

[42777ba](https://gitlab.com/circuitscript/circuitscript-ts/commit/42777bac80515ebe64c940e8adad256a139ab741)Refactor validator to pre-load imports and use sync visiting
- 
- Pre-load all imported files before visiting so the symbol validator
- can use synchronous visit() instead of visitAsync(). Updates
- SymbolValidatorVisitor to handle the new CallableExpr and
- create_graphic_expr grammar rules, disables import caching in
- validator visitors, and adds filePath parameter to getSemanticTokens.

[9e11ded](https://gitlab.com/circuitscript/circuitscript-ts/commit/9e11ded3f8b30976779aa98989065d5fc2a3b1e2)Implement lazy loading for cached library functions
- 
- - Add lazy function loading via CFunctionEntry.lazyLoader callback, so cached
- library functions are only parsed and executed on first call rather than
- eagerly on import
- - Consolidate import resolution and file loading into BaseVisitor.resolveImportsAndLoad
- method, removing duplicated logic from helpers.ts and test helpers
- - Thread fileLineOffset through onImportFile callback and parseFileWithVisitor
- to correctly position cached function source text within the original file
- - Add lineOffset support to MainLexer so re-parsed function snippets report
- accurate line numbers for refdes annotations
- - Store function start position in SerializedFunctionDef cache type and use it
- during deserialization to apply the correct line offset
- - Split enableCachedImports into separate read/write flags for finer control
- - Return CFunctionEntry from createFunction and add createFunctionLazyLoaded helper

[df7ca45](https://gitlab.com/circuitscript/circuitscript-ts/commit/df7ca4566b4f65023ea0bf1f5836fd06dabcf112)Add RefdesAnnotationVisitor tests and fix error propagation in helpers
- 
- - Add testAnnotate.ts with tests for RefdesAnnotationVisitor output format
- - Extend testCache.ts with annotation cache consistency tests and expose tree/tokens from runImportScript
- - Fix renderScriptCustom to collect throwError into errors array instead of immediately throwing, preventing valid render when errors exist
- 
- Co-Authored-By: Weihao &lt;weihao@example.com&gt;

[300316a](https://gitlab.com/circuitscript/circuitscript-ts/commit/300316a23cdf56792af0bbf768787be9da058bcc)Add library scope caching infrastructure
- 
- Introduces serialization, deserialization, hashing, and disk storage
- modules for caching parsed library scopes to speed up repeated imports.

[6529996](https://gitlab.com/circuitscript/circuitscript-ts/commit/65299962624deb9cbcaf8978636179a961499268)Add transitive import cache tests and fix pin label rotation for rotated components
- 
- - Added cache integration tests for transitive imports (lib2 → lib3) covering
- cache creation, hit, invalidation, corruption fallback, and round-trip serialization
- - Added lib2.cst and lib3.cst test fixtures for chained import scenarios
- - Fixed pin label rotation in draw_symbols.ts: use combined component+label angle
- to determine when text is upside-down, preventing incorrect flip behavior
- - Updated golden SVG references for script5 and script27

[175c4fa](https://gitlab.com/circuitscript/circuitscript-ts/commit/175c4fa5e26efdd9e34bbdf1725a2a552cba7f38)Optimize lexer memory usage and diagnostic collection
- 
- - Replace token queue shift() with head-pointer dequeue for O(1) removal, compacting periodically
- - Replace queueSizeSamples array with running sum/count to avoid storing every sample
- - Add recordTokenStream flag to skip token stream recording when not needed
- - Cache token type name lookups in a Map to avoid repeated vocabulary lookups
- - Optimize onNewLine() string splitting to avoid regex allocations
- - Switch SimpleStopwatch from Date to performance.now() for higher resolution timing
- - Add enableLexerTokenStream option to parseFileWithVisitor
- - Add visitTrailer stub to RefdesAnnotationVisitor
- - Improve EOF filter in nextToken to use in-place compaction instead of filter()
- - Add error detection check in testCLI annotation test

[344bc79](https://gitlab.com/circuitscript/circuitscript-ts/commit/344bc798a2947b333454989154a6e40f7d5d9a68)Minor cleanups

[24f7e1b](https://gitlab.com/circuitscript/circuitscript-ts/commit/24f7e1b2092112687d6a160d8e22128f012f6af6)Refactor cache to serialize top-level expressions instead of variables
- 
- Replace variable snapshot serialization with grouped top-level expression
- blocks. Expressions are re-executed on cache load to restore side effects,
- using their original source positions for correct refdes annotation.
- 
- Bump CACHE_SCHEMA_VERSION to 2.

[1c46f67](https://gitlab.com/circuitscript/circuitscript-ts/commit/1c46f678083339006e5dc4ace6be7ef52677f9cc)Refactor import context creation and defer cache writes
- 
- Move import context creation before the cache-hit check so both
- cache and non-cache paths share the same context setup. Replace
- inline cache writes with a deferred writeToCache flag on ImportedLibrary,
- flushed via cacheLibraries() after annotation. Add fileHash field to
- ImportedLibrary and expose getModifications() on RefdesAnnotationVisitor.

[e08128c](https://gitlab.com/circuitscript/circuitscript-ts/commit/e08128c469ae230c04739ee4feaad8af40d9ae29)Rename pin display parameter and add pin name visibility control
- 
- - Rename 'display_pin_id' to 'display_id' for clarity
- - Add 'display_name' parameter to control pin name visibility
- - Remove default angle properties from net, cap, and ground components
- - Move PinTypesList constant to globals.ts for better organization
- - Improve pin type and name parameter parsing logic in draw_symbols.ts

[158d1c4](https://gitlab.com/circuitscript/circuitscript-ts/commit/158d1c46a32532e86b189f5a502caae6090b751d)Re-organize annotation related files

[98e7bc7](https://gitlab.com/circuitscript/circuitscript-ts/commit/98e7bc77d07f886cfff5c62139b7f1d9c9d80759)Support custom refdes prefix via refdesPrefix parameter
- 
- Allow components to specify a custom reference designator prefix
- using the refdesPrefix parameter, bypassing the default type-based
- prefix lookup in ComponentRefDesPrefixes.

[f3c6a1e](https://gitlab.com/circuitscript/circuitscript-ts/commit/f3c6a1e752a800db610da1f18c8ec3e032df230d)Speed up parsing using SLL prediction mode

[1ec4896](https://gitlab.com/circuitscript/circuitscript-ts/commit/1ec4896c756d9f32f281b0bd0bb3d62df8e38a77)Fixed bug in pin rotation

## [v0.3.2](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.3.1...v0.3.2) - 2026-01-22

[6cd3944](https://gitlab.com/circuitscript/circuitscript-ts/commit/6cd3944fec56c7485df7d4d2d31e6f75bfed88db)Consolidate external refdes annotations into single JSON file
- 
- Changes the external refdes annotation system to use a single JSON file per main schematic file instead of individual files per library. The refdes file is now named after the main schematic (main.refdes.json) and contains a structured format with library entries that store component reference designators by library name and path.
- 
- Updates:
- - RefdesAnnotationVisitor: Return dictionary mapping refdes to position strings
- - helpers.ts: Collect all external refdes libraries and write to single consolidated JSON
- - visitor.ts: Update checkLibraryHasRefdesFile to read from centralized format
- - Tests: Update expected test data files to reflect new naming and structure

## [v0.3.1](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.3.0...v0.3.1) - 2026-01-10

[39c8e0e](https://gitlab.com/circuitscript/circuitscript-ts/commit/39c8e0e5c13edf75c96254fc45b4508f26f7e7fe)Missed out BOM group_by property

## [v0.3.0](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.2.0...v0.3.0) - 2026-01-10

[245e216](https://gitlab.com/circuitscript/circuitscript-ts/commit/245e21652e9e92165a375ccdc3edaae5cb6174a6)Rename module terminology to library throughout codebase
- 
- Refactor all references from "module" to "library" to better reflect the purpose of imported CircuitScript files. This includes renaming the ImportedModule class to ImportedLibrary, updating grammar definitions, execution contexts, and all related variables and comments.
- 
- Changes include:
- - Rename ImportedModule class to ImportedLibrary with updated properties (moduleName -&gt; libraryName, moduleNamespace -&gt; libraryNamespace, moduleFilePath -&gt; libraryFilePath)
- - Update ANTLR grammar to use libraryName instead of moduleName
- - Refactor ExecutionScope to use libraries map instead of modules
- - Update reference type from ReferenceTypes.module to ReferenceTypes.library
- - Regenerate parser with updated grammar
- - Update test data JSON files to reflect library terminology
- - Update all inline comments and log messages

[27f4ca8](https://gitlab.com/circuitscript/circuitscript-ts/commit/27f4ca8c688e35e63473552c90b0db2e8bf3f880)Consolidate TypeProps enum into ComponentTypes
- 
- Remove duplicate TypeProps enum and migrate all references to use the existing ComponentTypes enum instead. This eliminates redundant type definitions and improves code consistency across the component type system.
- 
- Changes:
- - Remove TypeProps enum from src/objects/types.ts
- - Update all TypeProps references to ComponentTypes
- - Add resistor type to ComponentTypes enum
- - Remove unused imports

## [v0.2.0](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.33...v0.2.0) - 2026-01-10

[591ed14](https://gitlab.com/circuitscript/circuitscript-ts/commit/591ed14869ccdbbae05a3c018426acc6e9a5f3fd)Refactor file system operations to use environment abstraction
- 
- Moves file system operations from direct fs module usage to the
- NodeScriptEnvironment class for better encapsulation and testability.
- 
- - Add fs wrapper methods to NodeScriptEnvironment (existsSync, mkdirSync, createWriteStream)
- - Update BomGeneration to accept environment parameter for file operations
- - Replace direct fs calls with environment methods throughout codebase
- - Add 'from' keyword to semantic token visitor for import statement support
- - Fix flipX/flipY boolean to numeric conversion in execute.ts

## [v0.1.33](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.32...v0.1.33) - 2026-01-10

[c291596](https://gitlab.com/circuitscript/circuitscript-ts/commit/c2915965313226cc36f206d8f37121c52b23dc2e)Removed -c option from command line tool

## [v0.1.32](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.31...v0.1.32) - 2026-01-10

[bf3fae8](https://gitlab.com/circuitscript/circuitscript-ts/commit/bf3fae8ef8a43477ff56dbd87460e9de05a63d8e)Add import annotation support and file path tracking
- 
- This commit introduces several enhancements to the import system:
- - Adds import annotation syntax (#=annotate) to enable refdes annotation for imported modules
- - Implements file path tracking through visitor stack to maintain context during parsing
- - Updates grammar to support import_annotation_expr for all import variants
- - Enhances ClassComponent references with file path metadata
- - Modifies ImportedModule to store parse tree and token stream
- - Improves RefdesAnnotationVisitor to handle import contexts properly
- 
- The changes enable better control over reference designation behavior in imported modules and improve debugging capabilities through enhanced context tracking.

[66116e9](https://gitlab.com/circuitscript/circuitscript-ts/commit/66116e9a9edac71d4821d222d0d8327b81a4c59b)Add property metadata support to CircuitScript grammar
- 
- This commit extends the property expression syntax to support optional metadata strings
- before the colon separator, enabling richer property annotations. This change updates
- both the grammar definition and regenerates the TypeScript parser to support capturing
- metadata tokens that can be used for property validation, documentation, or other
- contextual information.

[1d18fc6](https://gitlab.com/circuitscript/circuitscript-ts/commit/1d18fc6a4857b940bc049c0d6695734d6afc5a89)Add multi-unit component architecture
- 
- Introduce ComponentUnit class to support components with multiple units (e.g., multi-gate ICs). Each unit maintains its own pin definitions, display properties, and layout information while sharing common component data.
- 
- Key changes:
- - Add ComponentUnit class with unit-specific properties (pins, display, arrange)
- - Update component instance naming to include unit identifier using comma delimiter
- - Modify layout and graph systems to work with component units
- - Add getUnit() method to resolve units from components
- - Update rules checking to use unit instance names

[e494063](https://gitlab.com/circuitscript/circuitscript-ts/commit/e494063cb5a87631e13bb777dd0c2774fc2a8041)Add multi-file project support and expand test coverage
- 
- Implements file context tracking in visitor to support multi-file CircuitScript projects.
- Adds comprehensive test suite for multi-file scenarios and text rendering capabilities.
- 
- - Add file entry/exit methods to visitor for proper file context management
- - Refactor test helpers to support file path tracking in runScript
- - Add script59 test cases for multi-file project validation
- - Add script56-58 test cases for text rendering features
- - Include expected SVG outputs and refdes JSON files for validation
- - Extract readFile helper function for consistent file loading

[bf7dd4b](https://gitlab.com/circuitscript/circuitscript-ts/commit/bf7dd4b4e55560f5c80654422d1177832ac99416)Add external refdes annotation system with JSON file support
- 
- Introduces a new refdes annotation output format that stores reference
- designators in separate JSON files alongside source files. This enables
- tracking component references without modifying source code directly.
- 
- Key changes:
- - Add annotate-external import annotation for JSON-based refdes output
- - Implement file path tracking during module execution
- - Add RefdesModification type to separate annotation data from rendering
- - Support loading refdes annotations from external JSON files
- - Add environment helpers for path manipulation (dirname, basename, join)
- - Fix async file exists check in environment

[add08d7](https://gitlab.com/circuitscript/circuitscript-ts/commit/add08d79d77f41bbdd93e1a1ca24a07b041cf565)Enhance multi-unit component support with pin-to-unit mapping
- 
- This commit improves the multi-unit component architecture by introducing a pin-to-unit
- mapping system that correctly associates pins with their respective component units.
- Key changes include:
- 
- - Add pinUnitMap to ClassComponent for efficient pin-to-unit lookups
- - Implement getUnitForPin() method to replace generic getUnit() calls
- - Add unit suffix support for multi-unit component reference designators
- - Update layout and graph logic to use pin-specific unit resolution
- - Refactor unit definition extraction to track numeric pin IDs across units
- - Add refdesSuffix property to ComponentUnit for proper multi-unit labeling
- 
- This ensures that operations on component pins correctly target the appropriate unit,
- which is critical for multi-unit components like dual op-amps or quad gates.

[df56ce9](https://gitlab.com/circuitscript/circuitscript-ts/commit/df56ce9787e16d60f6a60ff49ef19805669fcd28)Add pin arrangement support for custom components
- 
- Implement ability to specify pin positioning for custom components using
- arrange directive with top/right/bottom/left sides. Update symbol drawing,
- layout engine, and execution logic to support custom pin arrangements.

[abc5c1d](https://gitlab.com/circuitscript/circuitscript-ts/commit/abc5c1d9d37e761f1a2ab9b1492ab7952d1be915)Improve ERC error messages with component reference designators
- 
- This commit enhances the Electrical Rules Check (ERC) reporting by including
- component reference designators and pin numbers in error messages. This makes
- it significantly easier for users to identify and locate issues in their circuits.
- 
- Changes:
- - Update unconnected pin messages to show "Unconnected pin: &lt;refdes&gt; pin &lt;num&gt;"
- - Update no-connect violation messages to include target component information
- - Fix unit-aware pin checking in ERC rules to use correct component units
- - Add success message when no ERC issues are found
- - Update test expectations to match new error message format
- - Refactor forEach loops to for...of loops for better readability
- 
- This improves the developer experience by providing actionable error messages
- that directly reference component designators from the schematic.

## [v0.1.31](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.30...v0.1.31) - 2026-01-04

[e6b83b0](https://gitlab.com/circuitscript/circuitscript-ts/commit/e6b83b04e139ad3388ada430f1980f6c4fe54b83)Fixed build script

## [v0.1.30](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.29...v0.1.30) - 2026-01-04

[2f92b18](https://gitlab.com/circuitscript/circuitscript-ts/commit/2f92b183b244eb93638e73cf5d5572a27fbe6538)Update import syntax to enable specific and wildcard imports
- 
- Changes the CircuitScript import syntax to use Python-style wildcard imports.
- Updates grammar, parser, visitor, and all test files to support the new syntax.

[0db0f3c](https://gitlab.com/circuitscript/circuitscript-ts/commit/0db0f3c46485f53adac61093344b1e4237eef911)Cleaned up validation tests

[c76bc61](https://gitlab.com/circuitscript/circuitscript-ts/commit/c76bc61be4c247376bb521634723a12f4d7645a0)Add comprehensive test coverage for import functionality
- 
- This commit enhances the test infrastructure to support import path resolution and adds extensive test cases for the new import features. Changes include test helper improvements to properly track script file paths during execution, plus new test files covering various import scenarios (module imports, specific imports, wildcard imports, and combinations).

[5ca064a](https://gitlab.com/circuitscript/circuitscript-ts/commit/5ca064ac5440bb870c2347519120b3e12ee3768e)Fixed environment logging bug

## [v0.1.29](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.28...v0.1.29) - 2025-12-29

[6f30f71](https://gitlab.com/circuitscript/circuitscript-ts/commit/6f30f71c7ea44a933cb2e2aa2b7aa1c561d3fe34)Fix import path resolution and improve environment tracking
- 
- - Change import resolution from module-relative to file-relative paths
- - Add current file tracking to environment system
- - Add environment debug logging in BaseVisitor
- - Fix semantic token parsing for operator assignments and imports
- - Add default net name generation for unnamed nets

## [v0.1.28](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.27...v0.1.28) - 2025-12-28

[f898fbd](https://gitlab.com/circuitscript/circuitscript-ts/commit/f898fbd18bc7b0961d324f3bf840221ed565a936) fixed semantic token parsing

## [v0.1.27](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.26...v0.1.27) - 2025-12-28

[9835373](https://gitlab.com/circuitscript/circuitscript-ts/commit/9835373f9b6a1dbbfa82ebdc6077749289bec400) minor type fix

## [v0.1.26](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.25...v0.1.26) - 2025-12-28

[e6e90b0](https://gitlab.com/circuitscript/circuitscript-ts/commit/e6e90b0989605da9771e89b68d9333b1870474c9) export RefdesAnnotationVisitor

## [v0.1.25](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.24...v0.1.25) - 2025-12-28

[c6ce406](https://gitlab.com/circuitscript/circuitscript-ts/commit/c6ce40620eb6997e6e3080531bf00cc8a3823aa1) extracted out default annotation handling

## [v0.1.24](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.23...v0.1.24) - 2025-12-22

[f8aefae](https://gitlab.com/circuitscript/circuitscript-ts/commit/f8aefae17ffc72703f388c49a03aa3ebf18bad75)Add component matching system with conditional parameter assignment
- 
- Introduces a new component matching framework that allows conditional parameter assignment based on component properties. This includes:
- - New ComponentMatchConditions module with condition tree structures
- - Grammar support for 'set' expressions with nested condition blocks
- - Visitor implementation to process part_set_expr and build condition trees
- - ExecutionScope enhancements to handle component matching logic
- - ParamDefinition extensions to support NumericValue comparisons
- 
- This feature enables declarative parameter assignment based on component type and existing parameter values, providing more flexible component configuration.

[a951fb8](https://gitlab.com/circuitscript/circuitscript-ts/commit/a951fb8f8e14a35720101e4cc090e6dff07bb624)Reorganize test structure and add BOM generation tests
- 
- Restructure test data files:
- - Move all test data files into __tests__/testData/ directory hierarchy
- - Organize by test type (parseData, renderData, cliTest, rulesCheckData, bomData)
- - Update all test file paths to reference new structure
- 
- Add BOM generation test suite:
- - Create testBOM.ts with configurable column and grouping tests
- - Add test scripts (script1.cst, script2.cst) with expected JSON outputs
- - Extend helpers.ts with BOM generation support and JSON comparison utilities
- 
- Update test infrastructure:
- - Add expectJsonOutput() helper for JSON test validation
- - Extend renderCommon() with optional BOM generation
- - Update package dependencies for BOM functionality

[c8bccac](https://gitlab.com/circuitscript/circuitscript-ts/commit/c8bccacdeba922fa892ba8bc7c12f73d5d41fbb8)Fixed handling for integer value

[cd8dbe3](https://gitlab.com/circuitscript/circuitscript-ts/commit/cd8dbe3b618564b6fe9626a6062260077b06c810)Add Bill of Materials (BOM) generation feature
- 
- Implements comprehensive BOM generation system with support for configurable columns,
- component grouping, and CSV export. Users can now generate BOMs from CircuitScript
- schematics using the --bom flag.
- 
- Key changes:
- - Add BomGeneration module with CSV export functionality
- - Implement nested object property assignment for BOM configuration
- - Add document.bom.columns configuration in standard library
- - Support template strings in component descriptions with parameter substitution
- - Fix object property resolution to handle deeply nested assignments
- - Add --bom CLI flag with optional output path specification
- - Include component descriptions in standard library (resistors, LEDs)
- - Improve object toString() handling with JSON serialization fallback
- 
- Technical improvements:
- - Enhance trailer resolution in BaseVisitor for nested object access
- - Fix reference resolution to properly handle rootValue vs parentValue
- - Add trailerIndex tracking for nested property access
- - Update AnyReference type to support nested object traversal

[e68fc99](https://gitlab.com/circuitscript/circuitscript-ts/commit/e68fc99cde3cdba1c852aa0e4dd77429b064a974)Added tests for ERC rules

[41ae916](https://gitlab.com/circuitscript/circuitscript-ts/commit/41ae91680e4e3f61f7553efcd8c4e3727a683134)Improve ERC reporting with source location tracking and context
- 
- Enhances electrical rule checking (ERC) by adding source location tracking for components and wires, enabling precise error reporting. The system now shows line and column numbers when reporting unconnected pins and wires, making it easier to identify and fix issues. Also refactors wire handling to include wire objects in the sequence for better context tracking.

[ae1be9e](https://gitlab.com/circuitscript/circuitscript-ts/commit/ae1be9e20c0acd6b43457ae5d632eb241b79b0d7)Add electrical rule checking system with unconnected pin detection
- 
- Implements ERC (Electrical Rule Check) framework to validate schematic connectivity:
- - Detect unconnected component pins and wire segments
- - Validate no-connect symbols are not placed on connected nets
- - Add PinId hash value method for improved comparison operations
- - Integrate rule checks into layout rendering pipeline
- 
- Updates graph edge handling to consistently use PinId types instead of raw numbers, improving type safety across wire routing logic.

[0ca1166](https://gitlab.com/circuitscript/circuitscript-ts/commit/0ca11666ac60c9f84ced4682672fa3fd54de8009)Make electrical rule checking optional via --erc flag
- 
- Add command-line option to enable/disable ERC output, improving developer
- experience by reducing noise during normal development. Also improve code
- comments and documentation for component context tracking.

## [v0.1.23](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.22...v0.1.23) - 2025-12-15

[9b9e0cf](https://gitlab.com/circuitscript/circuitscript-ts/commit/9b9e0cf4c821ba335b560049b83e0b8daed6db00)Support multiple refdes annotations in at block headers
- 
- Modified grammar to allow repeated annotation comments in at block headers,
- enabling syntax like `at tmp: #= J1 #= J3`. Updated parser and visitor to
- handle multiple annotations in at block context.
- 
- Added test case script52.cst to verify annotation generation within at blocks
- including nested branches with multiple component instances.

## [v0.1.22](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.21...v0.1.22) - 2025-12-14

[da35baa](https://gitlab.com/circuitscript/circuitscript-ts/commit/da35baab3e08c457ca65eb8f3cdaa593c7572a71)Added missing test files
- Updated tests

[39e77f1](https://gitlab.com/circuitscript/circuitscript-ts/commit/39e77f13581828470315b45b281aeab604fd2014)Add comprehensive refdes annotation tests for various scopes
- 
- This commit adds extensive test coverage for reference designator (refdes)
- annotation behavior across different execution contexts:
- 
- - script49.cst: Tests refdes generation in functions and nested loops
- - script50.cst: Tests refdes generation in 'at' blocks with multiple pins
- - script51.cst: Tests refdes generation in loops calling functions
- 
- Updated existing tests (script46, script47) to verify correct behavior
- when 'at' blocks are split and to ensure proper index tracking for
- underscore-suffixed refdes annotations in loop and while constructs.

[f583c32](https://gitlab.com/circuitscript/circuitscript-ts/commit/f583c32c456d16720fe30cde322ca4ffd1c5380d)Fix refdes annotation index handling and add comprehensive tests
- 
- Updated the refdes annotation system to correctly generate reference
- designators for components within nested loops and function calls.
- This ensures components get proper sequential numbering without
- extraneous underscore characters.
- 
- Changes:
- - Fixed refdes indexing logic in BaseVisitor, RefdesAnnotationVisitor,
- and execute modules
- - Updated expected test outputs to reflect correct refdes format
- (R4_ instead of R4__, R4_1_1_1 instead of R4_1_1_1_)
- - Added script48 test case verifying refdes generation at top-level
- within loops and functions

## [v0.1.21](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.20...v0.1.21) - 2025-12-13

[382063e](https://gitlab.com/circuitscript/circuitscript-ts/commit/382063e080f4f09bd8a87abfa9626af01eacca8f)Add component reference designator (refdes) annotation system
- 
- Implemented a comprehensive refdes annotation system that:
- - Tracks component annotations throughout the AST
- - Links components to their parser contexts
- - Automatically assigns refdes (R1, C1, etc.) to components without explicit refdes
- - Adds annotation comments (#= R1) to source files preserving original formatting
- - Extends grammar to support annotation comment expressions
- - Added ComponentAnnotater class to manage refdes assignment
- - Added RefdesAnnotationVisitor to modify source files with annotations
- 
- Changes include grammar modifications to support #= annotations and visitor pattern enhancements to track component-context relationships.

[3d71576](https://gitlab.com/circuitscript/circuitscript-ts/commit/3d71576abc45d322ad83240e3f5b96da83656079)Improve refdes annotation tracking with component context references
- 
- Replace single loopStack property with comprehensive ctxReferences array
- to track all component usage contexts. Add creationFlag to distinguish
- component creation from subsequent references, fixing refdes generation
- for components used both inside and outside loop structures.

[b4f17bf](https://gitlab.com/circuitscript/circuitscript-ts/commit/b4f17bf64316fbf3e39891cf7c86adf278924118)Add automatic refdes annotation for components in loop structures
- 
- Implements smart reference designator (refdes) annotation for components
- created within while and for loops. Components in loops now receive indexed
- refdes labels (e.g., R1_1, R1_2) that track their position in the loop.
- 
- Key changes:
- - Track loop context and iteration index in execution engine
- - Store loop stack information in ClassComponent instances
- - Generate indexed refdes with placeholder support for nested loops
- - Update annotation visitor to handle placeholder refdes syntax

[5e814bc](https://gitlab.com/circuitscript/circuitscript-ts/commit/5e814bcbf28d5d680d758f435af0fcc33bac93db)Extend refdes annotation to support function call indexing
- 
- Updates the component reference designator (refdes) annotation system to
- track both loop iterations and function invocations. Renames loopStack to
- indexedStack to better reflect its broader use for tracking execution
- contexts including loops and function calls.
- 
- Key changes:
- - Rename loopStack to indexedStack throughout the codebase
- - Track function call count within scopes for refdes generation
- - Update ComponentAnnotater to handle indexed refdes for both loops and functions
- - Add functionCallIndex to CFunctionOptions for tracking invocation count
- - Merge function scope components with proper indexed stack references

[e05dc10](https://gitlab.com/circuitscript/circuitscript-ts/commit/e05dc1026d1374ac6af6908c3b797bf739e8c30e)Added tests for refdes annotation comment

[13eeb23](https://gitlab.com/circuitscript/circuitscript-ts/commit/13eeb23216d88a49103a7522415917d553f604f0)Improve component indexing in refdes annotation system
- 
- Enhanced the reference designator annotation to properly index components
- when instantiated within loops and function calls. Components now receive
- sequential suffixes (e.g., R1_1, R1_2) to maintain unique identifiers while
- preserving the base reference name. Updated net naming to reflect the new
- component indexing scheme.
- 
- Changes include:
- - Enhanced RefdesAnnotationVisitor with function call index tracking
- - Improved component context reference tracking in helpers
- - Updated test fixtures to reflect new naming conventions
- - Refined CLI test expectations for indexed components

[2ecdfa0](https://gitlab.com/circuitscript/circuitscript-ts/commit/2ecdfa040396f3f6e26b4485d9a4b999b251a7f9)Added support for parsing 'to' graph syntax for refdes annotation comment

[a0fca4e](https://gitlab.com/circuitscript/circuitscript-ts/commit/a0fca4ee7f5b07cd1a9a0c4a2174e3dccd539dd8) fixed fetching of package version

## [v0.1.20](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.19...v0.1.20) - 2025-11-01

[305c0cb](https://gitlab.com/circuitscript/circuitscript-ts/commit/305c0cbdb22b9f29187388ca2b3ac1c1aca301f8) fixed bug where component is moved if connected outside of original frame
-  added test

## [v0.1.19](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.18...v0.1.19) - 2025-10-05

[3903ca0](https://gitlab.com/circuitscript/circuitscript-ts/commit/3903ca03d756855fdf81c1b8d4d77ca997f6c529) updated standard library to follow KiCad diode convention

## [v0.1.18](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.17...v0.1.18) - 2025-10-04

[e4372a5](https://gitlab.com/circuitscript/circuitscript-ts/commit/e4372a59a76d09e189bb813c65b524bc4cf0b2ab)Improve net naming with component reference designators
- 
- Refactored net naming system to automatically rename auto-generated nets
- with descriptive names based on the first connected component and pin.
- Nets with priority 0 (system-generated) are now named using the pattern
- NET-(RefDes-PinId) for better readability in netlists and exports.
- 
- Also moved component annotation to occur before net operations in the
- rendering pipeline for proper initialization ordering.

[298dedd](https://gitlab.com/circuitscript/circuitscript-ts/commit/298dedd62599263d3f41048d4b3a5523055a00e5)Refactor output format handling with extensible handler pattern
- 
- Introduced ParseOutputHandler abstract class to support multiple output
- formats through a plugin-like architecture. Extracted KiCad netlist
- generation into KicadNetListOutputHandler and moved it to execute before
- rendering. Split renderScript into renderScript and renderScriptCustom to
- allow custom output handlers while maintaining backward compatibility.

[9340843](https://gitlab.com/circuitscript/circuitscript-ts/commit/9340843b7eb0ab8403029738fbfe2e7d31897708) fixed minor issues for parse output handler

## [v0.1.17](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.16...v0.1.17) - 2025-10-02

[0c2f122](https://gitlab.com/circuitscript/circuitscript-ts/commit/0c2f122fb3eb3d86bd915450bca91cf018012e90)Convert PinId from type to class for better type safety
- 
- - Replace PinId type union with PinId class containing value and type
- - Add instance methods: getValue(), getType(), isNumeric(), isString(), toString(), equals()
- - Add static methods: from() and isPinIdType() for convenient creation
- - Update all PinId references throughout codebase to use class methods
- - Enhance pin comparison logic to use equals() method instead of primitive equality
- - Update ClassComponent pin methods to work with PinId objects
- - Modify ExecutionScope to handle PinId objects in net operations
- - Update symbol rendering to use PinId.toString() for display
- - Add validation in PinId constructor for type safety
- - Create getPinDefinition helper for Map&lt;PinId, PinDefinition&gt; lookups
- 
- This refactoring improves type safety and provides a more robust foundation
- for pin identification while maintaining backward compatibility.

[ef95969](https://gitlab.com/circuitscript/circuitscript-ts/commit/ef95969b20e6711cb29b546bf94666afeba9d59c)Add support for string-based pin IDs and enhance symbol rendering
- 
- - Implement PinId type supporting both string and numeric pin identifiers
- - Update pin definition system to handle mixed pin ID types
- - Enhance symbol drawing to render string pin IDs correctly
- - Add new test cases for string pin IDs and custom graphics
- - Update arrange prop handling to support string-based pins
- - Improve pin positioning and display in custom symbols
- - Add net_type parameter to std.cst net() function
- - Fix pin ID conversion and display throughout the codebase
- 
- This enables more flexible component definitions with named pins
- like "A1", "VCC", "GND" instead of just numeric identifiers.

[b7d0114](https://gitlab.com/circuitscript/circuitscript-ts/commit/b7d0114d500affc2d91acb20f2d990fff306dcdd) added code for solving for resistances at nodes

[6c24150](https://gitlab.com/circuitscript/circuitscript-ts/commit/6c24150593865284b94b1d5f966bee8c0421e13c) missed out ml-matrix package

## [v0.1.16](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.15...v0.1.16) - 2025-09-26

[4139a40](https://gitlab.com/circuitscript/circuitscript-ts/commit/4139a406c229b758a9d03fedb074fd0d071c7bcb)Add array indexing support and enhance expression parsing
- 
- - Implement array indexing syntax with bracket notation (e.g., array[index])
- - Add ArrayIndexExpr visitor method for array element access
- - Enhance atom_expr parsing with trailer_expr2 for property and array access
- - Improve assignment expressions to handle array index assignments
- - Add comprehensive test cases for nested arrays and function calls
- - Update ANTLR grammar to support bracket notation in expressions
- - Fix trailer resolution for complex property chains and array access
- - Add documentation for resolveTrailers and resolveVariable methods
- 
- The changes enable more sophisticated data manipulation with arrays and
- nested structures while maintaining backward compatibility.

[b0377a1](https://gitlab.com/circuitscript/circuitscript-ts/commit/b0377a1ffb1a6e98dad0be49c9dd765f8e133a75)Refactor layout engine by extracting graph generation logic
- 
- - Create new NetGraph class to handle layout graph generation
- - Move graph creation logic from LayoutEngine to separate graph.ts module
- - Update LayoutEngine constructor to accept Logger parameter
- - Refactor generateLayoutGraph method to return graph and container frames
- - Update test files to use new NetGraph + LayoutEngine pattern
- - Improve separation of concerns between graph generation and layout
- - Maintain existing functionality while improving code organization
- 
- This refactoring makes the codebase more modular and easier to test
- by separating graph construction from layout computation.

## [v0.1.15](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.14...v0.1.15) - 2025-09-23

[e1038e8](https://gitlab.com/circuitscript/circuitscript-ts/commit/e1038e8344b547c27207053376463452222ff989) updated merge wire code to generate lines besides segments
-  updated tests

[7ceeb7b](https://gitlab.com/circuitscript/circuitscript-ts/commit/7ceeb7b1485969db9dd2e56304805e8737f5d2a3) fixed tests

## [v0.1.14](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.13...v0.1.14) - 2025-09-21

[195886b](https://gitlab.com/circuitscript/circuitscript-ts/commit/195886bc14daeee0d1681dae60e46522a0277f96) fixed issue with closing path blocks
-  renamed indentLevel to scopeLevel
-  added test

## [v0.1.13](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.12...v0.1.13) - 2025-09-21

[8973952](https://gitlab.com/circuitscript/circuitscript-ts/commit/89739520b4aa81cb28d647c89bc80983afc29962) minor clean up to break and continue handling
-  added test for function return value and reference

[bec9c73](https://gitlab.com/circuitscript/circuitscript-ts/commit/bec9c73164f9cff7d8750af63aedfe09f2f4e420) cleaned up function return references

## [v0.1.12](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.11...v0.1.12) - 2025-09-19

[49f0620](https://gitlab.com/circuitscript/circuitscript-ts/commit/49f06200b6dee27ddad0a70700996f2c5b633b01) improved flexibility of path blocks
-  missed out library name change

[f08085e](https://gitlab.com/circuitscript/circuitscript-ts/commit/f08085ebc20a32d873c0460ecd5e980cfe6c55b4) added net graphic properties: colors
-  improved LHS references
-  updated tests

[db29d56](https://gitlab.com/circuitscript/circuitscript-ts/commit/db29d563752d8f7d25ab25a113616d1c5c8ed930) changed lib.cst to std.cst

[7f7cf84](https://gitlab.com/circuitscript/circuitscript-ts/commit/7f7cf84e42d72c8284de3d1b966741ccc552624f) fixed bug when setting component instance parameters
-  added test

[e00e764](https://gitlab.com/circuitscript/circuitscript-ts/commit/e00e7644920da801993f4c6036d4dcac74ccc562) when net params are accessed, access the global net params
-  added test to verify setting of net params

## [v0.1.11](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.10...v0.1.11) - 2025-09-10

[0b42fe6](https://gitlab.com/circuitscript/circuitscript-ts/commit/0b42fe6872eb8acce269815537984131cc4dfb97) added data expression parsing for pin selection
-  updated circle rendering
-  added tests
-  fixed validation and semantic parsing language server

## [v0.1.10](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.9...v0.1.10) - 2025-09-08

[edd9e28](https://gitlab.com/circuitscript/circuitscript-ts/commit/edd9e2880781971b594fd20357f6a02a7feeaf37) added arraySet method

## [v0.1.9](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.8...v0.1.9) - 2025-09-07

[9cc5283](https://gitlab.com/circuitscript/circuitscript-ts/commit/9cc52837f800c7cd564223bdb138ed8fda48a573) added more validations for create component pins and arrange properties
-  added initial warnings handling

## [v0.1.8](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.7...v0.1.8) - 2025-09-05

[2c6e527](https://gitlab.com/circuitscript/circuitscript-ts/commit/2c6e5274f66165691f63587f82df1fd4c6179a64) fixed bug caused by re-definition of edge
-  added test to catch edge replacement issue

[66367bd](https://gitlab.com/circuitscript/circuitscript-ts/commit/66367bd83dcdab5cc8092ac112e8329124e86b24) fixed layout bug for first node

## [v0.1.7](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.6...v0.1.7) - 2025-08-17

[4af9e39](https://gitlab.com/circuitscript/circuitscript-ts/commit/4af9e39a1cfa3b239d77f277098e062657e21450) version bump

## [v0.1.6](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.5...v0.1.6) - 2025-08-17

[dab3980](https://gitlab.com/circuitscript/circuitscript-ts/commit/dab3980750c303bcd04f16ba797fe02d7f03f142)Refactor symbol validation architecture and enhance language server support
- 
- Major architectural improvements to the symbol validation system:
- 
- - **Modularize validation system**: Move SymbolValidatorVisitor to dedicated src/validate/ directory
- - **Enhance semantic highlighting**: Improve LSP semantic tokens with built-in method detection
- - **Improve symbol resolution**: Better handling of built-in functions and scope resolution
- - **Add comprehensive documentation**: Document SemanticTokenVisitor and SymbolValidatorVisitor with Doxygen
- - **Update test infrastructure**: Align test expectations with new validation architecture
- - **Strengthen type safety**: Enhanced parameter handling in function definitions
- 
- These changes improve code organization, enhance language server capabilities, and provide
- better developer experience for CircuitScript development tools.

[133d0a4](https://gitlab.com/circuitscript/circuitscript-ts/commit/133d0a4343916028beb1725e3f895b5c58e45d36) used async methods for file import handling

[786bf7c](https://gitlab.com/circuitscript/circuitscript-ts/commit/786bf7c8deffc8026385d976a4f76f99cc884a3d)Enhance error handling architecture with comprehensive token ranges and runtime validation
- 
- - Update BaseError and all error classes to support start/end token ranges for precise source location tracking
- - Refactor OnErrorHandler signature to prioritize message and context parameters
- - Introduce RuntimeExecutionError class with token-based constructor for immediate execution halt
- - Enhance validation functions (validateString, validateBoolean, validateNumeric) to accept value-first parameter ordering
- - Improve error propagation throughout parsing pipeline with consistent token range reporting
- - Consolidate error handling in renderScript to return unified BaseError array
- - Add comprehensive runtime validation to getPortSide method with detailed error context

[4084ac4](https://gitlab.com/circuitscript/circuitscript-ts/commit/4084ac4982bace6f69b7b15631aeffe6afb8c05e) cleaned up error parsing

[cc6d303](https://gitlab.com/circuitscript/circuitscript-ts/commit/cc6d303dfe43f11c98a54681bb8bca0ead5f5790) moved out script environment into another file

[982044d](https://gitlab.com/circuitscript/circuitscript-ts/commit/982044d5c7025096e5ff3e54f2306085d1352cec)Implement async file operations and improve wire merging logic
- 
- - Update import handling to use async file operations in BaseVisitor
- - Add visitAsync method and async import processing at script start
- - Enhance wire merging algorithm with better intersection handling
- - Add support for complex multi-wire merging scenarios
- - Improve error reporting with RuntimeExecutionError consistency
- - Add comprehensive test cases for wire overlapping and splitting
- - Update geometry logic to handle complex wire intersections correctly
- 
- The async changes maintain compatibility while improving I/O performance.
- Wire merging improvements fix visual artifacts in complex routing scenarios.

[aa0bc62](https://gitlab.com/circuitscript/circuitscript-ts/commit/aa0bc62446885e75f80a4795697c21bcac9b4792)Refactor visitor architecture with environment abstraction for cross-platform compatibility
- 
- - Replace direct fs module usage with NodeScriptEnvironment abstraction in BaseVisitor
- - Update all visitor constructors to accept environment parameter for file system operations
- - Add NodeScriptEnvironment class with configurable file system methods and path resolution
- - Enhance SemanticTokensVisitor and SymbolValidatorVisitor to support environment injection
- - Enable browser and custom environment support through pluggable file system interface
- - Maintain ESM import compatibility with .js extensions throughout codebase
- - Consolidate path utilities and environment detection for better cross-platform support

[1f59921](https://gitlab.com/circuitscript/circuitscript-ts/commit/1f59921c24dc43e873f4d3ff74c1cad202adb35f)Fix ESM/CJS dual module compatibility and environment abstraction
- 
-  Update svgdom to ESM-only version (0.1.22) with dynamic imports
-  Configure Jest for ESM support with experimental VM modules
-  Fix testCLI to use ESM build and correct figlet imports
-  Implement stack trace-based directory resolution for cross-platform compatibility
-  Refactor NodeScriptEnvironment to use module-relative paths instead of current directory
-  Update build process to include asset copying and dual-format support
-  Fix import resolution for built-in modules and default library paths

[2206299](https://gitlab.com/circuitscript/circuitscript-ts/commit/22062993db98d6eb0cbf6d71c8145f295211575d)Refactor SVG environment management to use singleton pattern
- 
- - Move SVG window creation from global functions to NodeScriptEnvironment class
- - Implement singleton pattern for NodeScriptEnvironment with getInstance() method
- - Replace prepareSVGEnvironment and getCreateSVGWindow global functions with class methods
- - Update all files to use environment singleton instead of direct function imports
- - Consolidate text measurement canvas into environment class as reusable resource
- - Remove redundant prepareSVGEnvironment calls from test files
- - Maintain backward compatibility through environment setup in main entry points
- 
- This refactoring improves code organization by centralizing SVG-related functionality
- within the environment class and ensures consistent SVG setup across the application.

[db8f6c4](https://gitlab.com/circuitscript/circuitscript-ts/commit/db8f6c44e3e6ded1af96192e6ffcdb4d137d778f) moved current dir resolving and getting default libs path into script environment

[2fe3623](https://gitlab.com/circuitscript/circuitscript-ts/commit/2fe36238f9c17a80fd4faf927abff2846685cebc) fixed import to work for esm

[3ec5b6d](https://gitlab.com/circuitscript/circuitscript-ts/commit/3ec5b6dc649a105484d4a07d2f94750c01382247) patch build:release command
-  version bump to 0.1.6

[467857a](https://gitlab.com/circuitscript/circuitscript-ts/commit/467857a98931df1a20dd6505577f3f459e1c39bc) added token information to errors

[2c880e3](https://gitlab.com/circuitscript/circuitscript-ts/commit/2c880e3c0770d361688301118bf2c6f3d937d2f5) changed import svgdom method to avoid cjs issues
-  missed out validate update

[d1eacef](https://gitlab.com/circuitscript/circuitscript-ts/commit/d1eacefc2e168f36002457fb4b3d94494bae9e09) added missed out print from built in methods list
-  moved this-file package into method

[456df37](https://gitlab.com/circuitscript/circuitscript-ts/commit/456df37c8a19dc8f758141d95ef7db5407740958) added test for both cjs and esm modules

[97c6730](https://gitlab.com/circuitscript/circuitscript-ts/commit/97c673000be033acea09c40c09e5caa855b3bd1c) list out tests to avoid jest issue

## [v0.1.5](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.4...v0.1.5) - 2025-07-26

[ddbb842](https://gitlab.com/circuitscript/circuitscript-ts/commit/ddbb842a1820b57edcf98fd4ef08fc78078c923b) added resolve for component pin net
-  cleaned up delimiter
-  fixed component clone missing parameter
-  updated tests

[bdf2700](https://gitlab.com/circuitscript/circuitscript-ts/commit/bdf27005711f64c5ca0032a68249c8178975a8a9) backup updated example

[b5dab41](https://gitlab.com/circuitscript/circuitscript-ts/commit/b5dab41a2512cb351f06a3ff47b98de42be191a9) add point for branch blocks
-  limit decimal places for text sizing
-  updated tests
-  minor layout fixes

[4f232db](https://gitlab.com/circuitscript/circuitscript-ts/commit/4f232db2e0fbba19f7e0bd10808c67c78af053c8) backup

[be11bef](https://gitlab.com/circuitscript/circuitscript-ts/commit/be11bef7f625dac92e8d08c2892b68e0e2f53d67) cleaned up builtin methods

## [v0.1.4](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.3...v0.1.4) - 2025-05-28

[eb1265c](https://gitlab.com/circuitscript/circuitscript-ts/commit/eb1265c36781276d39cc930e500baeaece568763) changed default frame layout direction

## [v0.1.3](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.2...v0.1.3) - 2025-05-27

[24be729](https://gitlab.com/circuitscript/circuitscript-ts/commit/24be729e35be8d7c92619c5a5d03d953b300612f) cleanups

[5667922](https://gitlab.com/circuitscript/circuitscript-ts/commit/56679228a691265bb4751a60136cce1a26990d6c) cleaned up output decimal places
-  fixed tests

[4a0c523](https://gitlab.com/circuitscript/circuitscript-ts/commit/4a0c5232208b60869219faee9b684d114bfd6095) initial flex box implementation for row
-  added avoid area for frame info/title area

[3f79b0c](https://gitlab.com/circuitscript/circuitscript-ts/commit/3f79b0cf91a1d0478b975d6edacb87ebe39520a9) added flex arrangement for column
-  updated test

[38f513d](https://gitlab.com/circuitscript/circuitscript-ts/commit/38f513de2db16605369f1171a7bb8b9ce125c632) updated keepout class name
-  cleaned up decimal places output

[020ae57](https://gitlab.com/circuitscript/circuitscript-ts/commit/020ae57d5a4c3fa6c5262429d17fec114c274f48) changed existing rect definition to crect (centered rect)

## [v0.1.2](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.1...v0.1.2) - 2025-03-08

[c54cd01](https://gitlab.com/circuitscript/circuitscript-ts/commit/c54cd013bcf5d3e043a1475222add5b24dc2fb4f) cleaned up at/to syntax

[aa43d83](https://gitlab.com/circuitscript/circuitscript-ts/commit/aa43d839c9be89b60df64b7bcb2467a6bb87b46e) improved label/text rendering with angle
-  updated tests

[5a07d74](https://gitlab.com/circuitscript/circuitscript-ts/commit/5a07d74c42d9f4e88b119719155ce75ca3317c34) refactor cleanups

[5ccf30e](https://gitlab.com/circuitscript/circuitscript-ts/commit/5ccf30e84a08c92694d4c8f95ddc081f7545ad3b) fixed logical operators and added tests
-  cleanups

[132ed5d](https://gitlab.com/circuitscript/circuitscript-ts/commit/132ed5d2c983b9483e8b02dbbe8c81cd7da2d005) clean up functions, added documentation

[3e832ee](https://gitlab.com/circuitscript/circuitscript-ts/commit/3e832ee45e3dbce3857f36a80bc6940c0ed12e2d) improved text vertical alignment
-  updated tests

[ce4f9a8](https://gitlab.com/circuitscript/circuitscript-ts/commit/ce4f9a8eeaadd4faa6888414d35bba5813dbd70c) support white space in text

[f78e3b1](https://gitlab.com/circuitscript/circuitscript-ts/commit/f78e3b11d7ac5a18a84d5beb0fa842d0ce7a7f63) fixed bug

## [v0.1.1](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.1.0...v0.1.1) - 2025-02-26

[a598b8d](https://gitlab.com/circuitscript/circuitscript-ts/commit/a598b8d430b1b4265d480411ab3af8b8c53e3e24) integration with big.js for more accurate number handling

## [v0.1.0](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.38...v0.1.0) - 2025-02-02

[0bd1374](https://gitlab.com/circuitscript/circuitscript-ts/commit/0bd1374e99f8d5a6a8088b62744fcfb1f897005c) changed create graphic syntax to include parameter
-  updated lib and tests for variable references in graphic exprs

[6ce01d7](https://gitlab.com/circuitscript/circuitscript-ts/commit/6ce01d7e4d7a8c33c746981c9217163d4afa689a) improved error reporting
-  fixed reference issues

[6990bf7](https://gitlab.com/circuitscript/circuitscript-ts/commit/6990bf711ee897542f3220f36a9f733d1236f435) cleaned up graphic variables
-  updated tests
-  updated lib to include simple title block in frames

[290cfa9](https://gitlab.com/circuitscript/circuitscript-ts/commit/290cfa9fa206a55ade9d39a7f9425bbd6fc8c697) changed graphic expr to be evaluated lazily as a callback

[c61b4f0](https://gitlab.com/circuitscript/circuitscript-ts/commit/c61b4f08303c86a0c982edb71cf8eda7989e8ac7) updated changelog

[5dd90bf](https://gitlab.com/circuitscript/circuitscript-ts/commit/5dd90bf6d0298a3866223561979b143aac564a4a) updated frame component params with frame params

## [v0.0.38](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.37...v0.0.38) - 2025-01-15

[4a4c0bb](https://gitlab.com/circuitscript/circuitscript-ts/commit/4a4c0bbe4a66ac3f571131914fbed4dc809da5e0) support 'and', 'or' and 'not' text as operators
-  added test

## [v0.0.37](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.36...v0.0.37) - 2024-12-29

[7e5046a](https://gitlab.com/circuitscript/circuitscript-ts/commit/7e5046a081cec3f0bc4ec57653a0cbcaab481ac4) changed kicad output method

[b82f3fb](https://gitlab.com/circuitscript/circuitscript-ts/commit/b82f3fbeabfa748c15324853c19487fd75ca9c39) updated changelog

## [v0.0.36](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.35...v0.0.36) - 2024-12-29

[6e6d7be](https://gitlab.com/circuitscript/circuitscript-ts/commit/6e6d7be9b02a8b992d8acbb3a6710f178a683cf6) updated changelog format

[0011685](https://gitlab.com/circuitscript/circuitscript-ts/commit/001168534a792001bac7b6f9f592ff0afddb2842) added more frame methods to draw sheets
-  tidied up sheet naming
-  updated tests

[dfb78f7](https://gitlab.com/circuitscript/circuitscript-ts/commit/dfb78f75f02884b517931979414673acc381a27c) updated main for loop to support enumerate
-  updated tests

[7e0bc25](https://gitlab.com/circuitscript/circuitscript-ts/commit/7e0bc25fb6e1fec61830e2ca05652f6aef612b47) moved builtin methods to separate file
-  refactor to builtin methods handling

## [v0.0.35](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.34...v0.0.35) - 2024-12-28

[b7312a5](https://gitlab.com/circuitscript/circuitscript-ts/commit/b7312a570ce50f4a540adb6162afbaa36b9553d2) added change log

## [v0.0.34](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.32...v0.0.34) - 2024-12-28

[a117e9a](https://gitlab.com/circuitscript/circuitscript-ts/commit/a117e9a72e4a5b178df6225e3f19415ab9307bc6) added operator assignment
-  updated tests

[530f6b1](https://gitlab.com/circuitscript/circuitscript-ts/commit/530f6b1d4c76642550f24f6fc1be343b46c3b886) added simple tests for while, for and continue

[fd65e32](https://gitlab.com/circuitscript/circuitscript-ts/commit/fd65e327585ff0b9efe83ee46bd7cca36aa295c7) added support for while loop

[3df52b9](https://gitlab.com/circuitscript/circuitscript-ts/commit/3df52b909ef52b1a2d120fd7b375a8f37a5d85b9) added for command in graphcis expressions
-  added enumerate function
-  updated tests

[64ab9c1](https://gitlab.com/circuitscript/circuitscript-ts/commit/64ab9c19b52c7b1fc5fdc9cd59c70e971e1df0cd) removed blank expr from grammar
-  added simple array

[1b7c22c](https://gitlab.com/circuitscript/circuitscript-ts/commit/1b7c22cd5bf1aacb9713b018b208d36b86f56c45) improved support for pdf output
-  added 'sheet' keyword for separate sheets

[5f12400](https://gitlab.com/circuitscript/circuitscript-ts/commit/5f124000f3b5c7f447c4eec10f6c6be87a9321ba) changed sheet frames to be defined in terms of component object
-  fixed undeclared reference bugs
-  updated tests

[032c759](https://gitlab.com/circuitscript/circuitscript-ts/commit/032c759cca9750d157d98b311a15272628345179) support multi page PDF output

[5d0d3df](https://gitlab.com/circuitscript/circuitscript-ts/commit/5d0d3df40ade543852bee818c8298d6370a15583) added more while loop tests

[d0ae511](https://gitlab.com/circuitscript/circuitscript-ts/commit/d0ae5119238a644963e5ef9f8d90852c4ac08dd7) updated tests for sheet command
-  fixed pdf output if sheet not defined
-  updated tests

[738ab5c](https://gitlab.com/circuitscript/circuitscript-ts/commit/738ab5c60e0c29247346e8459f3a611f5f0c5647) fixed bug in pdf output rendering
-  updated tests

[53438cf](https://gitlab.com/circuitscript/circuitscript-ts/commit/53438cf1a151ce08d46cf34b9df21d986d7e1d96) added range function
-  added tests for range function

## [v0.0.32](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.31...v0.0.32) - 2024-12-02

[d568819](https://gitlab.com/circuitscript/circuitscript-ts/commit/d56881985a5b181885c0e62dc2e54d6c2b2d59b0) backup

[6dd9eec](https://gitlab.com/circuitscript/circuitscript-ts/commit/6dd9eecf1e652db88e166071e5d04e5c53af31fb) added pdf output
-  updated tests

[045e224](https://gitlab.com/circuitscript/circuitscript-ts/commit/045e224a0a0e0e8d54c4c5d6013d354c68d3758c) fixed bug with auto wires
-  added tests

## [v0.0.31](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.30...v0.0.31) - 2024-11-28

[4faa3f7](https://gitlab.com/circuitscript/circuitscript-ts/commit/4faa3f751fb96519ec39a22e2eb1cc23d696b654) backup font

## [v0.0.30](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.29...v0.0.30) - 2024-11-27

[60dba2b](https://gitlab.com/circuitscript/circuitscript-ts/commit/60dba2b8a5b03053f9f36b8e115954fd9aade347) wrap indented expressions in block

[dcf25b6](https://gitlab.com/circuitscript/circuitscript-ts/commit/dcf25b65ac2a6c05a59bac80975b266e196fc70e) added initial support for modules
-  changed component type to module in library

[19e7cf1](https://gitlab.com/circuitscript/circuitscript-ts/commit/19e7cf1bfbaee96414df298d391522329dd271e5) change font sizing to be based on mils
-  updated lib.cst
-  updated tests, moved svg outputs to another folder

[9bfc6f4](https://gitlab.com/circuitscript/circuitscript-ts/commit/9bfc6f48ad209478dcb83c21a408ba13003a3d05) added tests for modules

[fc25211](https://gitlab.com/circuitscript/circuitscript-ts/commit/fc2521117fbbc6477cc7e1d086ac95858a1b787d) changed internal units to mm
-  set default user code units to mils
-  updated tests to mils

[4147e33](https://gitlab.com/circuitscript/circuitscript-ts/commit/4147e336dca4c635b8801b83f97a1c62d4d89f8d) changed font to Arial to fix rendering issues
-  added support for ports

[0741db6](https://gitlab.com/circuitscript/circuitscript-ts/commit/0741db6be4ca65f1b3dc23110819cfe738bc2840) backup for integrating mm and mils units

[3aec157](https://gitlab.com/circuitscript/circuitscript-ts/commit/3aec157e8571437fd88be5fbd4aa1904a3968825) updated module creation scope
-  fixed module component namespace
-  updated tests

[685d31f](https://gitlab.com/circuitscript/circuitscript-ts/commit/685d31f6b6e2a277221c69d48d334a656f83e75d) fixed issue with extra wire junctions and warnings about component placement

[e368cfd](https://gitlab.com/circuitscript/circuitscript-ts/commit/e368cfddba7b74e5f27bf00bcbf0772928d606b9) added error for auto wire length case
-  updated test

[85adee0](https://gitlab.com/circuitscript/circuitscript-ts/commit/85adee094613c2bdfb13d6bccd6198e6691b60b2) fixed orientation bug in initial at command
-  changed global colors

[0571b32](https://gitlab.com/circuitscript/circuitscript-ts/commit/0571b321ed3358a8c17a8ef5e328038d6e5c92e5) fixed component naming issue
-  updated test

## [v0.0.29](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.28...v0.0.29) - 2024-10-18

[a7f5a57](https://gitlab.com/circuitscript/circuitscript-ts/commit/a7f5a5793f7bdeb77fe66ba921a4c5bcd6e95d74) updated color scheme
-  updated tests

## [v0.0.28](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.27...v0.0.28) - 2024-10-17

[2d8d9f2](https://gitlab.com/circuitscript/circuitscript-ts/commit/2d8d9f20a0091ec3731df169fd8645ca3b21ef2c) fixed not fitted cross placement
-  fixed tests
-  updated lib

## [v0.0.27](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.26...v0.0.27) - 2024-10-17

[2b8322f](https://gitlab.com/circuitscript/circuitscript-ts/commit/2b8322f6f328347864407abc49f27fca025f085f) added textbox as parent of label geometry

[f09de7d](https://gitlab.com/circuitscript/circuitscript-ts/commit/f09de7d62a8c52c2afcd9f1dbf476510b6c32aef) generate pin positions for symbol custom
-  added test

[07c1912](https://gitlab.com/circuitscript/circuitscript-ts/commit/07c19123bcf262f23b58841d7ad37c02c0e3c436) updated execute engine to layout components based on connect wire orientation
-  added tests

[3298ad5](https://gitlab.com/circuitscript/circuitscript-ts/commit/3298ad52248d6d87474205f9dcd1e67bc5f756b5) set modifiers to have priority over wire orientation
-  fixed tests

[6a28b8a](https://gitlab.com/circuitscript/circuitscript-ts/commit/6a28b8a6b5248091ec44745f4bc618c7c5d2b25b) fixed arc drawing bug
-  added test

[d8e92c2](https://gitlab.com/circuitscript/circuitscript-ts/commit/d8e92c2dac90971c48e26dc3fe589dbb9431c805) added test for text graphic expr command
-  fixed tests

[792de12](https://gitlab.com/circuitscript/circuitscript-ts/commit/792de12bf81c33a6e8a240c0405a40d086adeeb2) added handling of keywords for function calls

[ea0216c](https://gitlab.com/circuitscript/circuitscript-ts/commit/ea0216c116e4a5f9519babebd29f4208ce3d0969) added anchor modifier
-  added tests

[778e8b9](https://gitlab.com/circuitscript/circuitscript-ts/commit/778e8b97ad74e3ee96b90748454299b3bbb0518c) fixed component cloning issues
-  fixed tests
-  changed component orientation to flip

[b06bd7d](https://gitlab.com/circuitscript/circuitscript-ts/commit/b06bd7d1836145a2e9e3e9421275b889587b1f2b) fixed wire orientation for auto wires

## [v0.0.26](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.25...v0.0.26) - 2024-08-28

[0b82f1a](https://gitlab.com/circuitscript/circuitscript-ts/commit/0b82f1a0d1b3705938298c9b4cf14d94f9c2e27d) added comparison and logical operators
-  updated tests

[2cf8c67](https://gitlab.com/circuitscript/circuitscript-ts/commit/2cf8c6739c9c4658217a0fada09fc1802253d358) added copy main param to create component
-  updated tests

[a07e963](https://gitlab.com/circuitscript/circuitscript-ts/commit/a07e963c292ddf312ffc7b8b465ed585e824a014) updated cli command format
-  added test for kicad export format and missing footprints

[826352a](https://gitlab.com/circuitscript/circuitscript-ts/commit/826352a7d82509a98e44161fa8dad191c1014cdf) updated license info

[b9be16a](https://gitlab.com/circuitscript/circuitscript-ts/commit/b9be16a933199a7cfac21077a745490f53f89151) removed __is_net
-  updated tests

[80374e6](https://gitlab.com/circuitscript/circuitscript-ts/commit/80374e6fe5250d3bb26bc0140946d0f7b4b1af8d) renamed sub_expr to graphic_expr

[b0a8204](https://gitlab.com/circuitscript/circuitscript-ts/commit/b0a8204a7f371d7e7a7d7831c6fdd755a7ad54fd) updated handling of reference type for pin type

[5deb2cd](https://gitlab.com/circuitscript/circuitscript-ts/commit/5deb2cd3a18244a1e9720daf4b0a0e7957072fae) removed -f flag for cli

[7089606](https://gitlab.com/circuitscript/circuitscript-ts/commit/7089606c3ec6d817104d65052a85cc356d246716) fixed handling of null component or pin

## [v0.0.25](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.24...v0.0.25) - 2024-08-04

[0334eb8](https://gitlab.com/circuitscript/circuitscript-ts/commit/0334eb8d99140f2dc224128619f83f7a40448101) changed antlr4 runtime to antlr4ng
-  updated code and tests for antlr4ng

[94212f3](https://gitlab.com/circuitscript/circuitscript-ts/commit/94212f32d097cc789ee9ed4914f7d2ef879c9b75) initial version of symbol validator parser
-  updated wire expression handling

[60e8289](https://gitlab.com/circuitscript/circuitscript-ts/commit/60e828909f4d0742c3b90d860ac55dc029204dce) added flipX flipY commands
-  updated tests

[8bad76b](https://gitlab.com/circuitscript/circuitscript-ts/commit/8bad76b9cdfb797a6abaafdb285a13455dab4eed) backup

[85c0fed](https://gitlab.com/circuitscript/circuitscript-ts/commit/85c0fed0c15c08f272bdac336c2d5b0c965d039f) updated syntax for component modifiers
-  updated tests

[2d7a845](https://gitlab.com/circuitscript/circuitscript-ts/commit/2d7a845e24afdd442367ed662ed9549c4dc3d462) added semantic token visitor
-  minor cleanups

[77d4351](https://gitlab.com/circuitscript/circuitscript-ts/commit/77d4351e736748c66b8c89af4ec6f4d8c7e81112) changed from return values to storing in map

[1f6564e](https://gitlab.com/circuitscript/circuitscript-ts/commit/1f6564e7cd9f74e4702c7d3cf6320e910c462a7e) cleanups

[30e2c73](https://gitlab.com/circuitscript/circuitscript-ts/commit/30e2c73e42c0ded5a40d68191e180fab8046017f) updated symbol validation
-  updated tests
-  renamed logging function to log

[09ac372](https://gitlab.com/circuitscript/circuitscript-ts/commit/09ac372daa0a6fcb8a6ab7317cb6d1a9a2ace7aa) added tests for symbol validation

[01a34e5](https://gitlab.com/circuitscript/circuitscript-ts/commit/01a34e55f81154c1e4c4746d27dac96314662902) error handling cleanup
-  added launch.json
-  fixed comments in lib.cst

[f5816e7](https://gitlab.com/circuitscript/circuitscript-ts/commit/f5816e7bc3285e6e7d6a1f85886f00c777897493) backup examples

[1d09e93](https://gitlab.com/circuitscript/circuitscript-ts/commit/1d09e93d9044eb854dbb4fdcf4e5c8e4b1f35fdd) clean up tools path fetching
-  update package json list of files

[2ef31ef](https://gitlab.com/circuitscript/circuitscript-ts/commit/2ef31efe072b832f418eec1581be78f70a466ce5) improved scripts that start with `add` or `wire` commands
-  updated tests

## [v0.0.24](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.23...v0.0.24) - 2024-07-10

[fd1e5c6](https://gitlab.com/circuitscript/circuitscript-ts/commit/fd1e5c69626b6a7aee5bbe4e80322d3f3a35d438) updated release configs
-  update gitlab ci config

## [v0.0.23](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.22...v0.0.23) - 2024-07-10

[a9bec24](https://gitlab.com/circuitscript/circuitscript-ts/commit/a9bec24884856a855f8247dc7119ab4599d3494c) got tests working again with cjs

[3becc96](https://gitlab.com/circuitscript/circuitscript-ts/commit/3becc964bf8bc00abc8ed78267efe5adac73362e) moved frame into keyword
-  fixed wrong char for comment in lib.cst

[cc9c1ca](https://gitlab.com/circuitscript/circuitscript-ts/commit/cc9c1cad4718315b3d6c2b97dd11305086323c18) minor typing fixes

[3b8576e](https://gitlab.com/circuitscript/circuitscript-ts/commit/3b8576e9bf5340a9fd92c6a60a43b31042d639e4) parse comments as tokens
-  fixed svgdom import for commonjs

[918ab2e](https://gitlab.com/circuitscript/circuitscript-ts/commit/918ab2e284e0e978f91e78b538c01271a1291434) initial semantic parsing

[352dabe](https://gitlab.com/circuitscript/circuitscript-ts/commit/352dabeac5e5969e2d08f477583954a798403a27) added tsconfigs for mjs and cjs
-  updated tests

[ffa4adb](https://gitlab.com/circuitscript/circuitscript-ts/commit/ffa4adb994033230601c36976750ee8fa7393438) updated semantic tokens

## [v0.0.22](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.21...v0.0.22) - 2024-06-28

[e82d205](https://gitlab.com/circuitscript/circuitscript-ts/commit/e82d205d30ef1255f1ecf9cc117a492a6c861860) generate types

## [v0.0.21](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.20...v0.0.21) - 2024-06-27

[1c9ffcf](https://gitlab.com/circuitscript/circuitscript-ts/commit/1c9ffcfeffa66fdd85f8c74a65bc08322b443807) fixed handling of unary operator before parentheses
-  updated test

## [v0.0.20](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.19...v0.0.20) - 2024-06-07

[db9f734](https://gitlab.com/circuitscript/circuitscript-ts/commit/db9f7342ea172c15754494653d0b91d554d38f5b) updated arduino example with joins, parallels, branches and points

[003da66](https://gitlab.com/circuitscript/circuitscript-ts/commit/003da66b97498f26ff477d4adcde74ebe0e06f20) added parsing of different consecutive block types
-  added test

## [v0.0.19](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.18...v0.0.19) - 2024-06-02

[1104420](https://gitlab.com/circuitscript/circuitscript-ts/commit/11044206d26f9872c252099a40394e8d0a2afe18) added `point` blocks
-  added tests for `point` blocks

[512cf7e](https://gitlab.com/circuitscript/circuitscript-ts/commit/512cf7e27f0d9de3bb86fc1f022e46f58129f42b) refactor branch related to blocks

[6bbe52c](https://gitlab.com/circuitscript/circuitscript-ts/commit/6bbe52ccde6a6e59dbd038a608cc529c1a31e4f2) updated tests

## [v0.0.18](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.17...v0.0.18) - 2024-05-31

[e01f99f](https://gitlab.com/circuitscript/circuitscript-ts/commit/e01f99f0168a18905a4f57a9fa4330c589fe71f7) added support for join keyword
-  updated tests

[7367952](https://gitlab.com/circuitscript/circuitscript-ts/commit/73679521a6530cfd3e0fd5e042f03473b0f76029) fixed bug in post function calls
-  added test
-  added NO_NET as a global string

[9ce6de4](https://gitlab.com/circuitscript/circuitscript-ts/commit/9ce6de4c530dac34900c6e1c5fa37ff1ade825ee) fixed precision issue that cause small mismatch of junction points

## [v0.0.17](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.16...v0.0.17) - 2024-05-24

[d828f94](https://gitlab.com/circuitscript/circuitscript-ts/commit/d828f94374f42ccc21794dbb36f6706f79445eec) fixed display and position of text
-  hide pin display for marker point in standard lib
-  updated test

## [v0.0.16](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.16-test1...v0.0.16) - 2024-05-20

## [v0.0.16-test1](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.15...v0.0.16-test1) - 2024-05-20

[ee8617f](https://gitlab.com/circuitscript/circuitscript-ts/commit/ee8617fc2e189b9060c9645a371fa994e6a77d71) test

[8be9f9e](https://gitlab.com/circuitscript/circuitscript-ts/commit/8be9f9e25994b65d6bd116cd73a52daa6c0f150d) updated ci

## [v0.0.15](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.15-test6...v0.0.15) - 2024-05-20

## [v0.0.15-test6](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.15-test5...v0.0.15-test6) - 2024-05-20

[f5515ba](https://gitlab.com/circuitscript/circuitscript-ts/commit/f5515baa45889585abba33b0ec4af09e62d93cbe) test

## [v0.0.15-test5](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.15-test3...v0.0.15-test5) - 2024-05-20

[e36cd07](https://gitlab.com/circuitscript/circuitscript-ts/commit/e36cd077043d93451c14b9a502daa5f5321cbf04) test

## [v0.0.15-test3](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.15-test2...v0.0.15-test3) - 2024-05-20

## [v0.0.15-test2](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.15-test...v0.0.15-test2) - 2024-05-20

[dda0517](https://gitlab.com/circuitscript/circuitscript-ts/commit/dda05171077631361ad6ab76b6c2d4167ca34dd4) test

## [v0.0.15-test](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.14...v0.0.15-test) - 2024-05-20

[1fed7f3](https://gitlab.com/circuitscript/circuitscript-ts/commit/1fed7f32f700d88de7f72547c68654cdddfc0cda) backup arduino example

[8726edc](https://gitlab.com/circuitscript/circuitscript-ts/commit/8726edcc6fb28227941d9eabc12a7ee630404bdd) cleaned up symbol drawing, added triangles
-  updated tests

[bd22fbe](https://gitlab.com/circuitscript/circuitscript-ts/commit/bd22fbe1578dbea596bbbcbeb7968da80534e865) updated font

[67bc723](https://gitlab.com/circuitscript/circuitscript-ts/commit/67bc72396e8fbaf3a2eb31bcbc95d778dd2de9c7) added vpin and hpin drawing commands
-  updated tests

[8feef89](https://gitlab.com/circuitscript/circuitscript-ts/commit/8feef89b58b4e788d6539bc473c62bff96cc958b) added labels to indicate pinId and pinName
-  fixed bug of measuring bounds of empty string
-  updated annotater to accept custom types at runtime
-  updated tests

[90f24c1](https://gitlab.com/circuitscript/circuitscript-ts/commit/90f24c1f752fed8c938c2eb59a77f0ed1dfe3dbb) added angle for labels
-  fixed rendering of circles
-  updated applying of text values to labels
-  regenerate test render data

[a6a52c7](https://gitlab.com/circuitscript/circuitscript-ts/commit/a6a52c7b13891fa8f580eca7639733ecbcd9e9ae) fixed ci

[93f0e2e](https://gitlab.com/circuitscript/circuitscript-ts/commit/93f0e2edd7eb4043a48ba4f8156828419f510c22) test

[2fbdcf7](https://gitlab.com/circuitscript/circuitscript-ts/commit/2fbdcf720c6b519e7d470787b48c5caf1fd5c2e5) updated ci

[44c4603](https://gitlab.com/circuitscript/circuitscript-ts/commit/44c460300479292242c4215c34d31f8793721127) fixed undefined labels

[4abc30e](https://gitlab.com/circuitscript/circuitscript-ts/commit/4abc30e0e9b14a5934b349aad1d67cbb967b4434) test

[0276917](https://gitlab.com/circuitscript/circuitscript-ts/commit/0276917296cba3fba2c67f0948512282ffc1ee23) test

[b6dc9a2](https://gitlab.com/circuitscript/circuitscript-ts/commit/b6dc9a25d5332e3b55016b5718d593010c2fee5c) test

## [v0.0.14](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.13...v0.0.14) - 2024-05-09

[8fe3d89](https://gitlab.com/circuitscript/circuitscript-ts/commit/8fe3d89847e79bc4bfc99b4bf2b344451ac5cf8b) updated font

[b2e211b](https://gitlab.com/circuitscript/circuitscript-ts/commit/b2e211ba4a9e7fd734648cf9faf74ad640dca7e5) fixed wrong

[02d16e0](https://gitlab.com/circuitscript/circuitscript-ts/commit/02d16e00b402eb8b326af8444a85e8123f6e457c) fixed ci issue

## [v0.0.13](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.12...v0.0.13) - 2024-05-03

[dca8164](https://gitlab.com/circuitscript/circuitscript-ts/commit/dca81645083696f83e61186afbd708990b46b230) updated arduino example
-  renamed file

[d5fedf4](https://gitlab.com/circuitscript/circuitscript-ts/commit/d5fedf4682766c24645d25560b955a3c5bb95972) minor cleanups

[588a98f](https://gitlab.com/circuitscript/circuitscript-ts/commit/588a98f5fbad6857d4f3b0e0cd0485df74f3884f) fixed bug in labels for flipped components
-  added test

## [v0.0.12](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.11...v0.0.12) - 2024-04-28

[146aa58](https://gitlab.com/circuitscript/circuitscript-ts/commit/146aa58b42d43b522ce35d84de39f34f41b1a7b4) fixed version in cli tool
-  updated package.json and README

## [v0.0.11](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.10...v0.0.11) - 2024-04-28

[4d6df9a](https://gitlab.com/circuitscript/circuitscript-ts/commit/4d6df9a2a89e53b82bae9135d5cea86514df335c) fixed import path of fonts
-  added resolve to default lib.cst

## [v0.0.10](https://gitlab.com/circuitscript/circuitscript-ts/compare/v0.0.9...v0.0.10) - 2024-04-28

[1d8f80c](https://gitlab.com/circuitscript/circuitscript-ts/commit/1d8f80c42498fb7116d6cb3d623892053517859d) fixed jest tests and package version bug

[c5f8947](https://gitlab.com/circuitscript/circuitscript-ts/commit/c5f8947bc6ef7aba20e7f42822c56945d5bac4d9) added smoke test for build

## v0.0.9 - 2024-04-27

[119973f](https://gitlab.com/circuitscript/circuitscript-ts/commit/119973f643aa891ffa459922fb37e519da6f6b54) missed out package

[f455715](https://gitlab.com/circuitscript/circuitscript-ts/commit/f455715ca63fc823966ebb44195d81b77f32c70a) initial commit

[8b7a511](https://gitlab.com/circuitscript/circuitscript-ts/commit/8b7a511af4387831fd2eaf96ff798b0246043a78) backup

[5e79c3a](https://gitlab.com/circuitscript/circuitscript-ts/commit/5e79c3acc4a11a7126aac336579dd66b6e9564ce) minor cleanup to grammar

[9c70991](https://gitlab.com/circuitscript/circuitscript-ts/commit/9c7099163c6df30f554c46bfee55e380716552ab) added basic support for frames and text

[3545ec5](https://gitlab.com/circuitscript/circuitscript-ts/commit/3545ec567363a82d262139a7be5418c76df1e9a1) fixed bug in handling of negative numeric values

[012617d](https://gitlab.com/circuitscript/circuitscript-ts/commit/012617d60bfd5e5cea4ae08af4315c546bea048c) update grammar to fix math operations
-  added double dot operator

[43f174e](https://gitlab.com/circuitscript/circuitscript-ts/commit/43f174e14051dc8b16b19a31d9579d6ea84438ef) added some binary and unary operators

[332bb9a](https://gitlab.com/circuitscript/circuitscript-ts/commit/332bb9a7a9d3d204eaedce06fdf6ed0ceb8a14cf) backup

[bb640e7](https://gitlab.com/circuitscript/circuitscript-ts/commit/bb640e75ea5a893f5492ab3ac7c49e4ab512b5e8) added net namespace command into grammar
-  split off instance namespace and net namespace

[4b02466](https://gitlab.com/circuitscript/circuitscript-ts/commit/4b0246690f5ea22bdc480fef943b3ab0c9283ead) changed indent parsing to use adapted python 3 lexer from antlr repo
-  updated import to return errors

[a1a7723](https://gitlab.com/circuitscript/circuitscript-ts/commit/a1a7723cfdec8d3d94a2de4628ec44169bf9a7a1) clean up grammar

[628f7a2](https://gitlab.com/circuitscript/circuitscript-ts/commit/628f7a2c363a2a68fcc123e914fe32955760862c) fixed bug with negative unary operator
-  fixed order of value_expr in data_expr

[9c03c90](https://gitlab.com/circuitscript/circuitscript-ts/commit/9c03c9051c0c46aafcc031b0c93e22e9258c8c00) added point keyword

[3849ce6](https://gitlab.com/circuitscript/circuitscript-ts/commit/3849ce64857fdd732c20dc2787b1794f19778712) fixed bug in assignment in at/to/add commands

[9c9690a](https://gitlab.com/circuitscript/circuitscript-ts/commit/9c9690a3891eb718ab5d259e781651bb84727d47) added import keyword
-  added basic support for import

[a9590ab](https://gitlab.com/circuitscript/circuitscript-ts/commit/a9590abde1462ebd06f902809c2bcac17c0c8765) minor cleanups to grammar

[6d22cf8](https://gitlab.com/circuitscript/circuitscript-ts/commit/6d22cf8329ff0c90b79517ff3de51568aac17ad0) simplify signed value grammar

[060080e](https://gitlab.com/circuitscript/circuitscript-ts/commit/060080eb1e5e0acd21dacd1e678424ad22539be2) updated language to include wire command

[6cd3dfa](https://gitlab.com/circuitscript/circuitscript-ts/commit/6cd3dfa7432598a968952518d18f4e109b5b6cd6) added style to language

[6f6f903](https://gitlab.com/circuitscript/circuitscript-ts/commit/6f6f903a26ee9e10ba558e46b6df374885a33ab8) updated wire command

[f90688a](https://gitlab.com/circuitscript/circuitscript-ts/commit/f90688acb32c02a3813163252debf6f235b64144) formatted with prettier

[143adaf](https://gitlab.com/circuitscript/circuitscript-ts/commit/143adafb539a3b10ef72eccd0496694ef34b7132) backup examples

[78b1a4c](https://gitlab.com/circuitscript/circuitscript-ts/commit/78b1a4cac9a1e59708694448799d445ad6c11905) cleanup examples

[2b48928](https://gitlab.com/circuitscript/circuitscript-ts/commit/2b489285c4180e703f7bdaf74317b81f57bddda8) backup

[27098eb](https://gitlab.com/circuitscript/circuitscript-ts/commit/27098eb4bf9e16b703eda10717715ae462d1e024) removed elk based code

[41c5653](https://gitlab.com/circuitscript/circuitscript-ts/commit/41c565300caa6a0351baf1cb254086d96fa10a45) added direction modifiers for at and to commands

[bfb4bc3](https://gitlab.com/circuitscript/circuitscript-ts/commit/bfb4bc3ecc6561a0e3dc7fc1c0e009759d5604f2) added add direction into grammar
-  updated execute to set orientation and layout to calculate angle

[551fea9](https://gitlab.com/circuitscript/circuitscript-ts/commit/551fea9478d46d0d30407ea286300e8fb4caa933) minor refactor to tests
-  added tests for net namespace syntax
-  backup example

[046a8a5](https://gitlab.com/circuitscript/circuitscript-ts/commit/046a8a5c5b38037e5960a7fe6745857e1657cd20) added blank items to grammar

[2eaae58](https://gitlab.com/circuitscript/circuitscript-ts/commit/2eaae58a418c16e7088821a25244d02beccd6cfb) backup examples

[218de8a](https://gitlab.com/circuitscript/circuitscript-ts/commit/218de8a9d95b5e84ca77c1397857447a77406254) added create graphic command and sub expressions
-  allow drawing of graphics to be handled within circuitscript

[81f9de7](https://gitlab.com/circuitscript/circuitscript-ts/commit/81f9de76325cdbecac4a1fa112e8758b24028732) added handling for default params in function defs

[0399966](https://gitlab.com/circuitscript/circuitscript-ts/commit/0399966b6a3a7670d791e95cc6b643287b46647d) minor cleanup to grammar

[c97a274](https://gitlab.com/circuitscript/circuitscript-ts/commit/c97a274224af152c049afdc6e8556065213fe98a) added support for booleans
-  basic implementation for set property

[06f7a32](https://gitlab.com/circuitscript/circuitscript-ts/commit/06f7a32d32868893600f048725694ee1617be1e8) minor refactor for layout code into layout engine
-  added logger to layout engine
-  added error handling to main.ts

[c3fd0d9](https://gitlab.com/circuitscript/circuitscript-ts/commit/c3fd0d91623e4aa425c304e8d80ec1e9de497102) first working basic version

[32e8f57](https://gitlab.com/circuitscript/circuitscript-ts/commit/32e8f57d8dfa24ed3939d08df440a14568f0abf7) added EOF to grammar

[1f3aa13](https://gitlab.com/circuitscript/circuitscript-ts/commit/1f3aa130eee8b739e6584c86c2881b1e81232dd0) moved out geometry code to separate file/interface
-  ported symbols to use geometry code

[4bd0a77](https://gitlab.com/circuitscript/circuitscript-ts/commit/4bd0a77df3f6bdbe2ec52be78691b36540986233) updated language to select pin when adding components

[896ca82](https://gitlab.com/circuitscript/circuitscript-ts/commit/896ca8241e7dac8e0ffea6da49a5034b54355e55) backup arduino schematic 1

[452ad37](https://gitlab.com/circuitscript/circuitscript-ts/commit/452ad37355ca843e6a1228fb8648e713537c2ec8) added test for pre ELK output

[c8caafc](https://gitlab.com/circuitscript/circuitscript-ts/commit/c8caafc3ad21b8db97553336e532264edb52c43b) updated grammar for appending net namespace

[7121c36](https://gitlab.com/circuitscript/circuitscript-ts/commit/7121c36b64241bd06ec89bdb81e10b4deb9dae72) initial example with custom render and layout

[4b1d3d8](https://gitlab.com/circuitscript/circuitscript-ts/commit/4b1d3d8155a1ecd585b47f85330124ab6992daea) updated language to allow auto length wires

[a91b74a](https://gitlab.com/circuitscript/circuitscript-ts/commit/a91b74a3c9cefd4a77ee24c1cfb17ccb640451b7) remove deleted files

[2bafeb8](https://gitlab.com/circuitscript/circuitscript-ts/commit/2bafeb8093f9a6be54550d6f2c4b280d10d4aade) parse decimal values

[bb26227](https://gitlab.com/circuitscript/circuitscript-ts/commit/bb2622753a332739e750c6013714666fbaae1b08) updated example with frames

[7b8dfff](https://gitlab.com/circuitscript/circuitscript-ts/commit/7b8dfff729aa3c8a68bf9520fd1b67211872b606) initial implementation of nested frames

[9ff8a9f](https://gitlab.com/circuitscript/circuitscript-ts/commit/9ff8a9f5c3766a1db3e9a4336414874d93172965) initial version of graph based layout

[25ff025](https://gitlab.com/circuitscript/circuitscript-ts/commit/25ff02531908f591729f6aa49779e1b1eca7ba01) changed wire command handling
-  added drawing of custom symbols

[7d9fa5b](https://gitlab.com/circuitscript/circuitscript-ts/commit/7d9fa5bd6cf120ce008d5469e5bc3323311dad2a) added decimal support into grammar

[b88db2e](https://gitlab.com/circuitscript/circuitscript-ts/commit/b88db2e29901e9cd319d50d0515fc350a2f47d7a) initial CI script
-  fixes for node cli app

[af4f36f](https://gitlab.com/circuitscript/circuitscript-ts/commit/af4f36fe029d699e63e4ba759ed4aadd9e4f136c) added auto keyword for parsing wires

[d5ef9b7](https://gitlab.com/circuitscript/circuitscript-ts/commit/d5ef9b7b48fcc0f534ceaddbdcbdd66943a16136) backup examples

[f3cef94](https://gitlab.com/circuitscript/circuitscript-ts/commit/f3cef9452010115f4aede93a04998a94cf856194) initial working version of graph layout

[f362385](https://gitlab.com/circuitscript/circuitscript-ts/commit/f362385cbfd411d6b77bc3bbed8879b3e3ed67f5) update custom symbol drawing
-  minor color update
-  fixed undefined bbox values

[cab363e](https://gitlab.com/circuitscript/circuitscript-ts/commit/cab363e535d59a8d4c2e6740021d7fc1ef94d00a) backup

[b845e31](https://gitlab.com/circuitscript/circuitscript-ts/commit/b845e31633c4105f122fd83220057e62bcfdc309) backup

[86dbad9](https://gitlab.com/circuitscript/circuitscript-ts/commit/86dbad92afeb5949d0c3feedf341993c23dcfa29) added place subgraph strategy 2

[a00d561](https://gitlab.com/circuitscript/circuitscript-ts/commit/a00d561538a45e76cd9ea610d0d411650625f65b) backup examples

[76fb6d2](https://gitlab.com/circuitscript/circuitscript-ts/commit/76fb6d2a697dba368f704c9c7bd2841fbbfe8740) updated wire merging code

[55b9882](https://gitlab.com/circuitscript/circuitscript-ts/commit/55b9882d8722e2587621e4c3d595962f89367b5d) update symbols
-  change port display
-  show net name

[fbfc4c5](https://gitlab.com/circuitscript/circuitscript-ts/commit/fbfc4c5c3393a0f0eb13232ce406ba3da93e8a70) improve typing

[9b3e85a](https://gitlab.com/circuitscript/circuitscript-ts/commit/9b3e85ac5eafb420f8c17c4744bbf4768775e183) clean up examples

[216f28d](https://gitlab.com/circuitscript/circuitscript-ts/commit/216f28d64f75102111062aed37d867b51b61acb4) updated typing and cleanups

[c94c325](https://gitlab.com/circuitscript/circuitscript-ts/commit/c94c3257c74c3307439d6e8ffd6c9904819dff0a) initial integration with elkjs

[26afa3c](https://gitlab.com/circuitscript/circuitscript-ts/commit/26afa3c0c72716143c0f4403b9c177d211728ee2) added junctions
-  added horizontal and vertical alignment for text

[00786de](https://gitlab.com/circuitscript/circuitscript-ts/commit/00786dee62b3e6d0770d338b4d8e767e34b259fb) moved test data into files

[8e8f064](https://gitlab.com/circuitscript/circuitscript-ts/commit/8e8f064df4bbe085eeb04765f39e61e9ca868e10) update code for merging wires
-  added test for merging wires
-  minor cleanups

[1463d9e](https://gitlab.com/circuitscript/circuitscript-ts/commit/1463d9e98a14ed1b0de3dd3e274d5cf7dc5d733d) added net name for To sequence action
-  updated elk layout config

[72e4cda](https://gitlab.com/circuitscript/circuitscript-ts/commit/72e4cdaa2d65df3e3c487439c7c605092bf1ef3d) backup documentation from python repo

[f49354b](https://gitlab.com/circuitscript/circuitscript-ts/commit/f49354b4c82832ace87aa6965397db9813e9b430) fixed cloning bug of display prop

[e3ad9df](https://gitlab.com/circuitscript/circuitscript-ts/commit/e3ad9df652fbbe1af37a29210102c5569ebdecaf) added concept of the sequence to determine the drawing order
-  updated config for layout algorithm

[c9f6948](https://gitlab.com/circuitscript/circuitscript-ts/commit/c9f69480bd11f8ec0b4db9cd3f3e37443019774c) added atom expr to better handle properties of IDs, etc.

[562cd56](https://gitlab.com/circuitscript/circuitscript-ts/commit/562cd562adf525b7c8984c30d0ee7fb414cb473c) added symbol drawing class

[b149a7f](https://gitlab.com/circuitscript/circuitscript-ts/commit/b149a7f4bac200fee79595cb81063240388be402) added layout for subgraphs
-  moved get bounds to layout

[8cce5f9](https://gitlab.com/circuitscript/circuitscript-ts/commit/8cce5f9e49065206680ad0dbb3554985e77b29b2) added example 3

[aa5db37](https://gitlab.com/circuitscript/circuitscript-ts/commit/aa5db3778579fe637f8cfe9628bb500bd6eda9e7) added handling for branches
-  fixed bug when merging nets

[b435da4](https://gitlab.com/circuitscript/circuitscript-ts/commit/b435da4f9c9cfc7451d890264ed876ddfe3b510e) updated example for frames

[3edc4b9](https://gitlab.com/circuitscript/circuitscript-ts/commit/3edc4b9288071dcccee8615240adae968a7bcb47) updated arduino example

[9ec6d84](https://gitlab.com/circuitscript/circuitscript-ts/commit/9ec6d84981dfecfddc49dc9ea921d45665ee5313) moved gnd to be defined as a circuitscript function instead of hardcoded into language
-  updated tests

[19709fc](https://gitlab.com/circuitscript/circuitscript-ts/commit/19709fc90e919a9b655dde3082885e3dfa46fcc4) added code to measure text bbox
-  use text bbox for label sizes
-  added basic symbols for gnd and power

[b66cc30](https://gitlab.com/circuitscript/circuitscript-ts/commit/b66cc300314e70e2f0b472d14250aadb46b17031) added display prop to component to determine which graphic to display
-  added symbol factory and basic symbols

[a907d6d](https://gitlab.com/circuitscript/circuitscript-ts/commit/a907d6df9a6f0fe44bb0fc3faf93643717f09d19) removed DenterHelper

[20a742e](https://gitlab.com/circuitscript/circuitscript-ts/commit/20a742eff6664ff2cd2342a54287fcdaa3d69cff) initial version of denter helper

[ee9cd2e](https://gitlab.com/circuitscript/circuitscript-ts/commit/ee9cd2e4757729bab20e948c79762fe1f0a8909c) updated tests

[eabff3b](https://gitlab.com/circuitscript/circuitscript-ts/commit/eabff3b4d336b4f61e8054287b015c1f3cead5ee) added tests

[629946a](https://gitlab.com/circuitscript/circuitscript-ts/commit/629946af006a0ebdd32b9cd12ffcb68f8f57fdfc) clean up label structure
-  added labels to res symbol

[ff7a6ea](https://gitlab.com/circuitscript/circuitscript-ts/commit/ff7a6ea1904857c0700badc457c344a4354b99d0) cleaned up test

[4912a93](https://gitlab.com/circuitscript/circuitscript-ts/commit/4912a93f5c7eb4ab482ebc3ff2889c48ab680381) changed layout algo
-  added floating concept to render items

[907a872](https://gitlab.com/circuitscript/circuitscript-ts/commit/907a8721e64da47d04f89531de2161936d8b0922) updated package name
-  updated cli options, removed font

[3892b44](https://gitlab.com/circuitscript/circuitscript-ts/commit/3892b442ceaf8d22ad3c93290fe495535eeffe0a) added arrange property when create component
-  added ports to components

[6fce2aa](https://gitlab.com/circuitscript/circuitscript-ts/commit/6fce2aa42060ae1b9ec1fcdc683c3a0123bd17dd) added handling for path drawing command
-  added drawing commands to set line width, color and fill

[b90853c](https://gitlab.com/circuitscript/circuitscript-ts/commit/b90853cdafd09c9fda2c8b78990816b3ae1f68be) updated placement and render of frames

[aab7ff7](https://gitlab.com/circuitscript/circuitscript-ts/commit/aab7ff7e38a714885d244fe90682dccd65f8005e) minor refactor to layout

[f6c82fc](https://gitlab.com/circuitscript/circuitscript-ts/commit/f6c82fc0e532793b7b179413266989554827bbd8) added support for labels

[ce485e2](https://gitlab.com/circuitscript/circuitscript-ts/commit/ce485e202637ccebd3a9f3e791d65d575bfc6859) backup config for jest and typescript compile

[6595698](https://gitlab.com/circuitscript/circuitscript-ts/commit/6595698fd60f2fee26e82a86d591b41cdfe96c04) fixed test for CI

[0a8eda0](https://gitlab.com/circuitscript/circuitscript-ts/commit/0a8eda0fbbbe928740be4d02846ff8b501422073) moved annotations into visitor from layout2

[3e5d57e](https://gitlab.com/circuitscript/circuitscript-ts/commit/3e5d57e2b0f903c62c1b754ef5af111a7f9f1a54) changed render position to be relative instead of absolute

[a314e4f](https://gitlab.com/circuitscript/circuitscript-ts/commit/a314e4f69da1859d60f1fe84e1690ebbcc38b694) cleaned up symbol label

[264f2c7](https://gitlab.com/circuitscript/circuitscript-ts/commit/264f2c73d7bbf8751062e5a1ea04741fca0f64d1) added grid
-  minor cleanups

[47c816c](https://gitlab.com/circuitscript/circuitscript-ts/commit/47c816cba6a93261281124217ba5c719ee52d6f1) reduce calls to symbol redrawing
-  added cache for measure text to speed up layout

[18b8059](https://gitlab.com/circuitscript/circuitscript-ts/commit/18b805941e1612a1176ceb7a74cc063e2b3cc6a5) added export for kicad
-  added base name for nets

[d87536f](https://gitlab.com/circuitscript/circuitscript-ts/commit/d87536f1750c31447730c3a4178a79c348272008) changed name and namespace for initial context
-  update tests

[a33e557](https://gitlab.com/circuitscript/circuitscript-ts/commit/a33e5575490452745ee37c712e50ecb90ea72b8f) renamed subgraph frames to element frames
-  rename frame properties to parameters
-  add text object if frame has title

[a7f6cb0](https://gitlab.com/circuitscript/circuitscript-ts/commit/a7f6cb00efa811e88efdaeba26f1a002539a94d2) fixed bug in calculating label bounds

[600e422](https://gitlab.com/circuitscript/circuitscript-ts/commit/600e422c83752516d7a538eaff637f746c0b5f01) fixed bug where equal reversed segments are not matched
-  updated tests

[d4f9825](https://gitlab.com/circuitscript/circuitscript-ts/commit/d4f9825e805e99c973d9736ebee66e5df2d11dac) minor cleanup and logging

[bfcd75f](https://gitlab.com/circuitscript/circuitscript-ts/commit/bfcd75fc74dab4722e1cb21e3df9bae32db02bf3) any reference to net components will link to a "copy" of it

[200a93e](https://gitlab.com/circuitscript/circuitscript-ts/commit/200a93e1abd460245d45122b6e7fd5b39d79847b) added type to components
-  added basic annotation to components
-  updated symbols to have refdes

[0f7a23d](https://gitlab.com/circuitscript/circuitscript-ts/commit/0f7a23daae9aff62f5e42b57d1819d91a8a37643) changed power function to supply
-  updated tests
-  backup

[9c58724](https://gitlab.com/circuitscript/circuitscript-ts/commit/9c587248d1e26d4fbbd9f848ed1111a7f66cd7ab) added proper bold font support

[2d79889](https://gitlab.com/circuitscript/circuitscript-ts/commit/2d79889fdd8b9ae3b2900f9ef838f19bae072403) backup example

[965db6f](https://gitlab.com/circuitscript/circuitscript-ts/commit/965db6fea58b8e7e956f381d3f170c55a4f85b97) added label text for power symbols

[76af079](https://gitlab.com/circuitscript/circuitscript-ts/commit/76af0793f2a40f1823ef3a24c6e32e011cd80934) example with import

[faac62a](https://gitlab.com/circuitscript/circuitscript-ts/commit/faac62af206ab6574dfb78b98d1d645f3c4ccf43) cleanups

[d80efe8](https://gitlab.com/circuitscript/circuitscript-ts/commit/d80efe8f1b18a77c260917fe01159e668f60e564) assign port/pin position when component is created
-  added step to swap direction of arrows
-  rounded precision of text measurements

[0499bc7](https://gitlab.com/circuitscript/circuitscript-ts/commit/0499bc76d68930184de7045be23dede84e033acd) updated handling of atom trailers and assignment
-  create method to generate import handlers

[3ea389f](https://gitlab.com/circuitscript/circuitscript-ts/commit/3ea389f476f57b1fd74c1d29b70a0b36382e4bd1) updated net objects to include namespace
-  added namespace to execution context

[2cbab6d](https://gitlab.com/circuitscript/circuitscript-ts/commit/2cbab6df3c038be979c62b3eb5c3e6778486de79) minor refactor to fix bug in origin node groups

[c28f555](https://gitlab.com/circuitscript/circuitscript-ts/commit/c28f555ff773b94f62832c3046f20cddf7ea6782) fixed branching bug for sequences
-  updated layout direction pre-process for ELK

[0b1a6d9](https://gitlab.com/circuitscript/circuitscript-ts/commit/0b1a6d90183416390f8b11f0a7cd0f71ee7ecbc4) updated at command to clone net components and use as current component
-  added tests

[3c1c279](https://gitlab.com/circuitscript/circuitscript-ts/commit/3c1c27970046779cd02872c35d85f711d46f8a06) cleaned up test

[904ad04](https://gitlab.com/circuitscript/circuitscript-ts/commit/904ad04ea8f291b5b8ca2c74aac93c48aec8fce7) added angle for pins
-  added minor documentation

[1f821ee](https://gitlab.com/circuitscript/circuitscript-ts/commit/1f821ee59b7dc3ed33e780761a9251c20f559d15) updated tests

[3a38e93](https://gitlab.com/circuitscript/circuitscript-ts/commit/3a38e93a0787e2a50332e5e6d852bf5771d2318e) added style to component
-  updated visitor to handle style
-  updated resistor symbol to handle angle rotation

[12c82cf](https://gitlab.com/circuitscript/circuitscript-ts/commit/12c82cfdbcb850350b3193c695c21983308489e9) improved frame layout with padding

[d3829a1](https://gitlab.com/circuitscript/circuitscript-ts/commit/d3829a12a662b6a53722bfbc5e87d4f347c2cd9f) added integration with commander and figlet

[2ef847e](https://gitlab.com/circuitscript/circuitscript-ts/commit/2ef847e1a90ddeef56cb51b24bc6e253bef44c5d) cleaned up how pins are specified

[f2b8ebd](https://gitlab.com/circuitscript/circuitscript-ts/commit/f2b8ebd62d5679dc2b6e80eacc922f00f7081243) clean up setting of render frame parameters
-  added special handling for title frames

[d6a7d5b](https://gitlab.com/circuitscript/circuitscript-ts/commit/d6a7d5be2ee66343652b416adefacc69269e1612) split between handling of polygons and multilines

[a26fab9](https://gitlab.com/circuitscript/circuitscript-ts/commit/a26fab97685ed1c7c779c2ca5cee25ba15b5c558) updated program options

[a01287a](https://gitlab.com/circuitscript/circuitscript-ts/commit/a01287a791b71f8a49939e666c51893c733eeb02) missed out

[6fe9c5e](https://gitlab.com/circuitscript/circuitscript-ts/commit/6fe9c5e6d6217bae2d0105193689cb4a16c2fc72) added test

[1b6d23b](https://gitlab.com/circuitscript/circuitscript-ts/commit/1b6d23bfe4a4431cbe122e9e1263be7f75c91279) helpers for auto refresh

[5494db7](https://gitlab.com/circuitscript/circuitscript-ts/commit/5494db7f0b0a031b97154e2b2525dab38fb97865) typing fixes

[8523945](https://gitlab.com/circuitscript/circuitscript-ts/commit/85239450d31ccb0c7b169be0c891d41f07699f50) adjust canvas size
-  cleanups

[5593179](https://gitlab.com/circuitscript/circuitscript-ts/commit/55931793ddf0ff957cc8c6b23983d175ca2a95f0) removed component and changed all to use class component

[2d59abf](https://gitlab.com/circuitscript/circuitscript-ts/commit/2d59abfdf635c4ae7f849aee5aa90d9a83926091) added support for specifying blanks in arrange prop
-  added support for width prop in custom components
-  fixed bug in getting wire bounds

[a820a56](https://gitlab.com/circuitscript/circuitscript-ts/commit/a820a56788c9e9053721a9bdb1548dfdca584b10) added basic support for drawing arcs
-  updated lib to draw arcs for inductors

[c8977cd](https://gitlab.com/circuitscript/circuitscript-ts/commit/c8977cd8114899d58cb2180cb7bb519664b7c79b) updated tests

[0075a15](https://gitlab.com/circuitscript/circuitscript-ts/commit/0075a159a0b24559ea67d19239b68dbefeaf8b86) minor refactor

[c90dbbd](https://gitlab.com/circuitscript/circuitscript-ts/commit/c90dbbdfd27b66f1abbe010831cd50920ff0a86a) added option to generate kicad output
-  moved server utils script into src
-  updated test output

[7ad4b78](https://gitlab.com/circuitscript/circuitscript-ts/commit/7ad4b78fab55ffd2cf7b1850d0b3ffc0b61e8a26) minor cleanups
-  link nets

[671680e](https://gitlab.com/circuitscript/circuitscript-ts/commit/671680efc890ba6c7cabfba777862d227013bd26) fixed bug in merging scope
-  clean up types

[5757081](https://gitlab.com/circuitscript/circuitscript-ts/commit/5757081fb0fe7a7cfa5fc926b4e9ef6b9b589dce) added test for component annotation

[2031533](https://gitlab.com/circuitscript/circuitscript-ts/commit/2031533c37f7229d3152c15b25daaaf730622ea5) backup

[29f2f91](https://gitlab.com/circuitscript/circuitscript-ts/commit/29f2f91f13678bf185d2b8f6d5ed90cd61c3f15c) added auto_ mode for anti-clockwise wire drawing to target
-  changed auto mode to plot either an L or inverted L

[480b0e3](https://gitlab.com/circuitscript/circuitscript-ts/commit/480b0e3ad9322a5b2bc74692297e17149961f505) updated layout of subgraphs

[fcb8573](https://gitlab.com/circuitscript/circuitscript-ts/commit/fcb8573894bcd2c2f6b87c4ca4dccaf304bbc01e) added wire jump sequence action

[0a39922](https://gitlab.com/circuitscript/circuitscript-ts/commit/0a3992249d3f2a7db5f8e4feafe0871f86f7d4f6) updated visitor to include at blocks

[c9cb52c](https://gitlab.com/circuitscript/circuitscript-ts/commit/c9cb52c34ef4e47c18a3de6bcef5d90428d43e5d) fix wrong map usage
-  added dump methods

[be0924a](https://gitlab.com/circuitscript/circuitscript-ts/commit/be0924a498e3ac7eb100b7e61d716b39e7e89dc6) added namespace check to match local names to global/upper cscopes

[e91ac89](https://gitlab.com/circuitscript/circuitscript-ts/commit/e91ac8910d2455df2b85b48e7771c259e7015ef6) swapped pin start and end points
-  updated common lib

[dde5544](https://gitlab.com/circuitscript/circuitscript-ts/commit/dde55448c37c555ae39689481c9300607d2c44b4) added simple math tests

[27c3f77](https://gitlab.com/circuitscript/circuitscript-ts/commit/27c3f775d2e24bfb78837ddc0f31e226a1476533) add handling for 'place' property
-  add rendering of 'x' for not placed component
-  added print function

[d3002f9](https://gitlab.com/circuitscript/circuitscript-ts/commit/d3002f93c97e8c85addcace80b33838ca6a153b8) changed type from junction to point
-  minor cleanups on strings

[3400e82](https://gitlab.com/circuitscript/circuitscript-ts/commit/3400e825ccb03743088de377fd6e4e4a7e07377d) added test for component in function param

[dcde148](https://gitlab.com/circuitscript/circuitscript-ts/commit/dcde148f288d31a5cce1477ef2af11f1f4e57475) minor cleanups, version bump

[4d2bd06](https://gitlab.com/circuitscript/circuitscript-ts/commit/4d2bd068841574d0891baeba2f4cb02372ee8c1e) added test for instance param assignment

[ecf8a7b](https://gitlab.com/circuitscript/circuitscript-ts/commit/ecf8a7b1d970789b0b549c94fe0daa29571d5c2a) fixed ts-jest config
-  backup packages

[e99a5c1](https://gitlab.com/circuitscript/circuitscript-ts/commit/e99a5c162c382955d511d21b440b8832a183efed) backup examples

[e672a70](https://gitlab.com/circuitscript/circuitscript-ts/commit/e672a703a1d1ba02acb7ae9a300c851d9a4eb02a) added test for specified refdes

[8a18d9c](https://gitlab.com/circuitscript/circuitscript-ts/commit/8a18d9cfa0a5f3c1ee896aae29eaea51d445c876) added symbols for diode and LED

[087c89b](https://gitlab.com/circuitscript/circuitscript-ts/commit/087c89b9dd904a107daa51f471875e207f12415f) fix bug for auto wires
-  added debug rects

[8f43ef5](https://gitlab.com/circuitscript/circuitscript-ts/commit/8f43ef5a6d18aa9f155f412b2dbe2fac13d905ae) update antlr file for updated denter helper

[bc7955d](https://gitlab.com/circuitscript/circuitscript-ts/commit/bc7955dcff078cd7e5e22fc93f96e3bc9b228815) use refdes for annotation if set

[e234152](https://gitlab.com/circuitscript/circuitscript-ts/commit/e2341527c9115de97ee6b7de531e4e0dcf2a22eb) use manual equality instead of lodash, much faster performance

[e412dad](https://gitlab.com/circuitscript/circuitscript-ts/commit/e412dadc81d8af12ea1c394d349e52801b596f06) updated to component command to be similar to at command
-  fixed tests

[71c7a20](https://gitlab.com/circuitscript/circuitscript-ts/commit/71c7a2045606c9762daf9c25129c52f2540ec3bb) added integration with logger

[c075fc3](https://gitlab.com/circuitscript/circuitscript-ts/commit/c075fc3b65ea434a4840a0edd6cbb25c11fbfc5e) minor cleanup to fix tests

[fd1fdc0](https://gitlab.com/circuitscript/circuitscript-ts/commit/fd1fdc0892cd89f76105c2b8fc705895160681d7) fixed missing net resolver in base executor context
-  added test

[40d06c5](https://gitlab.com/circuitscript/circuitscript-ts/commit/40d06c51e4b35bb23df7645939d41a7e7c4835c1) added error parsing

[91a72eb](https://gitlab.com/circuitscript/circuitscript-ts/commit/91a72ebb23f96db5c4cee4f7039dcab2e06f9bdb) fixed bug when symbol custom angle is not applied
-  added text handling for 180 deg rotation

[3791d04](https://gitlab.com/circuitscript/circuitscript-ts/commit/3791d04b3894bcf40e8b23c087927ef9ca5c5571) update tests

[5357e8b](https://gitlab.com/circuitscript/circuitscript-ts/commit/5357e8b3903fbd04532ca04dc2975484ab837429) added test for render

[c6cf328](https://gitlab.com/circuitscript/circuitscript-ts/commit/c6cf328c06d513daa9f27de23e039c1b83714ca8) updated example with latest grammar

[bc1ae04](https://gitlab.com/circuitscript/circuitscript-ts/commit/bc1ae04fec776d861b72adeef0cb039fc60ef5d9) improve error handling

[280f858](https://gitlab.com/circuitscript/circuitscript-ts/commit/280f858a09776273f8547828690ac8828adb1a18) added method to remove net
-  remove child scope gnd after merging gnds
-  added error message for wire if no value is provided for direction

[bfb2f47](https://gitlab.com/circuitscript/circuitscript-ts/commit/bfb2f47d7a34b94156bc5b165c616905ac03f5a3) fixed bug in inner frame positioning

[9c4d9a3](https://gitlab.com/circuitscript/circuitscript-ts/commit/9c4d9a34a0316fee761ee113a98633a83146ad03) remove redundant code

[5199beb](https://gitlab.com/circuitscript/circuitscript-ts/commit/5199beb5ba0a047ba5ad5e484307b1a85c7a749c) added resolve net function to find global/upper level nets

[3eef7d5](https://gitlab.com/circuitscript/circuitscript-ts/commit/3eef7d5fc7a0ff43828980fe1e165a3f6560bad5) handle parsing of blank

[a17c18d](https://gitlab.com/circuitscript/circuitscript-ts/commit/a17c18db392abbb4dff5baf1bc9a19636324f6b3) added clone method

[db07b60](https://gitlab.com/circuitscript/circuitscript-ts/commit/db07b60ee4d95389a1b709f2bc25209cfb458ac1) updated tests for double dot param

[caa500c](https://gitlab.com/circuitscript/circuitscript-ts/commit/caa500c4aba8eb7492377c4b3657bdced183e6ed) backup example

[e3055b6](https://gitlab.com/circuitscript/circuitscript-ts/commit/e3055b66b882d472d9ee620118481861cfba5338) moved out file writing from render2
-  remove use of Inter font for now

[1d200de](https://gitlab.com/circuitscript/circuitscript-ts/commit/1d200dea0a38bed4a24158216b1f7587cb171155) initial strategy handling component placed at multiple points
-  minor update to main cli program

[a59e337](https://gitlab.com/circuitscript/circuitscript-ts/commit/a59e337f2e19b130071c1d515667f71dcb25c180) added simple stop watch

[8831e91](https://gitlab.com/circuitscript/circuitscript-ts/commit/8831e917f372c96bcac82e31d3d9761be90eca9a) parse pin type, pin names and alt pin names

[7a06e9e](https://gitlab.com/circuitscript/circuitscript-ts/commit/7a06e9e37fab2d9482a9f97936b65a0aea65e1d6) missed out

[517461a](https://gitlab.com/circuitscript/circuitscript-ts/commit/517461a0d44ff62de590e470c6d3791e9847800f) type fixes

[7113f3c](https://gitlab.com/circuitscript/circuitscript-ts/commit/7113f3c587aa99a99be46f41a84915904362bbcd) updated lib to include drawing commands

[5dfa691](https://gitlab.com/circuitscript/circuitscript-ts/commit/5dfa6916effc3f211a7ff375c368509168664fff) updated method to collect subgraph frames

[12093c1](https://gitlab.com/circuitscript/circuitscript-ts/commit/12093c1f7977163a7bf990dfb321ab181fb3b183) fixed bug in merging child scope root in sequence actions

[8fd708c](https://gitlab.com/circuitscript/circuitscript-ts/commit/8fd708c605df6550d5b885d8df3d09f6ab21ffd9) added test for drawing functions

[f021939](https://gitlab.com/circuitscript/circuitscript-ts/commit/f021939278556dc57fc2b33b8dacbf43c0b53497) updated example

[f16b102](https://gitlab.com/circuitscript/circuitscript-ts/commit/f16b102ec8ba29c7a6ce4fc477db289400fc01d7) added test for double dot syntax

[2bc1014](https://gitlab.com/circuitscript/circuitscript-ts/commit/2bc10148854b34e5a189f7ed8436905f2a6d6579) minor cleanups

[bd2280b](https://gitlab.com/circuitscript/circuitscript-ts/commit/bd2280bb74bf3689f6a52d9d16e2b1ff0994ffea) backup common lib

[ceadee4](https://gitlab.com/circuitscript/circuitscript-ts/commit/ceadee4feb41448529f1aa493367cbaead713596) added test for indent

[4f5a744](https://gitlab.com/circuitscript/circuitscript-ts/commit/4f5a744030f17d3f2b911d7a6426537df1b40f02) backup

[254aaba](https://gitlab.com/circuitscript/circuitscript-ts/commit/254aaba6ac48ace80a901a848ef3e26df44e7b8d) updated tests

[7dcfac4](https://gitlab.com/circuitscript/circuitscript-ts/commit/7dcfac4fa8fd37be239e5f59014680b26306273a) updated base lib

[eff37d5](https://gitlab.com/circuitscript/circuitscript-ts/commit/eff37d57f64a313061d05027161eae8929fcc3d8) updated tests

[8dc3c56](https://gitlab.com/circuitscript/circuitscript-ts/commit/8dc3c569d40e6dbc7877bcc18cb67fadc8bb38d0) separate time measurement for lexer and parser

[2c595b3](https://gitlab.com/circuitscript/circuitscript-ts/commit/2c595b36ef60419cfee1406ae2bf1b77f664a3cc) added back intersection count parsing to geometry

[3c0c151](https://gitlab.com/circuitscript/circuitscript-ts/commit/3c0c15158c3074b9e9b1aff6a5fb1b1eb3094a2f) add nets when component is a function param

[7220e58](https://gitlab.com/circuitscript/circuitscript-ts/commit/7220e589d4b1a8f730255758dd42ae8a7535cf55) added script to regenerate test data

[9a14073](https://gitlab.com/circuitscript/circuitscript-ts/commit/9a140734216e942ac5759da2dafb5037703e8b6a) added new components to common lib

[27cdba2](https://gitlab.com/circuitscript/circuitscript-ts/commit/27cdba20808af90219dc9cd89770080f1a1eb39d) backup

[eb6aaa5](https://gitlab.com/circuitscript/circuitscript-ts/commit/eb6aaa5d62376de1e58a77dc02babd69dcb8dd8d) updated components to have type prop

[1d8b831](https://gitlab.com/circuitscript/circuitscript-ts/commit/1d8b831db861329262400dc8d7d0891ae5fcbd74) removed unused

[13b9ef8](https://gitlab.com/circuitscript/circuitscript-ts/commit/13b9ef8d3bc918a867a31579acc57cc6f51c0ad2) updated tests

[b9fe718](https://gitlab.com/circuitscript/circuitscript-ts/commit/b9fe7187496c66889fe5ca5a72153568ea375162) fixed bug in merging of gnd in child scope and parent scope
-  fixed bug when finding functions in upper context

[8edb3fa](https://gitlab.com/circuitscript/circuitscript-ts/commit/8edb3fa0c35fba6c0346050f8c59efd79fe95ea5) cleanup

[b92c67f](https://gitlab.com/circuitscript/circuitscript-ts/commit/b92c67fe5653110d7b6aa00cafbe9c67acc9bcc1) added license

[ed6b92d](https://gitlab.com/circuitscript/circuitscript-ts/commit/ed6b92d1b28c820983ace782f404095b7a0692bd) add

[40b02b9](https://gitlab.com/circuitscript/circuitscript-ts/commit/40b02b94f294c9b02ff710a20f6d1583f2eb3963) place component even if subgraph only has a single node

[78e85fe](https://gitlab.com/circuitscript/circuitscript-ts/commit/78e85fec7c1bb03dbc9fefd9e6a0f75dddb71173) backup

[e78a8e9](https://gitlab.com/circuitscript/circuitscript-ts/commit/e78a8e99a02fbb51aa92f4e548499565cef9e068) removed elkjs

[3d51dce](https://gitlab.com/circuitscript/circuitscript-ts/commit/3d51dce86096489cabed832a9a9e5c0722bbece0) changed background to dotted grid

[ee9c5b8](https://gitlab.com/circuitscript/circuitscript-ts/commit/ee9c5b81a6c2debe7cde1b7bbc942745d4f40f64) backup

[97b68a6](https://gitlab.com/circuitscript/circuitscript-ts/commit/97b68a61aab99d08beb092b5bdc7a0326c378c64) removed old addPin method
-  renamed addPin2 to addPin
-  fixed bug in custom symbol pin direction

[b9e1b1b](https://gitlab.com/circuitscript/circuitscript-ts/commit/b9e1b1b1639cd70c70ce5979b27951ad33144fcb) backup examples

[1b14151](https://gitlab.com/circuitscript/circuitscript-ts/commit/1b14151fd79793929e9d97d95a310937420fd7af) added blank junction symbol

[497de0e](https://gitlab.com/circuitscript/circuitscript-ts/commit/497de0e6fd5a6cf0f919460ccce8c7aca90594e2) changed net name used for kicad output

[1b3116e](https://gitlab.com/circuitscript/circuitscript-ts/commit/1b3116e79ab9529487400850cbe9080120786864) allow frames in functions

[0a92cc8](https://gitlab.com/circuitscript/circuitscript-ts/commit/0a92cc85daa28d3f3fe2b45d8a94864c2f71adba) added pin id to render

[26f205b](https://gitlab.com/circuitscript/circuitscript-ts/commit/26f205b8ca2286aa303207cbe0329e900c7e81e3) added enum for sequence actions

[a2bdc35](https://gitlab.com/circuitscript/circuitscript-ts/commit/a2bdc35a346b3ac0aecc658a3ec7178500a450e4) added layout warnings
-  added scale for render

[f1df503](https://gitlab.com/circuitscript/circuitscript-ts/commit/f1df5030c733815477068dee650899df526b409d) renamed file

[e719a09](https://gitlab.com/circuitscript/circuitscript-ts/commit/e719a09c39867e0f312eaee5791fc07380a1e1b1) backup packages

[adbfe5a](https://gitlab.com/circuitscript/circuitscript-ts/commit/adbfe5ab89d89e07bf7beca95457827139d18582) backup packages
-  added source maps for typescript

[16d2c7d](https://gitlab.com/circuitscript/circuitscript-ts/commit/16d2c7d5f60bbd56c6da1c51dc01e2c589533611) backup

[c203c24](https://gitlab.com/circuitscript/circuitscript-ts/commit/c203c243b28102d47da2fa4176306a071a2d735d) added power function

[e0d8b23](https://gitlab.com/circuitscript/circuitscript-ts/commit/e0d8b2340dea21d12b86781ec459adbab618be38) fixed bug if no net is defined yet for current component and pin

[8a7dfc3](https://gitlab.com/circuitscript/circuitscript-ts/commit/8a7dfc37c91955bf03604b67923035c6e8f650d7) added condition for creating new symbols
-  removed log messages

[660cb7d](https://gitlab.com/circuitscript/circuitscript-ts/commit/660cb7de9114b59ec94385d3e9e1bf864188f27c) update callback for denter helper

[050658d](https://gitlab.com/circuitscript/circuitscript-ts/commit/050658db099ee0205054946808032b083444b39a) update test data

[b4a3fa7](https://gitlab.com/circuitscript/circuitscript-ts/commit/b4a3fa753c1330bb3ce7aa416921ebb5f1ab851a) update test

[038f85b](https://gitlab.com/circuitscript/circuitscript-ts/commit/038f85b057f14bc3dd2d62420a6e3a80cb09ccc6) updated tests for dotted grid

[40ecd99](https://gitlab.com/circuitscript/circuitscript-ts/commit/40ecd997e6731c6ebdbadcc9d58fff2cf1f76af3) added math test

[9ed4f49](https://gitlab.com/circuitscript/circuitscript-ts/commit/9ed4f4980795f8fb06ac5f67f6bf9876388785d0) revert back to old version to fix bug

[f2e648f](https://gitlab.com/circuitscript/circuitscript-ts/commit/f2e648fcabe9dc6fb4b6045203b281b9ecefa159) ignore wire points that are empty

[13c4599](https://gitlab.com/circuitscript/circuitscript-ts/commit/13c4599edede6f1ba0846cc69ca4ec8219027aba) clear typescript errors

[b5d6f25](https://gitlab.com/circuitscript/circuitscript-ts/commit/b5d6f2500066d6c23d32f52257015b95f474ea8e) added test for frame

[542e0e9](https://gitlab.com/circuitscript/circuitscript-ts/commit/542e0e95478122715595c1e71c2f8623c0ee7b0a) added body color for symbol custom
-  minor update to label position for cap

[ab6da08](https://gitlab.com/circuitscript/circuitscript-ts/commit/ab6da082ad45e5a3131924d905f4c3be7152fd4d) updated test data

[a16dd77](https://gitlab.com/circuitscript/circuitscript-ts/commit/a16dd77a68cbddb35ddee7406313b1c7b71b3aef) added gap parameter to frame

[4fc52e9](https://gitlab.com/circuitscript/circuitscript-ts/commit/4fc52e9bf2ff776fbfdf12f4ac92964653161bb9) updated res symbol to fit grid

[f16c158](https://gitlab.com/circuitscript/circuitscript-ts/commit/f16c158d81477e80056811836c453bebaa4cc07e) backup

[614be7f](https://gitlab.com/circuitscript/circuitscript-ts/commit/614be7f6b6147c0f8bf3e75c2aa4c2210e7f0100) minor cleanups

[941980e](https://gitlab.com/circuitscript/circuitscript-ts/commit/941980e449ae24aa9af471249199ab4bc4efd738) added check if component not found

[0ad88b7](https://gitlab.com/circuitscript/circuitscript-ts/commit/0ad88b7ad84220dd5e00dbf172f8d9b2fbf05df7) updated common library to set labels as nets

[d7ae622](https://gitlab.com/circuitscript/circuitscript-ts/commit/d7ae622ae0941947e9e3c571e2071454093160d8) changed angle from style to a double dot param

[bb245e0](https://gitlab.com/circuitscript/circuitscript-ts/commit/bb245e087f4cbb36d1cee552df799967ad11cf65) fixed slow lexing

[d4b598a](https://gitlab.com/circuitscript/circuitscript-ts/commit/d4b598a0030efb1ba9199128f898e319a3767ce6) backup

[cd5cac5](https://gitlab.com/circuitscript/circuitscript-ts/commit/cd5cac57802c0b45f4d6f041bf974cde123d19ab)  updated gitignore

[8df17cd](https://gitlab.com/circuitscript/circuitscript-ts/commit/8df17cd6193e9dfaef1bc2b1aab6119ec03ad750) backup

[1cb94a3](https://gitlab.com/circuitscript/circuitscript-ts/commit/1cb94a3252ad2a38a3d1a9fec5e68d9856028aa2) missed out

[013ae07](https://gitlab.com/circuitscript/circuitscript-ts/commit/013ae07869dbab52618ad7a84806b243784c98ea) missed out

[84dab9e](https://gitlab.com/circuitscript/circuitscript-ts/commit/84dab9e2ca29ce1b781c090eb6b85626fa53c891) backup font and sizing script

[07c9f51](https://gitlab.com/circuitscript/circuitscript-ts/commit/07c9f51a33a074826d5f07a0db7b98cadd88f0ba) added warning for floating ndoe

[9bd2fc5](https://gitlab.com/circuitscript/circuitscript-ts/commit/9bd2fc533271841120ff10ba4dd7d5ab7630e7c1) added command

[e210546](https://gitlab.com/circuitscript/circuitscript-ts/commit/e2105462efe5c104adab20fbde57c40b58058cca) missed out

[8a204b8](https://gitlab.com/circuitscript/circuitscript-ts/commit/8a204b8e03a902b77679a91c101be2fd267266f5) minor update to test to silence console logs

[c3a4779](https://gitlab.com/circuitscript/circuitscript-ts/commit/c3a4779c64416399eea0168b53816a6d234aa0a7) renamed files

[82c3faf](https://gitlab.com/circuitscript/circuitscript-ts/commit/82c3faf7d470e3c9b05111dcfa1e4e0a4827bb74) missed out

[e149f5d](https://gitlab.com/circuitscript/circuitscript-ts/commit/e149f5d6c60f542986f2ced6123b555f9ab01643) renamed

[9a2da98](https://gitlab.com/circuitscript/circuitscript-ts/commit/9a2da985788e82c84648e8c4703c8fc55c9a4429) backup font

[e0620b5](https://gitlab.com/circuitscript/circuitscript-ts/commit/e0620b559f441192390ebd9e6241e68ed11316c8) add fonts
