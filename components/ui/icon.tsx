type IconName = 'arrow' | 'copy' | 'replay' | 'check';

const paths: Record<IconName, string> = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  copy: 'M8 7h12v14H8zM16 7V3H4v14h4',
  replay: 'M4 10a8 8 0 1 1 1 8M4 4v6h6',
  check: 'm5 12 4 4L19 6',
};

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg
      className={`icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
