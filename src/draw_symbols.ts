import { G } from "@svgdotjs/svg.js";

const defaultSymbolLineColor = '#333';
const defaultSymbolLineWidth = 2;

interface SymbolGraphic {
    size(): { width: number, height: number }

    draw(group: G): void
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


export class SymbolPower implements SymbolGraphic {
    size(): { width: number; height: number; } {
        return {
            width: 50,
            height: 50,
        }
    }

    draw(group: G): void {
        group.path('M0 50 h50')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                });
    }
}

export class SymbolGnd implements SymbolGraphic {
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

export class SymbolRes implements SymbolGraphic {
    size(): { width: number; height: number; } {
        return {
            width: 70,
            height: 50,
        }
    }

    draw(group: G): void {
        // Draw rectangle form instead
        group.path('M0 25 h10 v-10 h50 v20 h-50 v-10 M60 25 h10')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                })
            .fill('none');
    }
}

export class SymbolCap implements SymbolGraphic {
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