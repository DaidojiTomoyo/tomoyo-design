export const motionDirections = ['press', 'type', 'coast'] as const;
export type MotionDirection = (typeof motionDirections)[number];
export const homeMotionDirection: MotionDirection = 'type';
export const isMotionDirection = (value: string): value is MotionDirection =>
  motionDirections.some((direction) => direction === value);

export const studyMotion = {
  ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
  loading: {
    revealDelay: 250,
    resourceTimeout: 10000,
  },
  opening: {
    letter: 640,
    stagger: 45,
    marks: 720,
    coast: 900,
    hold: 650,
  },
  exit: 160,
  text: 380,
  print: 720,
  type: 640,
  exposure: 800,
  scroll: 620,
} as const;
