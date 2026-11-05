/**
 * Rotating 3D cube in the hero: the tools I work with, one per face, each as a 3D app-icon tile
 * in the tool's official brand colour. The tiles carry the tool's initial for now; the official
 * logo files can replace the initials (drop them in as <img> inside .tool__icon).
 */
const TOOLS: { name: string; role: string; mark: string; key: string }[] = [
  { name: 'Figma', role: 'Design & prototyping', mark: 'F', key: 'figma' },
  { name: 'Claude', role: 'Thinking partner', mark: 'C', key: 'claude' },
  { name: 'Jira', role: 'Planning & delivery', mark: 'J', key: 'jira' },
  { name: 'Slack', role: 'Team chat', mark: 'S', key: 'slack' },
];

export function WorkCube() {
  return (
    <div className="cube cube--tools" role="img" aria-label="Tools I use: Figma, Claude, Jira and Slack">
      <div className="cube__body">
        {TOOLS.map((t, i) => (
          <div key={t.key} className={`cube__face cube__face--${i} tool`}>
            <span className={`tool__icon tool__icon--${t.key}`} aria-hidden="true">
              <span>{t.mark}</span>
            </span>
            <span className="tool__name">{t.name}</span>
            <span className="tool__role">{t.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
