/**
 * "Plant something": visitors plant one tree each in a shared, growing landscape.
 * Flow: Plant a tree → choose (Pine, Oak, Olive, Palm, or Surprise me) → the seed drops,
 * sprouts and grows → a short thank-you. Returning visitors find their tree still there.
 */
import { useEffect, useRef, useState } from 'react';
import { Counter } from './Counter';
import { Landscape } from './Landscape';
import { Stage, TreeIcon } from './Tree';
import { TREE_KINDS, TreeKind } from './types';
import { useForest } from './useForest';

const NOTES = ['Thanks for leaving something behind.', 'A little more green.', 'The forest is growing.', 'You left your mark.', 'One more tree.', 'See you in the forest.'];
const KIND_NAME: Record<TreeKind, string> = { pine: 'pine', oak: 'oak', olive: 'olive tree', palm: 'palm' };
// Timings of the planting animation (ms); reduced motion skips straight to the tree
const STEPS: [Stage, number][] = [['seed', 0], ['sprout', 750], ['grow', 1350], ['done', 3100]];

export function PlantSection() {
  const { trees, mine, myTree, plant } = useForest();
  const [phase, setPhase] = useState<'idle' | 'choosing' | 'planting' | 'planted'>('idle');
  const [growing, setGrowing] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('done');
  const [note, setNote] = useState(NOTES[0]);
  const [find, setFind] = useState(false);
  const [announce, setAnnounce] = useState('');
  const firstChoice = useRef<HTMLButtonElement>(null);
  const plantBtn = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    if (phase === 'choosing') firstChoice.current?.focus();
  }, [phase]);

  const already = !!myTree && phase !== 'planting';
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const choose = async (kind: TreeKind) => {
    setPhase('planting');
    const tree = await plant(kind);
    setGrowing(tree.id);
    const steps = reduced ? ([['done', 0]] as [Stage, number][]) : STEPS;
    steps.forEach(([s, t]) => timers.current.push(window.setTimeout(() => setStage(s), t)));
    const end = reduced ? 50 : STEPS[STEPS.length - 1][1];
    timers.current.push(
      window.setTimeout(() => {
        const n = NOTES[Math.floor(Math.random() * NOTES.length)];
        setNote(n);
        setPhase('planted');
        setGrowing(null);
        setAnnounce(`You planted ${kind === 'olive' ? 'an olive tree' : `a ${KIND_NAME[kind]}`}. ${n}`);
      }, end),
    );
  };

  const surprise = () => choose(TREE_KINDS[Math.floor(Math.random() * TREE_KINDS.length)].kind);

  const findMine = () => {
    setFind(true);
    timers.current.push(window.setTimeout(() => setFind(false), 2400));
  };

  const counts = TREE_KINDS.map(({ kind, label }) => [label, trees.filter((t) => t.kind === kind).length] as const).filter(([, n]) => n > 0);
  const label = trees.length
    ? `A small forest of ${trees.length} ${trees.length === 1 ? 'tree' : 'trees'} planted by visitors: ${counts.map(([l, n]) => `${n} ${l.toLowerCase()}`).join(', ')}.${myTree ? ' Yours is marked.' : ''}`
    : 'An empty landscape, waiting for its first tree.';

  return (
    <section className="section plant" data-variant="ground" aria-labelledby="plant-title">
      <div className="container">
        <div className="plant__head">
          <h2 id="plant-title" className="section-title">Plant something</h2>
          <p className="plant__lede">
            Take a little piece of the portfolio with you.
            <br />
            Leave a little something behind.
          </p>
        </div>

        <Landscape trees={trees} mine={mine} growing={growing} stage={stage} highlight={find} label={label}>
          <Counter value={trees.length} />
          {trees.length === 0 && <p className="forest__empty">Nothing here yet. Be the first to plant something.</p>}
        </Landscape>

        <div className="plant__controls">
          {phase === 'idle' && !already && (
            <button ref={plantBtn} className="btn btn--solid plant__go" onClick={() => setPhase('choosing')}>
              <span className="btn__label">Plant a tree</span>
              <span className="plant__arrow" aria-hidden="true">→</span>
            </button>
          )}

          {phase === 'choosing' && (
            <div className="plant__choose" role="group" aria-labelledby="plant-choose">
              <p id="plant-choose" className="plant__choose-title">Choose your tree</p>
              <div className="plant__options">
                {TREE_KINDS.map(({ kind, label: l }, i) => (
                  <button key={kind} ref={i === 0 ? firstChoice : undefined} className="plant__option" onClick={() => choose(kind)}>
                    <TreeIcon kind={kind} />
                    <span>{l}</span>
                  </button>
                ))}
                <button className="plant__option plant__option--surprise" onClick={surprise}>
                  <span className="plant__dice" aria-hidden="true">?</span>
                  <span>Surprise me</span>
                </button>
              </div>
              <button className="plant__cancel" onClick={() => { setPhase('idle'); setTimeout(() => plantBtn.current?.focus(), 0); }}>
                Not now
              </button>
            </div>
          )}

          {phase === 'planting' && <p className="plant__status">Planting…</p>}

          {(phase === 'planted' || (phase === 'idle' && already)) && myTree && (
            <div className="plant__done">
              <p className="plant__done-title">{phase === 'planted' ? 'You planted a tree.' : `Your ${KIND_NAME[myTree.kind]} is still here.`}</p>
              <p className="plant__done-note">{phase === 'planted' ? note : 'Thanks for leaving something behind.'}</p>
              <button className="plant__find" onClick={findMine}>Find my tree</button>
            </div>
          )}
        </div>
        <p className="visually-hidden" aria-live="polite">{announce}</p>
      </div>
    </section>
  );
}
