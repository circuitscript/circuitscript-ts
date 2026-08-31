/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ClassComponent } from "../objects/ClassComponent.js";
import { Net } from "../objects/Net.js";
import { ComponentPinNetPair } from "src/objects/types.js";

/**
 * Builds a union-find over Net object identity, joining the two nets on
 * either side of any 2-pin component with ercNetBridgeProp === true.
 */
function buildErcNetBridgeUnionFind(nets: ComponentPinNetPair[]): Map<Net, Net> {
    // Disjoint-set parent pointers, keyed by Net identity. A net maps to itself
    // once it's the root of its set; find() path-compresses as it walks up.
    const parent = new Map<Net, Net>();

    // Returns n's set root, repointing every visited node directly to it
    // (path compression) so repeat lookups stay cheap.
    const find = (n: Net): Net => {
        let root = n;
        while (parent.has(root) && parent.get(root) !== root) {
            root = parent.get(root)!;
        }
        let cur = n;
        while (parent.has(cur) && parent.get(cur) !== root) {
            const next = parent.get(cur)!;
            parent.set(cur, root);
            cur = next;
        }
        return root;
    };

    // Merges a's and b's sets by pointing one root at the other; no-op if
    // they're already in the same set.
    const union = (a: Net, b: Net) => {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) parent.set(ra, rb);
    };

    // Nets touched by each bridge component, keyed by component identity so
    // separate instances of the same class definition aren't conflated.
    const byComponent = new Map<ClassComponent, Net[]>();
    for (const [component, , net] of nets) {
        if (!component.ercNetBridgeProp) continue;
        if (!parent.has(net)) parent.set(net, net);
        if (!byComponent.has(component)) byComponent.set(component, []);
        byComponent.get(component)!.push(net);
    }

    for (const componentNets of byComponent.values()) {
        // A validated erc_net_bridge component has exactly 2 pins; if either pin
        // isn't wired to a net, or both pins land on the same net already,
        // there's nothing to union.
        if (componentNets.length === 2 && componentNets[0] !== componentNets[1]) {
            union(componentNets[0], componentNets[1]);
        }
    }

    return parent;
}

/** Returns a new ComponentPinNetPair[] with erc_net_bridge-joined nets collapsed
 *  to a single representative Net. The input array and its Net objects are
 *  left untouched — this is only for feeding ERC rule checks. */
export function mergeErcNetBridgedNets(nets: ComponentPinNetPair[]): ComponentPinNetPair[] {
    const parent = buildErcNetBridgeUnionFind(nets);
    if (parent.size === 0) return nets;

    const find = (n: Net): Net => {
        let root = n;
        while (parent.has(root) && parent.get(root) !== root) {
            root = parent.get(root)!;
        }
        return root;
    };

    return nets.map(([component, pin, net]) => {
        return [component, pin, find(net)] as ComponentPinNetPair;
    });
}