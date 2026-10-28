import type { EffectSpec } from './schema';
import type { PromptLocale } from '@/i18n/config';

/** Only the resolved specification reaches both this generator and the preview. */
export function createEffectPrompt(t: EffectSpec, locale: PromptLocale) {
  const names = {
    'hover-lift': { en: 'Hover lift', zh: '悬停浮起' },
    'soft-reveal': { en: 'Soft reveal', zh: '柔和入场' },
    'frosted-glass': { en: 'Frosted glass', zh: '磨砂玻璃' },
  };
  if (locale === 'zh') {
    return [
      `沿用我项目现有的技术栈，实现「${names[t.id].zh}」效果。`,
      '保留我的内容、字体、颜色与布局。把效果应用于现有卡片，不复刻 Tomoyo 的示例插画，也不引入组件库。',
      describeEffect(t, 'zh'),
      '保持点击区域不动，只移动内部视觉表面，避免悬停边界反复触发。从当前画面平滑接续动画，快速切换时取消旧动画并保留当前视觉状态。动画播放中重复点击重播不应让画面跳回起点。',
      '尊重 prefers-reduced-motion：跳过位移和渐变，立即显示内容，保留清晰的焦点标记。玻璃可保留静态材质。支持键盘和触屏，动画仅影响当前组件。',
      '实现后说明哪些参数可以调整，以及如何验证行为。',
    ].join('\n\n');
  }
  return [
    `Create a ${names[t.id].en} effect using my project's existing stack.`,
    'Keep my content, typography, colors, and layout. Apply the effect to my existing card; do not recreate the Tomoyo demo artwork or add a component library.',
    describeEffect(t, 'en'),
    'Keep the pointer hit area stationary and animate its inner visual surface. Continue from the current visual frame when switching effects; cancel superseded animations. Repeated Replay clicks during playback must not restart the animation or make it flash.',
    'Respect prefers-reduced-motion: skip movement and fades, show all content immediately, and retain a clear focus indicator. A glass surface may remain static. Support keyboard and touch input. Keep the animation local to this component.',
    'Implement the change, then tell me which parameters to adjust and how you verified the behavior.',
  ].join('\n\n');
}

function describeEffect(t: EffectSpec, locale: PromptLocale) {
  const zh = locale === 'zh';
  if (t.id === 'hover-lift')
    return zh
      ? `鼠标悬停或可见键盘焦点出现时，卡片向上移动 ${t.distance}px，缩放到 ${t.scale} 倍，旋转 ${t.rotation}deg；不改变布局。transform 与 box-shadow 使用 ${t.easing}，时长 ${t.duration}ms。静置阴影 ${t.restingShadow}；抬升阴影 ${t.liftedShadow}。离开或失焦后平滑归位。轻点或重播在 ${t.duration * 4}ms 内演示一次抬升、停留、归位。`
      : `On hover or visible keyboard focus, translate the card upward ${t.distance}px, scale to ${t.scale} and rotate ${t.rotation}deg without changing layout. Transition transform and box-shadow over ${t.duration}ms using ${t.easing}. Resting shadow: ${t.restingShadow}; lifted shadow: ${t.liftedShadow}. Return smoothly on leave or blur. A tap or Replay demonstrates lift, hold and return once in ${t.duration * 4}ms.`;
  if (t.id === 'soft-reveal') {
    const axis = t.direction === 'up' || t.direction === 'down' ? 'Y' : 'X';
    const sign = t.direction === 'down' || t.direction === 'right' ? '-' : '';
    return zh
      ? `让内容柔和入场：opacity 从 0 到 1，translate${axis} 从 ${sign}${t.distance}px 到 0，scale 从 ${t.startScale} 到 1，filter: blur 从 ${t.blur}px 到 0。等待 ${t.delay}ms 后，用 ${t.duration}ms 和 ${t.easing} 完成入场。重播先用 ${t.revealResetDuration}ms 从当前画面淡出，再等待延迟并入场。保留布局空间；只在有意展示时播放，不循环。无 JavaScript 时显示完整内容。`
      : `Reveal the content from opacity 0 to 1, translate${axis} ${sign}${t.distance}px to 0, scale ${t.startScale} to 1 and filter blur(${t.blur}px) to blur(0px). Wait ${t.delay}ms, then animate for ${t.duration}ms using ${t.easing}. Replay first fades out from the current frame over ${t.revealResetDuration}ms, then waits the delay and reveals. Reserve layout space, reveal intentionally, never loop, and keep all content visible without JavaScript.`;
  }
  return zh
    ? `添加磨砂玻璃：背景 ${t.glassSurface}，backdrop-filter: blur(${t.blur}px) saturate(${t.saturation})，圆角 ${t.radius}px；1px rgba(255, 249, 239, ${t.borderOpacity}) 内描边，阴影 ${t.restingShadow}。后方放有对比度的图片，让模糊可见；前景内容保持清晰。低不透明度下为文字加局部纸色底以保证可读性。描边不占布局空间，不支持 backdrop-filter 时回退到不透明 #f7e8d8。重播先用 ${t.glassResetDuration}ms 回到纸面，再用 ${t.glassDuration}ms 和 ${t.easing} 过渡到玻璃。`
    : `Use a frosted glass surface with background ${t.glassSurface}, backdrop-filter blur(${t.blur}px) saturate(${t.saturation}), ${t.radius}px corner radius, a 1px inset rgba(255, 249, 239, ${t.borderOpacity}) border and shadow ${t.restingShadow}. Place a contrasting image behind it; keep foreground content sharp. At low opacity, add a local paper-colored backing beneath text for legibility. The border must not change layout. Fall back to opaque #f7e8d8 without backdrop-filter support. Replay returns to paper over ${t.glassResetDuration}ms, then transitions to glass over ${t.glassDuration}ms using ${t.easing}.`;
}
