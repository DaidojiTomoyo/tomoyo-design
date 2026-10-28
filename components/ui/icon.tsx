type IconName =
  | 'arrow'
  | 'copy'
  | 'replay'
  | 'check'
  | 'search'
  | 'grid'
  | 'motion'
  | 'material'
  | 'type'
  | 'layout'
  | 'menu'
  | 'down'
  | 'chevron'
  | 'pointer'
  | 'play'
  | 'eye'
  | 'link'
  | 'close';

const paths: Record<IconName, string> = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  copy: 'M8 7h12v14H8zM16 7V3H4v14h4',
  replay: 'M4 10a8 8 0 1 1 1 8M4 4v6h6',
  check: 'm5 12 4 4L19 6',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  motion: 'm3 13 5-8 6 14 7-9M3 19h4M18 5h3',
  material: 'M4 7h13v13H4zM8 3h13v13',
  type: 'M4 5V3h16v2M12 3v18M8 21h8',
  layout: 'M3 3h11v10H3zM18 3h3v10h-3zM3 17h6v4H3zM13 17h8v4h-8z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  down: 'm5 9 7 7 7-7',
  chevron: 'm9 5 7 7-7 7',
  pointer: 'm6 3 13 9-7 1-3 7Z',
  play: 'm8 5 11 7-11 7Z',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  link: 'm10 14 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M13 17a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-2 2',
  close: 'm6 6 12 12M18 6 6 18',
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
