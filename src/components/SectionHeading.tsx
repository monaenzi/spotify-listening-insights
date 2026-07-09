export function SectionHeading({ title, index }: { title: string; index: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6 border-b border-muted pb-3">
      <span className="font-display text-accent text-xl">{index}</span>
      <h2 className="font-display uppercase tracking-wide text-2xl">{title}</h2>
    </div>
  );
}