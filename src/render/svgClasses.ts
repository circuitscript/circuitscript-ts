/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Element, Svg } from '@svgdotjs/svg.js';
import { ColorScheme, DarkColorScheme, defaultFont, defaultGridSizeUnits, defaultPinIdTextSize,
    defaultPinNameTextSize, defaultSymbolLineWidth, fontDisplayScale } from '../globals.js';
import { milsToMM } from '../helpers.js';
import { numeric } from '../objects/NumericValue.js';
import { Styles } from '../styles.js';

// Matches the Textbox fallback default font size used by the generic label/text
// draw path when no explicit fontSize is set (draw_symbols.ts, numeric(50)).
const defaultLabelTextSize = 50;

export type DefaultStyleClassName = 'wire' | 'busWire' | 'junction'
    | 'busJunction' | 'pin' | 'graphicLine' | 'graphicPolygon'
    | 'pinName' | 'pinId' | 'label' | 'grid' | 'text' | 'frame';

// Marker class added alongside a default-style class whenever an element's
// actual attributes diverge from that class's rule - see applyClassWithOverrides().
export const StyleOverrideClass = 'styleOverride';

/**
 * Resolves the full set of CSS properties each default-style class carries,
 * given the document's styles. Shared by addDefaultStyleClasses() (which emits
 * these as `<style>` rules) and expandStyleOverridesForPdf() (which needs the
 * full property set to fall back on for elements that only override some of
 * a class's properties).
 */
export function getClassDefaults(styles: Styles): Record<DefaultStyleClassName, Record<string, string>> {
    // Grid size/stroke width are fixed constants (not per-document), so the
    // dasharray is always the same - matches drawGrid()'s strokeSize/numericGridSize.
    // Computed lazily (not at module scope) to avoid a circular-import init-order
    // crash when this module loads before NumericValue finishes initializing.
    const gridStrokeWidth = milsToMM(3);
    const gridStrokeDasharray =
        `${gridStrokeWidth.toNumber()}px,${numeric(defaultGridSizeUnits).sub(gridStrokeWidth).toNumber()}px`;

    return {
        wire: {
            'stroke-width': `${milsToMM(styles.wireWidth!).toNumber()}px`,
            'stroke-linecap': 'butt',
            'stroke': styles.wireColor!,
            fill: 'none',
        },
        busWire: {
            'stroke-width': `${milsToMM(styles.busWireWidth!).toNumber()}px`,
            'stroke-linecap': 'butt',
            'stroke': ColorScheme.BusWireColor,
            fill: 'none',
        },
        junction: {
            fill: ColorScheme.JunctionColor,
            stroke: 'none',
        },
        busJunction: {
            fill: ColorScheme.BusJunctionColor,
            stroke: 'none',
        },
        pin: {
            'stroke-width': `${defaultSymbolLineWidth}px`,
            stroke: styles.lineColor!,
            fill: 'none',
        },
        graphicLine: {
            'stroke-width': `${milsToMM(styles.lineWidth!).toNumber()}px`,
            stroke: styles.lineColor!,
            fill: 'none',
        },
        graphicPolygon: {
            fill: ColorScheme.BodyColor,
        },
        pinName: {
            fill: styles.textColor!,
            'font-size': `${defaultPinNameTextSize * fontDisplayScale}px`,
            'font-weight': 'regular',
        },
        pinId: {
            fill: styles.lineColor!,
            'font-size': `${defaultPinIdTextSize * fontDisplayScale}px`,
            'font-weight': 'regular',
        },
        label: {
            fill: styles.textColor!,
            'font-size': `${defaultLabelTextSize * fontDisplayScale}px`,
            'font-weight': 'regular',
        },
        grid: {
            stroke: ColorScheme.GridColor,
            'stroke-width': `${gridStrokeWidth.toNumber()}px`,
            'stroke-dasharray': gridStrokeDasharray,
        },
        // Default text color for any text that isn't a pin name/id or net label
        // (decorative custom-symbol text, refdes, MPN, port labels, etc.) - only
        // fill is governed here, since font-size/weight always vary per instance.
        text: {
            fill: styles.textColor!,
        },
        frame: {
            stroke: ColorScheme.FrameBorderColor,
            fill: 'none',
        },
    };
}

/**
 * A color value produced by a `fill`/`line_color`/`text_color` graphic
 * command: either a plain literal (unchanged legacy behavior), or a
 * light/dark pair - optionally named via `var=`, in which case it compiles
 * to a `var(--cs-<varName>)` reference backed by a registered `:root` custom
 * property instead of an inline `light-dark()` value.
 */
export type ThemedColor = string | { light: string; dark: string; varName?: string };

/**
 * Collects `var=<name>` registrations for a single render pass, keyed by
 * name (without the `--cs-` prefix), so the emitted `:root` block only ever
 * contains vars actually used in that document.
 */
export type CustomColorVarRegistry = Map<string, { light: string; dark: string }>;

// CSS custom property names carrying the themeable colors - one per color
// that varies between light/dark, shared between the :root declarations and
// the class rules that reference them via var().
const ThemeVarNames = {
    wire: '--cs-wire-color',
    busWire: '--cs-bus-wire-color',
    junction: '--cs-junction-color',
    busJunction: '--cs-bus-junction-color',
    lineColor: '--cs-line-color',
    textColor: '--cs-text-color',
    grid: '--cs-grid-color',
    frame: '--cs-frame-border-color',
    bodyColor: '--cs-body-color',
} as const;

/**
 * Builds the `:root` variable declarations (resolved from the document's
 * styles) plus a `prefers-color-scheme: dark` override for whichever
 * variables are still at their ColorScheme default - i.e. not explicitly
 * customized by the document, so a customized color stays fixed in both
 * themes while an unstyled one follows the viewer's theme.
 */
function getThemeVariableCss(styles: Styles): string {
    const light: Record<string, string> = {
        [ThemeVarNames.wire]: styles.wireColor!,
        [ThemeVarNames.busWire]: ColorScheme.BusWireColor,
        [ThemeVarNames.junction]: ColorScheme.JunctionColor,
        [ThemeVarNames.busJunction]: ColorScheme.BusJunctionColor,
        [ThemeVarNames.lineColor]: styles.lineColor!,
        [ThemeVarNames.textColor]: styles.textColor!,
        [ThemeVarNames.grid]: ColorScheme.GridColor,
        [ThemeVarNames.frame]: ColorScheme.FrameBorderColor,
        [ThemeVarNames.bodyColor]: ColorScheme.BodyColor,
    };

    const dark: Record<string, string> = {
        [ThemeVarNames.busWire]: DarkColorScheme.BusWireColor,
        [ThemeVarNames.junction]: DarkColorScheme.JunctionColor,
        [ThemeVarNames.busJunction]: DarkColorScheme.BusJunctionColor,
        [ThemeVarNames.grid]: DarkColorScheme.GridColor,
        [ThemeVarNames.frame]: DarkColorScheme.FrameBorderColor,
        [ThemeVarNames.bodyColor]: DarkColorScheme.BodyColor,
    };
    if (styles.wireColor === ColorScheme.WireColor) {
        dark[ThemeVarNames.wire] = DarkColorScheme.WireColor;
    }
    if (styles.lineColor === ColorScheme.PinLineColor) {
        dark[ThemeVarNames.lineColor] = DarkColorScheme.PinLineColor;
    }
    if (styles.textColor === ColorScheme.PinNameColor) {
        dark[ThemeVarNames.textColor] = DarkColorScheme.PinNameColor;
    }

    const toDecls = (vars: Record<string, string>): string =>
        Object.entries(vars).map(([name, value]) => `${name}:${value};`).join('');

    return `:root{${toDecls(light)}}`
        + `@media (prefers-color-scheme: dark){:root{${toDecls(dark)}}}`;
}

/**
 * Builds the `:root` declarations for custom `var=<name>`-named colors
 * collected in the registry during the render pass - additive to (never a
 * replacement for) the `:root` block emitted by getThemeVariableCss(). Empty
 * (no declarations emitted) when the document never uses `var=`.
 */
function getCustomColorVarCss(registry: CustomColorVarRegistry): string {
    if (registry.size === 0) {
        return '';
    }

    const decls = Array.from(registry.entries())
        .map(([name, { light, dark }]) => `--cs-${name}:light-dark(${light}, ${dark});`)
        .join('');

    return `:root{${decls}}`;
}

/**
 * Same shape as getClassDefaults(), but color properties reference the
 * `--cs-*` CSS variables (via var()) instead of literal values, so they
 * respond to the `prefers-color-scheme: dark` override emitted by
 * getThemeVariableCss(). Only used for the final SVG `<style>` tag - PDF
 * export keeps literal colors, since svg-to-pdfkit doesn't resolve CSS
 * variables.
 */
function getThemedClassDefaults(styles: Styles): Record<DefaultStyleClassName, Record<string, string>> {
    const defaults = getClassDefaults(styles);

    return {
        wire: { ...defaults.wire, stroke: `var(${ThemeVarNames.wire})` },
        busWire: { ...defaults.busWire, stroke: `var(${ThemeVarNames.busWire})` },
        junction: { ...defaults.junction, fill: `var(${ThemeVarNames.junction})` },
        busJunction: { ...defaults.busJunction, fill: `var(${ThemeVarNames.busJunction})` },
        pin: { ...defaults.pin, stroke: `var(${ThemeVarNames.lineColor})` },
        graphicLine: { ...defaults.graphicLine, stroke: `var(${ThemeVarNames.lineColor})` },
        graphicPolygon: { ...defaults.graphicPolygon, fill: `var(${ThemeVarNames.bodyColor})` },
        pinName: { ...defaults.pinName, fill: `var(${ThemeVarNames.textColor})` },
        pinId: { ...defaults.pinId, fill: `var(${ThemeVarNames.lineColor})` },
        label: { ...defaults.label, fill: `var(${ThemeVarNames.textColor})` },
        grid: { ...defaults.grid, stroke: `var(${ThemeVarNames.grid})` },
        text: { ...defaults.text, fill: `var(${ThemeVarNames.textColor})` },
        frame: { ...defaults.frame, stroke: `var(${ThemeVarNames.frame})` },
    };
}

/**
 * Emits the default CSS classes used by wires, junctions, pins, and their
 * associated text, resolved from the document's styles. Must be called after
 * `getStylesFromDocument` runs, since the rule values are per-document - and
 * after the canvas's elements are drawn (and any PDF-only override expansion
 * has run), since a rule is only emitted if at least one element still
 * carries that class - e.g. no `.busWire` rule if the document has no
 * bus wires.
 *
 * `theme: true` makes the emitted colors follow `prefers-color-scheme: dark`
 * (see getThemedClassDefaults()/getThemeVariableCss()) - only safe for SVG
 * output, since PDF export (svg-to-pdfkit) doesn't resolve CSS variables.
 * `colorRegistry`, when provided alongside `theme: true`, also emits the
 * `--cs-<name>` declarations collected for any `var=` custom colors used in
 * the document.
 */
export function addDefaultStyleClasses(canvas: Svg, styles: Styles,
    opts: { theme?: boolean, colorRegistry?: CustomColorVarRegistry } = {}): void {

    const styleTag = canvas.style();
    const classDefaults = opts.theme ? getThemedClassDefaults(styles) : getClassDefaults(styles);

    if (opts.theme) {
        styleTag.addText(getThemeVariableCss(styles));
        if (opts.colorRegistry) {
            styleTag.addText(getCustomColorVarCss(opts.colorRegistry));
        }
    }

    for (const className in classDefaults) {
        if (canvas.find('.' + className).length === 0) {
            continue;
        }

        styleTag.rule('.' + className, classDefaults[className as DefaultStyleClassName]);
    }

    // Universal — every <text> node uses this font-family, never overridden per-instance,
    // so it needs no class and no per-element attribute at all.
    if (canvas.find('text').length > 0) {
        styleTag.rule('text', {
            'font-family': defaultFont,
        });

        styleTag.rule('text tspan', {
            'white-space': 'pre'
        });
    }
}

/**
 * Applies a default-style class to an element, and - only for the properties
 * whose actual value diverges from that class's rule - inlines them via the
 * `style` attribute, which correctly wins over the class in the CSS cascade.
 * `overrides` must contain only the diverging properties, not the full set.
 */
export function applyClassWithOverrides(el: Element, className: DefaultStyleClassName,
    overrides: Record<string, string> = {}): void {

    el.addClass(className);

    if (Object.keys(overrides).length > 0) {
        el.addClass(StyleOverrideClass);

        // Set as a single `style` attribute rather than via el.css() (which sets
        // each property individually through the element's live style object).
        // This is needed because svgdom has bug that causes css functions to be
        // mangled in the style attribute if .css() is used.
        const cssText = Object.entries(overrides)
            .map(([prop, value]) => `${prop}: ${value};`)
            .join(' ');
        el.attr('style', cssText);
    }
}

/**
 * svg-to-pdfkit (used for PDF export) does not follow standard CSS precedence:
 * a class rule beats even a `style=` attribute override there, unlike in a
 * browser. So for PDF output, elements marked by applyClassWithOverrides() as
 * diverging from their class must instead carry the FULL resolved property set
 * as explicit presentation attributes, with the class removed entirely -
 * mirroring the plain-attribute path used for the general (non-default) case.
 */
export function expandStyleOverridesForPdf(canvas: Svg, styles: Styles): void {
    const classDefaults = getClassDefaults(styles);

    for (const className in classDefaults) {
        const defaults = classDefaults[className as DefaultStyleClassName];

        canvas.find(`.${className}.${StyleOverrideClass}`).forEach(el => {
            const overrides = el.css();
            const resolvedAttrs = { ...defaults, ...overrides };

            el.removeClass(className);
            el.removeClass(StyleOverrideClass);
            el.attr(resolvedAttrs);

            // Clear the inlined style properties now that they're explicit
            // attributes - but keep anything unrelated (e.g. text's
            // `white-space: pre`, always set regardless of class overrides).
            Object.keys(overrides).forEach(prop => el.css(prop, null));
        });
    }
}

/**
 * Resolves a color value produced by `fill`/`line_color`/`text_color` to the
 * literal CSS value that should be written into the SVG. Plain strings pass
 * through unchanged. A light/dark pair collapses to the light value alone if
 * both sides are identical (keeps trivial cases readable); otherwise it
 * either registers a named `--cs-<varName>` custom property (returning
 * `var(--cs-<varName>)`) or resolves inline to `light-dark(light, dark)`.
 */
export function resolveThemedColor(value: ThemedColor, registry: CustomColorVarRegistry): string {
    if (typeof value === 'string') {
        return value;
    }

    const { light, dark, varName } = value;

    if (light === dark) {
        return light;
    }

    if (varName !== undefined) {
        registerCustomColorVar(registry, varName, light, dark);
        return `var(--cs-${varName})`;
    }

    return `light-dark(${light}, ${dark})`;
}

function registerCustomColorVar(registry: CustomColorVarRegistry, name: string,
    light: string, dark: string): void {

    const fullName = `--cs-${name}`;
    if ((Object.values(ThemeVarNames) as string[]).includes(fullName)) {
        throw new Error(
            `var="${name}" collides with the built-in theme variable ${fullName} - choose a different name`);
    }

    const existing = registry.get(name);
    if (existing) {
        if (existing.light !== light || existing.dark !== dark) {
            throw new Error(
                `var="${name}" was already registered with a different light/dark color pair `
                + `(${existing.light}, ${existing.dark}) vs (${light}, ${dark})`);
        }
        return;
    }

    registry.set(name, { light, dark });
}

/**
 * Resolves a color value to a single literal, discarding any dark-theme
 * variant - used where there's no light/dark concept at all (KiCad export,
 * PDF export's fallback when a `var()` name can't be found in the registry).
 */
export function resolveToLiteralColor(value: string | ThemedColor): string {
    return typeof value === 'string' ? value : value.light;
}

const LightDarkPattern = /light-dark\(\s*([^,]+?)\s*,\s*[^)]+?\s*\)/g;
const CustomColorVarPattern = /var\(--cs-([a-zA-Z0-9_-]+)\)/g;

/**
 * Post-processing pass for PDF export: walks every element in the
 * (already-rendered) canvas and replaces any `light-dark(light, dark)` or
 * `var(--cs-<name>)` substring in its `style`/`stroke`/`fill` attributes with
 * a literal color - svg-to-pdfkit understands neither construct. Must run
 * after expandStyleOverridesForPdf(), since that's what moves override
 * colors into plain presentation attributes in the first place.
 */
export function resolvePdfSafeColors(canvas: Svg, registry: CustomColorVarRegistry): void {
    const colorAttrs = ['style', 'stroke', 'fill'];

    canvas.find('*').forEach(el => {
        colorAttrs.forEach(attr => {
            const value = el.attr(attr);
            if (typeof value !== 'string'
                || (!value.includes('light-dark(') && !value.includes('var(--cs-'))) {
                return;
            }

            const resolved = value
                .replace(LightDarkPattern, (_match, light: string) => light)
                .replace(CustomColorVarPattern, (_match, name: string) => {
                    const entry = registry.get(name);
                    return entry ? entry.light : _match;
                });

            el.attr(attr, resolved);
        });
    });
}