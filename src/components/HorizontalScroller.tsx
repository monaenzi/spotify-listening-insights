export function HorizontalScroller({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
      {children}
    </div>
  );
}