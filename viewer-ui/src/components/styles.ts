/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// CSS ported verbatim from the extension's webview-shell.html (formerly
// preview.html) <style> block, rendered by PreviewApp via a <style> tag so
// the extension's pixel-level appearance doesn't change.
export const previewStyles = `
:root {
	--cs-toolbar-bg: #f0f0f0;
	--cs-border: #ccc;
	--cs-surface: #ffffff;
	--cs-surface-hover: #e0e0e0;
	--cs-text-muted: #666666;
	--cs-text-faint: #eeeeee;
	--cs-canvas-bg: #fafafa;
	--cs-panel-shadow: rgba(0, 0, 0, 0.2);
	--cs-error: red;
	--cs-error-bg: rgba(255, 255, 255, 0.9);
	--cs-accent: #4caf50;
	--cs-highlight-selected: #ff5722;
	--cs-highlight-hover: #2196f3;
	--cs-dropdown-shadow: rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] {
	--cs-toolbar-bg: #2d2d30;
	--cs-border: #3e3e42;
	--cs-surface: #1e1e1e;
	--cs-surface-hover: #3e3e42;
	--cs-text-muted: #a0a0a0;
	--cs-text-faint: #333333;
	--cs-canvas-bg: #1a1a1a;
	--cs-panel-shadow: rgba(0, 0, 0, 0.5);
	--cs-error: #e06c5b;
	--cs-error-bg: rgba(30, 30, 30, 0.9);
	--cs-accent: #4caf50;
	--cs-highlight-selected: #ff7043;
	--cs-highlight-hover: #42a5f5;
	--cs-dropdown-shadow: rgba(0, 0, 0, 0.5);
}

html {
	height: 100%;
}

body {
	height: 100%;
	margin: 0;
	padding: 0;
	font-family: sans-serif;
	display: flex;
	flex-direction: column;
}

/* React mounts into #root, so it (not #toolbar/#svg-view-area directly) is
   body's flex child - without this, #svg-view-area's flex:1 has no effect
   since its parent (#root) isn't a flex container, and it collapses to 0
   height. */
#root {
	height: 100%;
	display: flex;
	flex-direction: column;
}

#toolbar {
	background: var(--cs-toolbar-bg);
	padding: 8px;
	border-bottom: 1px solid var(--cs-border);
	display: flex;
	gap: 4px;
	align-items: center;
}

.toolbar-btn {
	background: var(--cs-surface);
	border: 1px solid var(--cs-border);
	padding: 4px 8px;
	cursor: pointer;
	border-radius: 3px;
	font-size: 14px;
	min-width: 30px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	line-height: 1;
}

.toolbar-btn:hover:not(:disabled) {
	background: var(--cs-surface-hover);
}

.toolbar-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

#file-path {
	margin-left: auto;
	font-size: 11px;
	color: var(--cs-text-muted);
	font-family: monospace;
	max-width: 400px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-toggle {
	background: var(--cs-surface);
	border: 1px solid var(--cs-border);
	padding: 4px 8px;
	cursor: pointer;
	border-radius: 3px;
	font-size: 14px;
	display: flex;
	align-items: center;
	gap: 4px;
}

.dropdown-toggle:hover:not(:disabled) {
	background: var(--cs-surface-hover);
}

.dropdown-toggle:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.dropdown-toggle::after {
	content: '\\25be';
	font-size: 10px;
}

.dropdown-menu {
	display: none;
	position: absolute;
	top: 100%;
	left: 0;
	background: var(--cs-surface);
	border: 1px solid var(--cs-border);
	border-radius: 3px;
	box-shadow: 0 2px 6px var(--cs-dropdown-shadow);
	z-index: 100;
	min-width: 160px;
	margin-top: 2px;
}

.dropdown-menu.open {
	display: block;
}

.dropdown-item {
	display: block;
	width: 100%;
	padding: 6px 12px;
	font-size: 13px;
	background: none;
	border: none;
	text-align: left;
	cursor: pointer;
	white-space: nowrap;
	box-sizing: border-box;
}

.dropdown-item:hover:not(:disabled) {
	background: var(--cs-surface-hover);
}

.dropdown-item:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

@media (max-width: 768px) {
	#toolbar {
		padding: 6px;
		gap: 4px;
		flex-wrap: wrap;
	}

    .toolbar-btn {
        padding: 4px 6px;
    }

	.dropdown-toggle {
        padding: 4px 6px;
		font-size: 13px;
	}

	#file-path {
        padding-top: 2px;
		margin-left: 0;
		flex-basis: 100%;
		max-width: 100%;
	}
}

#svg-view-area {
	position: relative;
	flex: 1;
	width: 100%;
	overflow: hidden;
	min-height: 0;
}

#error-output {
	display: none;
	color: var(--cs-error);
	padding: 8px;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	z-index: 20;
	background: var(--cs-error-bg);
	border-bottom: solid thin var(--cs-error);
}

#cs-viewport {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	background: var(--cs-canvas-bg);
	cursor: grab;
}
/* The rendered schematic SVG (injected into #cs-pan-zoom below) carries its
   own default wire/pin/text/frame colors as --cs-wire-color etc., declared in
   the SVG's embedded <style> tag on :root - which, since the SVG is inlined
   directly into this host document rather than an iframe/shadow root,
   resolves to <html>, not the SVG root. That declaration only follows the OS
   prefers-color-scheme, not this app's manual theme toggle. Re-declaring the
   same variable names here, closer to the SVG content than <html>, wins by
   inheritance proximity and makes the schematic's own colors follow the
   toggle too. Values mirror circuitscript-ts's DarkColorScheme (globals.ts). */
[data-theme="dark"] #cs-viewport {
	--cs-wire-color: rgb(0, 200, 0);
	--cs-bus-wire-color: rgb(110, 110, 255);
	--cs-junction-color: rgb(0, 200, 0);
	--cs-bus-junction-color: rgb(110, 110, 255);
	--cs-line-color: #ccc;
	--cs-text-color: #ccc;
	--cs-grid-color: #888;
	--cs-frame-border-color: #444;
	--cs-body-color: rgb(0, 0, 0);
}
#cs-viewport.cs-dragging {
	cursor: grabbing;
}
#cs-pan-zoom {
	transform-origin: 0 0;
	width: 0;
	height: 0;
}
#cs-pan-zoom svg {
	overflow: visible;
	display: block;
}
.cs-component {
	cursor: pointer;
}
.cs-frame-title {
	cursor: pointer;
}
#cs-panel {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 300px;
	min-width: 220px;
	background: var(--cs-surface);
	box-shadow: -2px 0 8px var(--cs-panel-shadow);
	transform: translateX(0);
	transition: transform 0.2s ease;
	overflow-y: auto;
	box-sizing: border-box;
	padding: 8px;
	z-index: 10;
}
#cs-panel.cs-resizing {
	transition: none;
}
#cs-panel.cs-hidden {
	transform: translateX(100%);
	box-shadow: none;
}
#cs-panel-resize-handle {
	position: absolute;
	top: 0;
	left: -4px;
	bottom: 0;
	width: 8px;
	cursor: ew-resize;
	z-index: 11;
}
#cs-panel-close {
	position: absolute;
	top: 2px;
	right: 2px;
	border: none;
	background: none;
	font-size: 20px;
	cursor: pointer;
	line-height: 1;
	padding: 4px 8px;
}
#cs-panel-content h2 {
	margin: 0 24px 4px 0;
	font-size: 18px;
}
#cs-panel-content h3 {
	margin: 16px 0 4px 0;
	font-size: 13px;
	text-transform: uppercase;
	color: var(--cs-text-muted);
}
.cs-source-line {
	margin: 0 0 8px 0;
	font-size: 12px;
	color: var(--cs-text-muted);
}
#cs-panel-content table {
	width: 100%;
	border-collapse: collapse;
	font-size: 13px;
}
#cs-panel-content th, #cs-panel-content td {
	text-align: left;
	padding: 4px 6px;
	border-bottom: 1px solid var(--cs-text-faint);
	word-break: break-all;
}

#cs-panel-content table.parameters td:nth-child(1) {
	width: 30%;
}
#cs-panel-content .instance-name {
	font-size: 13px;
	margin: 0;
	padding: 0;
	word-break: break-all;
}

#cs-panel-content table tr th:nth-child(1), #cs-panel-content table tr td:nth-child(1){
	padding-left: 0;
    width: 30px;
}

.cs-net-link {
	cursor: pointer;
	text-decoration: underline;
}
.cs-net-link:hover {
	color: var(--cs-accent);
}
.wires-highlight path.cs-net-highlighted {
	stroke: var(--cs-accent) !important;
}
.wires-highlight circle.cs-net-highlighted {
	fill: var(--cs-accent) !important;
}
`;
