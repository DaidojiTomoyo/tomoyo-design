import type { CompositionSpec } from '../types';
import type { PromptLocale } from '@/i18n/config';

export function createCompositionPrompt(t: CompositionSpec, locale: PromptLocale) {
  const zh = locale === 'zh';
  const name =
    t.id === 'editorial'
      ? zh
        ? '杂志编辑风格'
        : 'Editorial style'
      : zh
        ? '便当盒布局'
        : 'Bento grid';
  const intro = zh
    ? `沿用我项目现有的技术栈，实现「${name}」。保留真实内容、品牌配色、链接与语义结构，按下面的参数调整排版；不要复制 Tomoyo 的示例文字或海岸插画，不要引入组件库。`
    : `Build ${name} using my project's existing stack. Keep my real content, brand colors, links and semantic structure, and adjust the composition using the settings below. Do not copy Tomoyo's sample text or coastline artwork, or add a component library.`;
  let description: string;
  if (t.id === 'editorial') {
    const location = {
      'image-left': ['图片在左、正文在右', 'image left, body right'],
      'image-right': ['图片在右、正文在左', 'image right, body left'],
      cover: ['通栏图片在正文上方', 'full-width image above the body'],
    }[t.composition];
    const proportion =
      t.composition === 'cover'
        ? zh
          ? `通栏图片高度为自身宽度的 ${t.imageShare}%，使用 object-fit: cover。`
          : `Set the cover image height to ${t.imageShare}% of its width, using object-fit: cover.`
        : zh
          ? `扣除栏间距后，图片占可用栏宽的 ${t.imageShare}%，正文使用剩余空间。`
          : `After subtracting the column gap, give the image ${t.imageShare}% of the available column width and the body the remainder.`;
    description = zh
      ? `使用有明确标题、导语、图片、图注与正文的 article。编排为${location[0]}，栏间距 ${t.columnGap}px。${proportion}标题选用项目现有的${t.titleFace === 'condensed' ? '压缩展示字体' : '无衬线字体'}，最大字号 ${t.titleSize}px，并以容器宽度的 12% 为流体上限，下限 28px；正文 ${t.bodySize}px，行高 ${t.lineHeight}，最大行长 65ch。标题与页尾分隔线为 ${t.ruleWeight}px，0 表示不绘制。预览容器宽度不超过 480px 时图文改为单列，图片在前、正文在后，不改变 DOM 阅读顺序。`
      : `Use a semantic article with a headline, introduction, image, caption and body. Place ${location[1]}, with a ${t.columnGap}px column gap. ${proportion} Use the project's existing ${t.titleFace === 'condensed' ? 'condensed display' : 'sans-serif'} face for the heading, capped at ${t.titleSize}px and 12% of the container width, with a 28px floor. Body type is ${t.bodySize}px with line-height ${t.lineHeight} and a 65ch maximum measure. Use ${t.ruleWeight}px rules at the title and footer; 0 removes them. At container widths of 480px or less, stack image then body without changing DOM reading order.`;
  } else {
    const columns = t.columns === 'three-columns' ? 3 : 4;
    const arrangement = {
      featured: [
        '主块跨两列两行；最后一个块跨两列，其余块占一格',
        'the lead block spans two columns and two rows; the final block spans two columns; other blocks occupy one cell',
      ],
      balanced: [
        '所有块各占一格，保持相同网格节奏',
        'each block occupies one cell on the same grid',
      ],
      panorama: [
        '主块横跨所有列且占一行，其余块各占一格',
        'the lead block spans every column and one row; other blocks occupy one cell',
      ],
    }[t.arrangement];
    const align = { 'align-start': 'start', 'align-center': 'center', 'align-end': 'end' }[
      t.alignment
    ];
    description = zh
      ? `用 CSS Grid 排列五个有真实内容的块，默认 ${columns} 列，各列 minmax(0, 1fr)，${arrangement[0]}。网格间距 ${t.gap}px、块内留白 ${t.padding}px、圆角 ${t.radius}px，grid-auto-rows: minmax(${t.rowHeight}px, auto)，内容按 align-content: ${align} 对齐。行高是下限，长文撑开行，不截断正文、不用固定高度隐藏内容。容器宽度不超过 520px 时改为两列，主块和末块取消跨列跨行；不超过 340px 时改为单列。不要使用 dense、order 或绝对定位改写阅读顺序。`
      : `Arrange five real content blocks with CSS Grid and ${columns} minmax(0, 1fr) columns: ${arrangement[1]}. Use a ${t.gap}px grid gap, ${t.padding}px inner padding, ${t.radius}px corner radius, grid-auto-rows: minmax(${t.rowHeight}px, auto), and align-content: ${align}. Row height is a minimum: let long content expand rows instead of clipping it. At container widths of 520px or less, use two columns and reset every column/row span. At 340px or less, use one column. Do not reorder reading order with dense packing, order or absolute positioning.`;
  }
  return [
    intro,
    description,
    zh
      ? '这是一种静态排版效果，不自动播放入场动画。图片加载前预留比例，加载失败保留可读文字与替代说明。支持键盘、触屏、200% 缩放和无 JavaScript 阅读；不要在普通内容块上添加按钮语义。若额外添加过渡，尊重 prefers-reduced-motion，关闭位移及渐变，立即显示最终布局。'
      : 'This is a static composition, with no automatic entrance animation. Reserve image aspect ratios before loading; retain readable text and alternatives if an image fails. Support keyboard, touch, 200% zoom and reading without JavaScript. Do not give ordinary content blocks button semantics. Any optional transition must respect prefers-reduced-motion by removing movement and fades and showing the final layout immediately.',
    zh
      ? '实现后列出可调参数，并检查桌面、窄容器、长文案和图片失败时的布局。'
      : 'After implementation, list the adjustable values and verify desktop, narrow containers, long text and failed images.',
  ].join('\n\n');
}
