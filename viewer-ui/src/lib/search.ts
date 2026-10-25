/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentMeta } from '../types';

/** Compiles a user query into a case-insensitive matcher. Returns null for an empty query. */
export function buildRefdesMatcher(query: string): ((refDes: string) => boolean) | null {
  const q = query.trim();
  if (!q) return null;
  if (q.includes('*') || q.includes('?')) {
    const escaped = q.replace(/[.+^${}()|[\]\\]/g, '\\$&');
    const pattern = escaped.replace(/\*/g, '.*').replace(/\?/g, '.');
    const re = new RegExp(`^${pattern}$`, 'i');
    return (refDes) => re.test(refDes);
  }
  const lower = q.toLowerCase();
  return (refDes) => refDes.toLowerCase().includes(lower);
}

/** Returns domIds of matching components, natural-sorted by refDes. */
export function searchRefdes(
  componentsById: Record<string, ComponentMeta>,
  query: string
): string[] {
  const matcher = buildRefdesMatcher(query);
  if (!matcher) return [];
  const hits = Object.values(componentsById).filter(
    (c) => c.kind === 'component' && !!c.refDes && matcher(c.refDes)
  );
  hits.sort((a, b) =>
    a.refDes!.localeCompare(b.refDes!, undefined, { numeric: true, sensitivity: 'base' })
  );
  return hits.map((c) => c.domId);
}
