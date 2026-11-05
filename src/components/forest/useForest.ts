/** Forest state: the trees, the visitor's own tree, and planting (with a free spot finder). */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ForestStore, LocalForestStore, openForestStore } from './store';
import { PlantedTree, TreeKind } from './types';
import { uid } from './random';

/**
 * Where a new tree goes: always in the front row, in the widest open gap, so it sits beside
 * the others and is never hidden behind them. Only once the front row is full (no gap wide
 * enough for a tree) do new trees go further back, and then into a gap that isn't covered
 * by a tree in front.
 */
const MIN_GAP = 9; // % of the landscape width a tree needs

function widestGap(xs: number[]) {
  const pts = [2, ...xs.sort((a, b) => a - b), 98];
  let best = 0;
  let at = 50;
  for (let i = 0; i < pts.length - 1; i++) {
    const gap = pts[i + 1] - pts[i];
    if (gap > best) {
      best = gap;
      at = pts[i] + gap / 2;
    }
  }
  return { gap: best, at };
}

function freeSpot(trees: PlantedTree[]): { x: number; row: 0 | 1 | 2 } {
  const xsIn = (rows: number[]) => trees.filter((t) => rows.includes(t.row)).map((t) => t.x);
  // The first tree lands slightly off-centre, which looks more natural than dead centre
  if (trees.length === 0) return { x: 50, row: 2 };
  const candidates: { row: 0 | 1 | 2; blockers: number[] }[] = [
    { row: 2, blockers: xsIn([2]) },
    { row: 1, blockers: xsIn([1, 2]) },
    { row: 0, blockers: xsIn([0, 1, 2]) },
  ];
  for (const c of candidates) {
    const { gap, at } = widestGap(c.blockers);
    if (gap >= MIN_GAP * 2) {
      const jitter = (Math.random() - 0.5) * Math.min(gap * 0.25, 6);
      return { x: Math.round((at + jitter) * 10) / 10, row: c.row };
    }
  }
  // Forest is full: squeeze into the widest gap at the front
  return { x: Math.round(widestGap(xsIn([2])).at * 10) / 10, row: 2 };
}

export function useForest() {
  const [trees, setTrees] = useState<PlantedTree[]>([]);
  const [ready, setReady] = useState(false);
  const [mine, setMine] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const store = useRef<ForestStore | null>(null);

  useEffect(() => {
    let off: (() => void) | undefined;
    let alive = true;
    // Show the local forest straight away, then switch to the shared one if it's available
    const local = new LocalForestStore();
    store.current = local;
    off = local.subscribe(setTrees);
    setMine(local.myTreeId());
    setReady(true);
    openForestStore().then((s) => {
      if (!alive || !s.shared) return;
      off?.();
      store.current = s;
      setShared(true);
      off = s.subscribe(setTrees);
      setMine(s.myTreeId());
    });
    return () => {
      alive = false;
      off?.();
    };
  }, []);

  const plant = useCallback(
    async (kind: TreeKind) => {
      const spot = freeSpot(trees);
      const tree: PlantedTree = { id: uid(), kind, ...spot, at: Date.now() };
      // Show it immediately; the store confirms (or the shared forest echoes it back)
      setTrees((t) => [...t, tree]);
      setMine(tree.id);
      try {
        await store.current?.plant(tree);
      } catch {
        // Shared write refused (e.g. a view-only visitor): keep it in this browser instead
        const local = new LocalForestStore();
        await local.plant(tree);
      }
      return tree;
    },
    [trees],
  );

  // The visitor's own tree always shows, even before (or instead of) the shared forest echoing it
  const [own, setOwn] = useState<PlantedTree | null>(null);
  useEffect(() => {
    if (!mine || own) return;
    const saved = new LocalForestStore();
    let found: PlantedTree | null = null;
    const off = saved.subscribe((list) => (found = list.find((t) => t.id === mine) ?? null));
    off();
    if (found) setOwn(found);
  }, [mine, own]);
  const all = own && !trees.some((t) => t.id === own.id) ? [...trees, own] : trees;
  const myTree = all.find((t) => t.id === mine) ?? null;
  return { trees: all, ready, mine, myTree, plant: async (k: TreeKind) => { const t = await plant(k); setOwn(t); return t; }, shared };
}
