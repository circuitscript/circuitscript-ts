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
    | 'busJunction' | 'pin' | 'graphicLine'
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
    };

    const dark: Record<string, string> = {
        [ThemeVarNames.busWire]: DarkColorScheme.BusWireColor,
        [ThemeVarNames.junction]: DarkColorScheme.JunctionColor,
        [ThemeVarNames.busJunction]: DarkColorScheme.BusJunctionColor,
        [ThemeVarNames.grid]: DarkColorScheme.GridColor,
        [ThemeVarNames.frame]: DarkColorScheme.FrameBorderColor,
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
 */
export function addDefaultStyleClasses(canvas: Svg, styles: Styles, opts: { theme?: boolean } = {}): void {
    const styleTag = canvas.style();
    const classDefaults = opts.theme ? getThemedClassDefaults(styles) : getClassDefaults(styles);

    if (opts.theme) {
        styleTag.addText(getThemeVariableCss(styles));
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
        el.css(overrides);
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
