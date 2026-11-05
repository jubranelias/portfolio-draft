import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.q} className={`acc ${isOpen ? 'acc--open' : ''}`}>
            <h3 className="acc__heading">
              <button id={btnId} className="acc__btn" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="acc__num">{i + 1}</span>
                <span className="acc__q">{item.q}</span>
                <Plus className="acc__icon" size={22} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acc__panel">
              <div className="acc__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
