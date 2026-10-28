import type { Locale } from '@/i18n/config';
import { effectIds, type EffectId } from './schema';

export const categories = [
  {
    id: 'motion',
    icon: 'motion',
    name: { en: 'Animation & interaction', zh: '动画与交互' },
    description: {
      en: 'Give content a natural entrance and response.',
      zh: '让元素的出现和响应更自然。',
    },
  },
  {
    id: 'material',
    icon: 'material',
    name: { en: 'Materials & light', zh: '材质与光影' },
    description: {
      en: 'Change the surface. Keep the content clear.',
      zh: '用表面、光影和层次改变观感。',
    },
  },
  {
    id: 'style',
    icon: 'type',
    name: { en: 'Visual styles', zh: '视觉风格' },
    description: {
      en: 'Set the tone with type, imagery and space.',
      zh: '通过字体、图像和留白，建立页面的气质。',
    },
  },
  {
    id: 'layout',
    icon: 'layout',
    name: { en: 'Layouts', zh: '布局与编排' },
    description: {
      en: 'Give the same content a different structure.',
      zh: '换一种排列，让内容的主次更清楚。',
    },
  },
] as const;
export type CategoryId = (typeof categories)[number]['id'];
type Text = Record<Locale, string>;
export type EffectEntry = {
  id: EffectId;
  category: CategoryId;
  name: Text;
  description: Text;
  trigger: Text;
  aliases: string[];
  summaryKey:
    'summaryLift' | 'summaryReveal' | 'summaryGlass' | 'summaryEditorial' | 'summaryBento';
};
const entries: Record<EffectId, Omit<EffectEntry, 'id'>> = {
  'hover-lift': {
    summaryKey: 'summaryLift',
    category: 'motion',
    name: { en: 'Hover lift', zh: '悬停浮起' },
    description: { en: 'A small lift when you hover or focus.', zh: '鼠标移上去，卡片轻轻抬起。' },
    trigger: { en: 'Hover / focus', zh: '悬停 / 聚焦' },
    aliases: ['悬浮抬升', '上浮', '鼠标', '卡片', 'card', 'mouse', 'lift', 'hover', 'focus'],
  },
  'soft-reveal': {
    summaryKey: 'summaryReveal',
    category: 'motion',
    name: { en: 'Soft reveal', zh: '柔和入场' },
    description: {
      en: 'Fade in and settle gently into place.',
      zh: '从下方淡入，让内容自然出现。',
    },
    trigger: { en: 'Reveal / replay', zh: '进入 / 重播' },
    aliases: ['柔和渐显', '渐显', '淡入', '入场', 'fade', 'entrance', 'reveal', 'ease out'],
  },
  'frosted-glass': {
    summaryKey: 'summaryGlass',
    category: 'material',
    name: { en: 'Frosted glass', zh: '磨砂玻璃' },
    description: {
      en: 'Let the background through. Keep type crisp.',
      zh: '透出背景层次，文字依然清楚。',
    },
    trigger: { en: 'Surface', zh: '静态材质' },
    aliases: ['玻璃拟态', '模糊', '透明', 'blur', 'glassmorphism', 'backdrop', 'translucent'],
  },
  editorial: {
    summaryKey: 'summaryEditorial',
    category: 'style',
    name: { en: 'Editorial style', zh: '杂志编辑风格' },
    description: {
      en: 'Let a strong headline and considered image placement lead the story.',
      zh: '用大标题与讲究的图文位置，把一段内容排成杂志。',
    },
    trigger: { en: 'Type & composition', zh: '字体 / 图文编排' },
    aliases: [
      '杂志',
      '编辑',
      '报刊',
      '排版',
      '大标题',
      'editorial',
      'magazine',
      'typography',
      'article',
    ],
  },
  'bento-grid': {
    summaryKey: 'summaryBento',
    category: 'layout',
    name: { en: 'Bento grid', zh: '便当盒布局' },
    description: {
      en: 'Mix large and small blocks on one grid, with room for each piece of content.',
      zh: '把大小不同的内容块放进统一网格，主次一眼可见。',
    },
    trigger: { en: 'Responsive grid', zh: '响应式网格' },
    aliases: [
      '便当盒',
      '便当',
      '网格',
      '栅格',
      '卡片布局',
      'bento',
      'grid',
      'layout',
      'responsive',
    ],
  },
};
export const effects: EffectEntry[] = effectIds.map((id) => ({ id, ...entries[id] }));
export const getEffect = (id: EffectId) => effects.find((effect) => effect.id === id)!;
export const getCategory = (id: string) => categories.find((category) => category.id === id);
