import type { SequenceSpec } from '../types';
import type { PromptLocale } from '@/i18n/config';
import { sequenceDuration, sequenceTextExit } from '../sequence-timing';

export function createSequencePrompt(s: SequenceSpec, locale: PromptLocale) {
  const press = s.id === 'overprint';
  const zh = locale === 'zh';
  const name = zh ? (press ? '套色印刷' : '海岸显影') : press ? 'overprint' : 'coastal reveal';
  const lead = zh
    ? `沿用项目现有技术、内容和视觉风格，实现${name}效果。`
    : `Keep the project's existing stack, content and visual identity. Implement a ${name} effect. `;
  const arrival = zh
    ? press
      ? `内容从下方 ${s.distance}px、旋转 ${s.rotation}°、缩放 0.98 归位，透明度从 0.2 到 1。`
      : `内容从下方 ${s.distance}px、缩放 ${s.startScale}、模糊 ${s.blur}px 和透明度 0 过渡到正常位置、缩放 1、清晰且不透明。`
    : press
      ? `Bring content from ${s.distance}px below, ${s.rotation} degrees rotation, scale 0.98 and opacity 0.2 to its normal position, scale 1 and opacity 1. `
      : `Bring content from ${s.distance}px below, scale ${s.startScale}, ${s.blur}px blur and opacity 0 to its normal position, scale 1, no blur and opacity 1. `;
  const timing = zh
    ? `主过渡 ${s.duration}ms；标题与说明用其 70% 的时长配合横向裁切显现，相邻间隔 ${s.stagger}ms。`
    : `Use ${s.duration}ms for the main transition. Reveal the heading and caption with a horizontal clip over 70% of that duration, staggered by ${s.stagger}ms. `;
  let scene: string;
  if (s.scene === 'opening') {
    const formation = zh
      ? press
        ? `字标的主色层与辅助色层分别从水平 ±${s.offset}px、反向垂直 ${s.offset * 0.75}px 处，在 ${s.formation}ms 内对齐，辅助色层淡出。随后纸面遮片向右揭开，用时 ${s.duration}ms。`
        : `开场图像在 ${s.formation}ms 内由透明度 0.15、缩放 ${s.startScale}、模糊 ${s.blur}px、对比度 1.6 恢复为正常图像；字标同步由模糊 ${s.blur}px 淡入。遮片随后在 ${s.duration}ms 内向上下各收拢 42% 并淡出。`
      : press
        ? `Align the main and accent wordmark layers from horizontal offsets of ±${s.offset}px and opposite vertical offsets of ${s.offset * 0.75}px over ${s.formation}ms; fade out the accent layer. Wipe the paper cover to the right over ${s.duration}ms. `
        : `Expose the opening image over ${s.formation}ms, from opacity 0.15, scale ${s.startScale}, ${s.blur}px blur and contrast 1.6 to its normal image. Fade the wordmark in from ${s.blur}px blur. Close the cover by 42% from both top and bottom while fading it out over ${s.duration}ms. `;
    scene = zh
      ? `场景为开场演示。遮片在最初 120ms 淡入，避免突然盖住已有内容。${formation}画面形成后的演示停留为 ${s.hold}ms，遮片退场开始 200ms 后播放内容入场。${arrival}${timing}本例完整演示约 ${sequenceDuration(s)}ms。若用于真实加载界面，等待实际字体和图片就绪；资源已就绪时不强制播放，不伪造进度，也不把演示停留当作网络等待。设置资源失败与超时退出，不永久遮挡内容。`
      : `This is an opening demonstration. Fade its cover in over the first 120ms to avoid an abrupt cover. ${formation}Hold the formed image for ${s.hold}ms in the demo. Begin the content entrance 200ms after the cover starts leaving. ${arrival}${timing}The full demo is about ${sequenceDuration(s)}ms. For a real loading screen, wait for actual fonts and images; skip the forced opening when resources are already ready. Do not invent progress or treat the demo hold as network time. Release content on resource failure or timeout. `;
  } else if (s.scene === 'text-swap') {
    scene = zh
      ? `场景为文字切换，只过渡文字，图像和操作控件保持稳定。旧文用 ${sequenceTextExit(s)}ms 退出，新文再用 ${s.duration}ms 进入。${press ? `旧文向左裁走并移动 -${s.offset}px；新文从右侧裁切显现，由 ${s.offset}px 归位。` : `旧文淡出并模糊到 ${s.blur}px；新文由同样的模糊淡入到清晰。`}为两种文本保留足够高度，避免换行变化推动周围布局；切换后只把当前文本提供给辅助技术。`
      : `Animate only the text during a text change; keep the image and controls stable. Exit the old text over ${sequenceTextExit(s)}ms, then enter the new text over ${s.duration}ms. ${press ? `Clip the old text away to the left with a -${s.offset}px translation; reveal the new text from the right as it moves from ${s.offset}px to zero. ` : `Fade the old text out toward ${s.blur}px blur, then fade the new text from the same blur to sharp. `}Reserve enough space for both text lengths to prevent layout shifts, and expose only the current text to assistive technology. `;
  } else if (s.scene === 'scroll') {
    scene = zh
      ? `场景为滚动。内容在约 20% 进入滚动视口时显现一次。${arrival}每段用 ${s.duration}ms，相邻段落延迟 ${s.stagger}ms，最多两段延迟。${press ? '不增加持续视差。' : `图像按滚动进度在 ±${s.distance / 2}px 之间移动，图像容器预留裁切余量，不露出空边。`}使用真正可滚动、可键盘操作的内容区域；滚动更新合并到一帧一次，内容默认可读。`
      : `Reveal each section once when about 20% of it enters the scroll viewport. ${arrival}Use ${s.duration}ms per section and ${s.stagger}ms stagger, capped at two intervals. ${press ? 'Do not add continuous parallax. ' : `Move the image between ±${s.distance / 2}px with scroll progress, reserving crop room so no empty edges appear. `}Use a real, keyboard-accessible scroll region. Batch scroll work to one animation frame; keep content readable by default. `;
  } else {
    scene =
      (zh
        ? '场景为内容入场，首次展示或主动重播时播放一次。'
        : 'Play the content entrance once when shown or explicitly replayed. ') +
      arrival +
      timing;
  }
  return (
    lead +
    scene +
    (zh
      ? `所有归位使用 ${s.easing}。移动端按可用宽度重排，不锁住页面滚动。不要自动循环。暂停时保留当前帧，继续时接着播放；重复点击播放不从头闪回。快速改参先从当前帧平滑归稳，再合并重播。离屏、后台或卸载时取消动画和等待任务。减少动态效果时保留静态内容，文字直接切换。`
      : `Use ${s.easing} for arrivals. Reflow on small screens without locking page scrolling. Do not loop automatically. Pause at the current frame and resume from it; repeated play clicks must not restart a running sequence. Settle smoothly from the current frame before a debounced parameter replay. Cancel animation and pending work offscreen, in a hidden tab or on unmount. With reduced motion, show static content and change text immediately.`)
  );
}
