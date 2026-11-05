/** The planted-tree count, set into the landscape like a small marker in the ground. */
import { useEffect, useRef, useState } from 'react';

export function Counter({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const [bump, setBump] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (value === prev.current) return;
    const up = value > prev.current;
    prev.current = value;
    setShown(value);
    if (up) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 700);
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <p className="forest__count">
      <span className={`forest__count-n ${bump ? 'is-bump' : ''}`}>{shown.toLocaleString('en-US')}</span>
      <span className="forest__count-l">{shown === 1 ? 'tree planted' : 'trees planted'}</span>
    </p>
  );
}
