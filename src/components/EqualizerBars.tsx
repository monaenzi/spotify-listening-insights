export function EqualizerBars() {
  const bars = [40, 70, 45, 90, 55, 75, 35, 60, 85, 50];

  return (
    <div className="flex items-end gap-1.5 h-16" aria-hidden="true">
      {bars.map((height, i) => (
        <span
          key={i}
          className="w-2 bg-accent animate-pulse-bar"
          style={{
            height: `${height}%`,
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${0.8 + (i % 3) * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}