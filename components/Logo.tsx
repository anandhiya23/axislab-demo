// Axis Lab logogram — six irregular rays through a single point,
// recreated from the brand deck (an "axis" spark / point of orientation).

const RAYS: Array<[number, number]> = [
  [2, 47],
  [23, 15],
  [62, 10],
  [84, 29],
  [95, 58],
  [41, 87],
];

export function LogoMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {RAYS.map(([x, y], i) => (
        <line
          key={i}
          x1={50}
          y1={50}
          x2={x}
          y2={y}
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function Wordmark({
  className = "",
  markSize = 34,
  tagline = true,
}: {
  className?: string;
  markSize?: number;
  tagline?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="leading-none">
        <div className="brand-word text-lg sm:text-xl">AXIS LAB</div>
        {tagline && (
          <div className="mt-1 text-[0.55rem] tracking-[0.24em] text-current/70">
            FITNESS &amp; PILATES
          </div>
        )}
      </div>
      <LogoMark size={markSize} className="text-current" />
    </div>
  );
}
