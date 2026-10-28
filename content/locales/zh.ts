import type { HomeMessages } from './en';

export const zh: HomeMessages = {
  meta: {
    title: 'Tomoyo Design | 试试效果，再复制提示词。',
    description: '在浏览器里试用界面效果，再复制提示词，让 AI 帮你用到自己的项目中。',
  },
  nav: {
    skip: '跳转到效果预览',
    home: 'Tomoyo Design 首页',
    label: '主导航',
    effects: '效果预览',
    how: '如何使用',
    language: '界面语言',
    note: ['在这里试效果，', '在你的项目里用。'],
  },
  preview: {
    title: '试试效果，再复制提示词。',
    note: '三个可以直接操作的示例',
    choose: '选择一个效果',
    example: '第 {index} 个示例，共 3 个',
    play: '播放「{name}」预览',
    caption: ['同一张卡片，', '换个效果看看。'],
    label: '效果预览 /',
    guidance: '选好效果，下方就是对应的提示词。',
    imageAlt: '蓝色与奶油色套印的静谧岩石海岸',
    heading: ['在海边，', '坐一会儿。'],
    body: '找一处树荫，看看海面上的光。今天的事，待会儿再想。',
    selected: '已选择「{name}」。',
  },
  effects: {
    'hover-lift': {
      name: '悬浮抬升',
      summary: '沿用现有技术栈，让卡片在悬停时上移 {distance}px，移开后平滑归位。',
      hint: '把鼠标移到卡片上，也可以用键盘聚焦或轻点卡片。',
    },
    'soft-reveal': {
      name: '柔和渐显',
      summary: '让卡片在 {duration}ms 内渐显并上移 {distance}px，然后停留。',
      hint: '点一下卡片，或用重播再看一次。',
    },
    'frosted-glass': {
      name: '磨砂玻璃',
      summary: '以半透明表面和 {blur}px 背景模糊呈现玻璃质感，保持文字清晰。',
      hint: '点重播，看看卡片怎样变成玻璃。',
    },
  },
  prompt: {
    label: '对应的提示词',
    read: '查看完整提示词',
    readEffect: '查看「{name}」的完整提示词',
    copy: '复制提示词',
    copyShort: '复制',
    copying: '复制中…',
    copied: '已复制',
    copiedStatus: '已复制「{name}」的完整提示词。',
    replay: '重播',
    ready: '「{name}」的提示词',
    intro: '复制这段文字，和你想改的组件一起发给 AI。',
    error: '浏览器没能复制成功。下方已选中全文，你可以用快捷键或长按菜单复制。',
    selectAll: '选中全部文字',
    language: '提示词语言',
    reduced: '你的设备开启了减少动态效果，预览会保持静止。提示词也写了这项适配要求。',
  },
  categories: {
    label: '探索界面效果',
    try: '体验「{name}」',
    note: '带下划线的示例可以点开体验，其他词条暂时供参考。',
    items: [
      {
        title: '动效',
        description: ['元素如何移动，', '如何回应你的操作。'],
        examples: ['悬浮抬升', '柔和渐显', '淡入', '视差'],
      },
      {
        title: '风格',
        description: ['文字和元素', '怎样改变外观。'],
        examples: ['下划线延展', '由虚到实', '悬停缩放'],
      },
      {
        title: '材质',
        description: ['用玻璃、颗粒和叠层，', '改变表面的质感。'],
        examples: ['磨砂玻璃', '颗粒纹理', '光晕', '层叠卡片'],
      },
    ],
  },
  guide: {
    heading: ['把这个效果', '用到你的项目里。'],
    intro:
      '每个示例都有对应的提示词，写好了效果怎么动、用多长时间。复制后交给你常用的 AI，就可以开始修改。',
    steps: [
      {
        title: '先试试看',
        body: '选一个效果，把鼠标移到卡片上，或用键盘、触屏操作。没看清可以点重播。',
      },
      {
        title: '复制提示词',
        body: '里面写了时长、交互方式和无障碍要求。复制前也可以展开全文看一遍。',
      },
      {
        title: '发给你常用的 AI',
        body: '把提示词和要修改的组件一起发过去。提示词会要求 AI 保留你的内容和设计，再加上这个效果。',
      },
    ],
  },
  footer: { note: '界面效果与 AI 提示词。', back: '回到效果预览' },
};
