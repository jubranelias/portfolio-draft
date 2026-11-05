/** A planted tree. Positions are relative, so the forest scales to any width. */
export type TreeKind = 'pine' | 'oak' | 'olive' | 'palm';

export interface PlantedTree {
  id: string;
  kind: TreeKind;
  /** Horizontal position, 0–100 (% of the landscape width) */
  x: number;
  /** Depth row: 0 = far, 1 = middle, 2 = near */
  row: 0 | 1 | 2;
  /** Time planted (ms since epoch) */
  at: number;
}

export const TREE_KINDS: { kind: TreeKind; label: string }[] = [
  { kind: 'pine', label: 'Pine' },
  { kind: 'oak', label: 'Oak' },
  { kind: 'olive', label: 'Olive' },
  { kind: 'palm', label: 'Palm' },
];
