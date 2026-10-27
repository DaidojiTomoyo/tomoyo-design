import { formatMessage, getMessages, type Locale } from '@/content/locales';

export const motionTokens = {
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  liftDistance: 6,
  liftDuration: 240,
  revealDistance: 12,
  revealDuration: 480,
  revealResetDuration: 120,
  glassDuration: 320,
  glassResetDuration: 160,
  glassBlur: 18,
  glassSaturation: 1.15,
  glassSurface: 'rgba(247, 232, 216, 0.86)',
  restingShadow: '0 20px 32px rgba(4, 25, 72, 0.32)',
  liftedShadow: '0 28px 44px rgba(4, 25, 72, 0.38)',
} as const;

export const homeEffects = [
  { id: 'hover-lift' },
  { id: 'soft-reveal' },
  { id: 'frosted-glass' },
] as const;

export type EffectId = (typeof homeEffects)[number]['id'];

export function getHomeEffects(locale: Locale) {
  const messages = getMessages(locale).effects;
  return homeEffects.map(({ id }) => ({
    id,
    ...messages[id],
    summary: formatMessage(messages[id].summary, {
      distance: id === 'hover-lift' ? motionTokens.liftDistance : motionTokens.revealDistance,
      duration: motionTokens.revealDuration,
      blur: motionTokens.glassBlur,
    }),
  }));
}

export function buildEffectPrompt(id: EffectId, locale: Locale = 'en'): string {
  const t = motionTokens;
  if (locale === 'zh') {
    const instructions: Record<EffectId, string> = {
      'hover-lift': `为卡片添加轻微的悬浮抬升。鼠标悬停或可见的键盘焦点出现时，向上平移 ${t.liftDistance}px，不改变页面布局。transform 与 box-shadow 使用 ${t.easing}，过渡时长 ${t.liftDuration}ms。静置阴影为 ${t.restingShadow}，抬升阴影为 ${t.liftedShadow}。鼠标移开或失焦后平滑归位。提供轻点或重播操作，在 ${t.liftDuration * 4}ms 内演示一次静置、抬升、停留和归位。保持点击区域不动，只移动内部视觉表面，避免悬停边界反复触发。`,
      'soft-reveal': `为卡片添加柔和入场：opacity 从 0 到 1，translateY 从 ${t.revealDistance}px 到 0，时长 ${t.revealDuration}ms，曲线 ${t.easing}。只在有意展示时播放，并提供重播操作。重播前，用 ${t.revealResetDuration}ms 从当前状态平滑淡出，再播放入场；不要突然隐藏已经显示的内容。保留布局空间，无 JavaScript 时默认显示全部内容。不循环播放。`,
      'frosted-glass': `为卡片添加磨砂玻璃材质：背景 ${t.glassSurface}，backdrop-filter: blur(${t.glassBlur}px) saturate(${t.glassSaturation})，1px rgba(255, 249, 239, 0.7) 描边，阴影 ${t.restingShadow}。在卡片后放置有对比度的图片或纹理，使模糊可见；文字和前景图片保持清晰，不对内容使用 filter: blur。描边使用不占布局空间的伪元素，切换材质时保持内容尺寸不变。不支持 backdrop-filter 时回退到不透明 #f7e8d8。重播先用 ${t.glassResetDuration}ms 平滑回到纸面，再用 ${t.glassDuration}ms 和 ${t.easing} 过渡到玻璃。`,
    };
    return [
      `沿用我项目现有的技术栈，实现「${getMessages(locale).effects[id].name}」效果。`,
      '保留我的内容、字体、颜色与布局。把效果应用于现有卡片，不复刻 Tomoyo 的示例插画，也不引入组件库。',
      instructions[id],
      '从当前画面平滑接续动画，快速切换时取消旧动画并保留当前视觉状态。动画播放中重复点击重播不应让画面跳回起点。',
      '尊重 prefers-reduced-motion：跳过位移和渐变，立即显示内容，保留清晰的焦点标记。玻璃可保留静态材质。支持键盘和触屏，动画仅影响当前组件。',
      '实现后说明哪些参数可以调整，以及如何验证行为。',
    ].join('\n\n');
  }
  const instructions: Record<EffectId, string> = {
    'hover-lift': `Add a subtle hover lift to the card. On pointer hover and visible keyboard focus, translate it upward by ${t.liftDistance}px without changing the layout. Transition transform and box-shadow over ${t.liftDuration}ms using ${t.easing}. The resting shadow is ${t.restingShadow}; the lifted shadow is ${t.liftedShadow}. Return smoothly to the resting state on pointer leave or blur. Provide a tap or Replay control that demonstrates rest, lift, hold, and return once in ${t.liftDuration * 4}ms.`,
    'soft-reveal': `Create a soft entrance for the card. Animate opacity from 0 to 1 and translateY from ${t.revealDistance}px to 0 over ${t.revealDuration}ms using ${t.easing}. Play once when intentionally revealing the card, and allow an explicit Replay action. Before replaying, fade out smoothly from the current frame over ${t.revealResetDuration}ms; never instantly hide already-visible content. Reserve its layout space. Keep the default content visible when JavaScript is unavailable; hide it only during the active animation. Do not loop.`,
    'frosted-glass': `Give the card a frosted glass surface: background ${t.glassSurface}, backdrop-filter blur(${t.glassBlur}px) saturate(${t.glassSaturation}), a 1px rgba(255, 249, 239, 0.7) border, and shadow ${t.restingShadow}. Place a contrasting image or textured background behind the card so the blur is visible. Keep the card's text and foreground image sharp; do not apply filter: blur to its contents. Keep dark text readable. If backdrop-filter is unsupported, use an opaque #f7e8d8 surface. A Replay control first returns smoothly to opaque paper over ${t.glassResetDuration}ms, then transitions to the final glass surface over ${t.glassDuration}ms with ${t.easing}. Use an inset pseudo-element for the border so it never changes the content box.`,
  };
  return [
    `Create a ${getMessages('en').effects[id].name} effect using my project's existing stack.`,
    'Keep my content, typography, colors, and layout. Apply the effect to my existing card; do not recreate the Tomoyo demo artwork or add a component library.',
    instructions[id],
    'Keep the pointer hit area stationary and animate its inner visual surface. Continue from the current visual frame when switching effects; cancel superseded animations. Repeated Replay clicks during playback must not restart the animation or make it flash.',
    'Respect prefers-reduced-motion: skip movement and fades, show all content immediately, and retain a clear focus indicator. A glass surface may remain static. Support keyboard and touch input. Keep the animation local to this component.',
    'Implement the change, then tell me which parameters to adjust and how you verified the behavior.',
  ].join('\n\n');
}

export const effectCategories = [
  {
    title: 'Motion',
    description: ['Bring interfaces to life', 'with subtle, purposeful movement.'],
    examples: [
      { name: 'Hover lift', effect: 'hover-lift' },
      { name: 'Slide in' },
      { name: 'Fade in' },
      { name: 'Parallax' },
    ],
  },
  {
    title: 'Style',
    description: ['Refine the look and feel', 'with distinctive visual details.'],
    examples: [
      { name: 'Soft reveal', effect: 'soft-reveal' },
      { name: 'Underline grow' },
      { name: 'Blur to sharp' },
      { name: 'Scale on hover' },
    ],
  },
  {
    title: 'Material',
    description: ['Add depth and texture', 'with modern interface materials.'],
    examples: [
      { name: 'Frosted glass', effect: 'frosted-glass' },
      { name: 'Grain texture' },
      { name: 'Glow' },
      { name: 'Layered cards' },
    ],
  },
] satisfies {
  title: string;
  description: string[];
  examples: { name: string; effect?: EffectId }[];
}[];
