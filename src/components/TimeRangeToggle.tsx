import type { TimeRange } from "@/lib/spotify/tracks";

const RANGE_LABELS: Record<TimeRange, string> = {
  short_term: "4 WEEKS",
  medium_term: "6 MONTHS",
  long_term: "ALL TIME",
};

export function TimeRangeToggle({
  value,
  onChange,
}: {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}) {
  return (
    <div className="flex gap-2 mb-8 font-sans">
      {(Object.keys(RANGE_LABELS) as TimeRange[]).map((range) => {
        const isActive = range === value;
        return (
          <button
            key={range}
            onClick={() => onChange(range)}
            disabled={isActive}
            className={`flex items-center gap-2 px-4 py-2 border text-xs tracking-widest transition-colors ${
              isActive
                ? "bg-accent border-accent text-foreground"
                : "border-muted text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            <span>{isActive ? "▮" : "▯"}</span>
            {RANGE_LABELS[range]}
          </button>
        );
      })}
    </div>
  );
}