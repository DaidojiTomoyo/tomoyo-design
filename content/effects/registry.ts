import type { Locale } from '@/content/locales';
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
};
const entries: Record<EffectId, Omit<EffectEntry, 'id'>> = {
  'hover-lift': {
    category: 'motion',
    name: { en: 'Hover lift', zh: '悬停浮起' },
    description: { en: 'A small lift when you hover or focus.', zh: '鼠标移上去，卡片轻轻抬起。' },
    trigger: { en: 'Hover / focus', zh: '悬停 / 聚焦' },
    aliases: ['悬浮抬升', '上浮', '鼠标', '卡片', 'card', 'mouse', 'lift', 'hover', 'focus'],
  },
  'soft-reveal': {
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
    category: 'material',
    name: { en: 'Frosted glass', zh: '磨砂玻璃' },
    description: {
      en: 'Let the background through. Keep type crisp.',
      zh: '透出背景层次，文字依然清楚。',
    },
    trigger: { en: 'Surface', zh: '静态材质' },
    aliases: ['玻璃拟态', '模糊', '透明', 'blur', 'glassmorphism', 'backdrop', 'translucent'],
  },
};
export const effects: EffectEntry[] = effectIds.map((id) => ({ id, ...entries[id] }));
export const getEffect = (id: EffectId) => effects.find((effect) => effect.id === id)!;
export const getCategory = (id: string) => categories.find((category) => category.id === id);
