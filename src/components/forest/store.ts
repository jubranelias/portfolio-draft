/**
 * Persistence for the forest, behind one small interface so the backend can change later.
 *
 * - LocalForestStore: localStorage only. Each browser keeps its own forest (the visitor's tree
 *   survives return visits). Used on the regular site build.
 * - SharedForestStore: a shared, live forest (every visitor sees everyone's trees and one global
 *   counter). Used automatically when the page runs where a shared database is available
 *   (the claude.ai published preview). To use your own backend later (Supabase, Firebase, a small
 *   API…), implement ForestStore with the same four methods and return it from openForestStore().
 */
import { PlantedTree } from './types';

export interface ForestStore {
  /** Subscribe to the forest; returns an unsubscribe function. */
  subscribe(onChange: (trees: PlantedTree[]) => void): () => void;
  plant(tree: PlantedTree): Promise<void>;
  /** The id of the tree this visitor planted, if any. */
  myTreeId(): string | null;
  shared: boolean;
}

const LOCAL_KEY = 'forest:v1';
const MINE_KEY = 'forest:mine';

function readLocal(): PlantedTree[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    const list = raw ? (JSON.parse(raw) as PlantedTree[]) : [];
    return Array.isArray(list) ? list.filter((t) => t && t.id && t.kind) : [];
  } catch {
    return [];
  }
}
const readMine = () => {
  try {
    return localStorage.getItem(MINE_KEY);
  } catch {
    return null;
  }
};
const writeMine = (id: string) => {
  try {
    localStorage.setItem(MINE_KEY, id);
  } catch {
    /* storage unavailable: the tree still shows for this visit */
  }
};

export class LocalForestStore implements ForestStore {
  shared = false;
  private trees = readLocal();
  private listeners = new Set<(t: PlantedTree[]) => void>();
  subscribe(onChange: (t: PlantedTree[]) => void) {
    this.listeners.add(onChange);
    onChange(this.trees);
    return () => this.listeners.delete(onChange);
  }
  async plant(tree: PlantedTree) {
    this.trees = [...this.trees, tree];
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(this.trees));
    } catch {
      /* keep it for this visit */
    }
    writeMine(tree.id);
    this.listeners.forEach((l) => l(this.trees));
  }
  myTreeId() {
    return readMine();
  }
}

// Minimal shape of the shared database this page may be given (claude.ai published pages)
type Snap = { docs: { id: string; data(): Record<string, unknown> | undefined }[] };
type SharedDb = {
  collection(path: string): {
    orderBy(f: string, d?: 'asc' | 'desc'): { limit(n: number): { onSnapshot(n: (s: Snap) => void, e?: (err: unknown) => void): () => void } };
    doc(id: string): { set(data: Record<string, unknown>): Promise<void> };
  };
};

class SharedForestStore implements ForestStore {
  shared = true;
  constructor(private db: SharedDb) {}
  subscribe(onChange: (t: PlantedTree[]) => void) {
    return this.db
      .collection('forest')
      .orderBy('at', 'asc')
      .limit(400)
      .onSnapshot(
        (snap) => {
          const list: PlantedTree[] = [];
          for (const d of snap.docs) {
            const v = d.data() ?? {};
            if (['pine', 'oak', 'olive', 'palm'].includes(String(v.kind))) {
              list.push({
                id: d.id,
                kind: v.kind as PlantedTree['kind'],
                x: Math.min(100, Math.max(0, Number(v.x) || 0)),
                row: ([0, 1, 2].includes(Number(v.row)) ? Number(v.row) : 2) as PlantedTree['row'],
                at: Number(v.at) || 0,
              });
            }
          }
          onChange(list);
        },
        () => {
          /* keep whatever we have */
        },
      );
  }
  async plant(tree: PlantedTree) {
    await this.db.collection('forest').doc(tree.id).set({ kind: tree.kind, x: tree.x, row: tree.row, at: tree.at });
    writeMine(tree.id);
  }
  myTreeId() {
    return readMine();
  }
}

/** Use the shared forest when available (within ~2.5 s), otherwise this browser's own. */
export async function openForestStore(): Promise<ForestStore> {
  const claude = (window as unknown as { claude?: { use?: (n: string) => Promise<unknown> } }).claude;
  if (claude?.use) {
    try {
      const db = (await Promise.race([claude.use('db'), new Promise((r) => setTimeout(() => r(null), 2500))])) as SharedDb | null;
      if (db) return new SharedForestStore(db);
    } catch {
      /* fall back */
    }
  }
  return new LocalForestStore();
}
