import type { Locale } from './locales';

export const motionDirections = ['press', 'type', 'coast'] as const;
export type MotionDirection = (typeof motionDirections)[number];
export const homeMotionDirection: MotionDirection = 'type';
export const isMotionDirection = (value: string): value is MotionDirection =>
  motionDirections.some((direction) => direction === value);

const studies = {
  zh: {
    label: '首页动效预览',
    names: { press: '套色印刷', type: '活字排版', coast: '海岸显影' },
    descriptions: {
      press: '套准、落版、换一版文字。向下滚动可以看后半段。',
      type: '文字排入画面，标题随滚动归位。试试右上角的中英文切换。',
      coast: '海岸先显影，随后露出页面。滚动时留意图片和文字的层次。',
    },
    replay: '重播开场',
    home: '回到首页',
    loading: '正在准备图片和字体',
    ready: '打开预览',
    homeReady: '试试效果',
    quiet: '减少动态效果已开启，开场与滚动位移已省略。',
  },
  en: {
    label: 'Homepage motion studies',
    names: { press: 'Screenprint', type: 'Typesetting', coast: 'Coastal exposure' },
    descriptions: {
      press: 'Registration, ink, then the page. Scroll to see the rest of the sequence.',
      type: 'Type slides into place. Scroll through the headings and try changing the language.',
      coast: 'The coast develops before the page opens. Watch the image as you scroll.',
    },
    replay: 'Replay opening',
    home: 'Back to home',
    loading: 'Preparing images and type',
    ready: 'Opening preview',
    homeReady: 'Explore the effects',
    quiet: 'Reduced motion is on. Opening and scroll movement are skipped.',
  },
};
export const getMotionStudy = (locale: Locale) => studies[locale];

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
