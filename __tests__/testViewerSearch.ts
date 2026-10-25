/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { buildRefdesMatcher, searchRefdes } from '../viewer-ui/src/lib/search';
import type { ComponentMeta } from '../viewer-ui/src/types';

function mk(refDes: string | null, kind: ComponentMeta['kind'] = 'component'): ComponentMeta {
  return {
    domId: `id-${refDes ?? 'null'}-${kind}`,
    type: 'x',
    refDes,
    instanceName: '',
    sourceLine: null,
    sourceFile: null,
    params: [],
    pins: [],
    kind,
  };
}

function table(...items: ComponentMeta[]): Record<string, ComponentMeta> {
  return Object.fromEntries(items.map((i) => [i.domId, i]));
}

const refs = (c: Record<string, ComponentMeta>, q: string) =>
  searchRefdes(c, q).map((id) => c[id].refDes);

describe('refdes search', () => {
  const comps = table(mk('R10'), mk('R2'), mk('R1'), mk('C1'), mk('PR1'), mk('R22'));

  test('empty query', () => {
    expect(buildRefdesMatcher('')).toBeNull();
    expect(buildRefdesMatcher('   ')).toBeNull();
    expect(searchRefdes(comps, '  ')).toEqual([]);
  });

  test('substring match', () => {
    const m = buildRefdesMatcher('R1')!;
    expect(m('R1')).toBe(true);
    expect(m('R10')).toBe(true);
    expect(m('C1')).toBe(false);
  });

  test('case-insensitive', () => {
    expect(buildRefdesMatcher('r1')!('R1')).toBe(true);
    expect(buildRefdesMatcher('R*')!('r5')).toBe(true);
  });

  test('wildcards are anchored', () => {
    const star = buildRefdesMatcher('R*')!;
    expect(star('R1')).toBe(true);
    expect(star('R22')).toBe(true);
    expect(star('PR1')).toBe(false);
    const q = buildRefdesMatcher('R?')!;
    expect(q('R1')).toBe(true);
    expect(q('R10')).toBe(false);
  });

  test('regex metacharacters are literal', () => {
    expect(() => buildRefdesMatcher('R(1')).not.toThrow();
    expect(() => buildRefdesMatcher('R(1*')).not.toThrow();
    expect(buildRefdesMatcher('R.1*')!('R11')).toBe(false);
    expect(buildRefdesMatcher('R.1')!('R11')).toBe(false);
  });

  test('natural sort', () => {
    expect(refs(comps, 'R*')).toEqual(['R1', 'R2', 'R10', 'R22']);
  });

  test('excludes nets, graphics and null refdes', () => {
    const c = table(mk('R1'), mk('R2', 'net'), mk('R3', 'graphic'), mk(null));
    expect(refs(c, 'R')).toEqual(['R1']);
    expect(refs(c, '*')).toEqual(['R1']);
  });
});
