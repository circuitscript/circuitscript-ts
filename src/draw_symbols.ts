import { G } from "@svgdotjs/svg.js";
import { defaultFont } from "./globals";

const defaultSymbolLineColor = '#333';
const defaultSymbolLineWidth = 2;

abstract class SymbolGraphic {

    drawPortsName = true;

    abstract size(): { width: number, height: number }

    abstract draw(group: G, extra?: {}): void;
}

export function SymbolFactory(name: string): SymbolGraphic | null {
    switch (name) {
        case 'gnd':
            return new SymbolGnd();
        case 'net':
            return new SymbolPower();
        case 'res':
            return new SymbolRes();
        case 'cap':
            return new SymbolCap();
    }
}


export class SymbolPower extends SymbolGraphic {

    drawPortsName = false;

    size(): { width: number; height: number; } {
        return {
            width: 50,
            height: 20,
        }
    }

    draw(group: G, extra?: {}): void {
        group.path('M10 20 h30')
            .stroke({
                width: defaultSymbolLineWidth,
                color: defaultSymbolLineColor
            });

        if (extra) {
            const netName = extra.net_name;
            group.text(netName)
                .translate(25, 20 - 2)
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: 10,
                    anchor: 'middle',
                })
        }
    }
}

export class SymbolGnd extends SymbolGraphic {

    drawPortsName = false;
    
    size(): { width: number; height: number; } {
        return {
            width: 50,
            height: 50,
        }
    }

    draw(group: G): void {
        // Assume that the symbol is vertical
        group.path('M0 0 h50 M10 10 h30 M20 20 h10')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                });
    }
}

export class SymbolRes extends SymbolGraphic {

    drawPortsName = false;

    size(): { width: number; height: number; } {
        return {
            width: 70,
            height: 30,
        }
    }

    draw(group: G): void {
        // Draw rectangle form instead
        group.path('M0 15 h10 v-10 h50 v20 h-50 v-10 M60 15 h10')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                })
            .fill('none');
    }
}

export class SymbolCap extends SymbolGraphic {

    drawPortsName = false;

    size(): { width: number; height: number; } {
        return {
            width: 50,
            height: 50,
        }
    }

    draw(group: G): void {
        group.path('M20 10 v30 M30 10 v30 M0 25 h20 M50 25 h-20')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                })
            .fill('none');
    }
}