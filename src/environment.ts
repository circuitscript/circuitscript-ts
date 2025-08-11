import { Dom, registerWindow, SVG } from "@svgdotjs/svg.js";
import { PathOrFileDescriptor, readFileSync, PathLike, existsSync } from "fs";
import path from "path";
import { TOOL_VERSION } from "./globals";
import { SVGWindow } from "./helpers";
import { RuntimeExecutionError } from "./utils";

// TODO: create an interface for this. Default is to use node 
// as the environment.

export class NodeScriptEnvironment {

    // Maintain a global instance for ease of access
    // TODO: in the future, this should be changed away from this singleton.
    static _instance: NodeScriptEnvironment | null = null;

    static setInstance(instance: NodeScriptEnvironment): void {
        NodeScriptEnvironment._instance = instance;
    }

    static getInstance(): NodeScriptEnvironment {
        return NodeScriptEnvironment._instance!;
    }

    protected useModuleDirectoryPath: string | null = null;
    protected useDefaultLibsPath: string | null = null;

    protected globalCreateSVGWindow: (() => SVGWindow) | null = null;

    // Supported fonts for SVG rendering
    protected supportedFonts = {
        'Arial': 'Arial.ttf',
    };

    setModuleDirectory(path: string): void {
        this.useModuleDirectoryPath = path;
    }

    setDefaultLibsPath(path: string): void {
        this.useDefaultLibsPath = path;
    }

    getPackageVersion(): string {
        return TOOL_VERSION;
    }

    /**
     * Returns the directory where the circuitscript executable is at. This
     * path will be used to find the fonts/ and libs/ folders.
     * @returns
     */
    getModuleDirectory(): string {
        if (this.useModuleDirectoryPath !== null) {
            return this.useModuleDirectoryPath;
        }

        // Try CommonJS approach first
        if (typeof __dirname !== 'undefined') {
            return __dirname;
        }

        // For ESM environments, use stack trace to find current file location
        const stackLine = new Error().stack?.split('\n')[1];
        if (stackLine) {
            // Look for file:// URLs (ESM) or regular paths (Jest/CJS)
            const fileMatch = stackLine.match(/\((.+)\:[\d]+\:[\d]+\)/);
            if (fileMatch) {
                const filePath = fileMatch[1].replace('file://', '');
                return path.dirname(filePath);
            }
        }

        throw new RuntimeExecutionError("Failed to get current module directory");
    }

    getRelativeToModule(filePath: string): string {
        return path.join(this.getModuleDirectory(), filePath);
    }

    getRelativeToDefaultLibs(filePath: string): string {
        return path.join(this.getDefaultLibsPath(), filePath);
    }

    /**
     * Gets the root tools directory path relative to the current file location.
     *
     * This function calculates the base directory of the CircuitScript package by
     * navigating up two levels from the current source file location. The tools path
     * serves as the root directory containing package resources like fonts, libraries,
     * and configuration files.
     *
     * @returns {string} The normalized absolute path to the tools directory
     *
     * @example
     * // If current file is at /path/to/circuitscript/dist/src/helpers.js
     * // Returns: /path/to/circuitscript/dist
     * const toolsPath = getToolsPath();
     *
     * @throws {Error} May throw if file system operations are not supported
     *
     * @internal This is a private function used by other path utility functions
     */
    getToolsPath(): string {
        return path.normalize(this.getModuleDirectory() + '/../');
    }

    getFontsPath(): string {
        return path.normalize(this.getToolsPath() + "fonts");
    }

    getDefaultLibsPath(): string {
        if (this.useDefaultLibsPath !== null) {
            return this.useDefaultLibsPath;
        }

        return path.normalize(this.getToolsPath() + "libs");
    }

    /**
     * Prepares the SVG environment by loading the svgdom ESM module and configuring fonts
     */
    private async prepareSVGEnvironmentInternal(fontsPath: string | null): Promise<void> {
        try {
            // Use Function constructor to prevent TypeScript from converting to require() in CJS build
            const dynamicImport = new Function('specifier', 'return import(specifier)');
            const { config, createSVGWindow } = await dynamicImport('svgdom');

            this.globalCreateSVGWindow = createSVGWindow;
            if (fontsPath !== null) {
                await config.setFontDir(fontsPath)
                    .setFontFamilyMappings(this.supportedFonts)
                    .preloadFonts();
            }
        } catch (error) {
            throw new Error(`Failed to load svgdom ESM module: ${error}`);
        }
    }

    /**
     * Gets the SVG window creation function
     */
    createSVGWindow(): SVGWindow {
        if (this.globalCreateSVGWindow === null) {
            throw new Error("SVG environment is not set up yet. Call prepareSVGEnvironment() first.");
        }
        return this.globalCreateSVGWindow();
    }

    // Re-usable canvas for the text measurement
    textMeasurementCanvas: Dom | undefined;

    getCanvasWindow(): Dom {
        if (this.textMeasurementCanvas === undefined) {
            const window = this.createSVGWindow();
            const { document } = window;
            registerWindow(window, document);
            this.textMeasurementCanvas = SVG(document.documentElement);
        }

        return this.textMeasurementCanvas!;
    }

    prepareSVGEnvironment(): Promise<void> {
        return this.prepareSVGEnvironmentInternal(this.getFontsPath());
    }

    readFileSync(path: PathOrFileDescriptor, options): string {
        return readFileSync(path, options);
    }

    existsSync(path: PathLike): ReturnType<typeof existsSync> {
        return existsSync(path);
    }
}
