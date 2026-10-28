export const en = {
  meta: {
    title: 'Tomoyo Design | Try an effect. Get the prompt.',
    description:
      'Try UI effects in your browser, then copy a prompt to build them in your project with AI.',
  },
  nav: {
    skip: 'Skip to effects',
    home: 'Tomoyo Design home',
    label: 'Main navigation',
    effects: 'Effects',
    how: 'How it works',
    language: 'Interface language',
    note: ['Preview here.', 'Build in your project.'],
  },
  preview: {
    title: 'Try an effect. Get the prompt.',
    note: 'Three examples you can interact with',
    choose: 'Choose an effect',
    example: 'Example {index} of 3',
    play: 'Play {name} preview',
    caption: ['See how each', 'effect changes', 'the same card.'],
    label: 'Preview /',
    guidance: 'The prompt changes with the effect you choose.',
    imageAlt: 'A blue and cream print of a quiet rocky coastline',
    heading: ['Sit by', 'the sea.'],
    body: 'Find a patch of shade and watch the light on the water. Everything else can wait a few minutes.',
    selected: '{name} selected.',
  },
  effects: {
    'hover-lift': {
      name: 'Hover lift',
      summary:
        'Using your existing stack, lift the card {distance}px on hover and return smoothly.',
      hint: 'Hover, focus, or tap the card.',
    },
    'soft-reveal': {
      name: 'Soft reveal',
      summary: 'Fade the card in and move it up {distance}px over {duration}ms, then let it rest.',
      hint: 'Tap the card or replay the entrance.',
    },
    'frosted-glass': {
      name: 'Frosted glass',
      summary: 'Use a translucent surface with {blur}px backdrop blur. Keep the text crisp.',
      hint: 'Replay to see the surface become glass.',
    },
  },
  prompt: {
    label: 'Copy this prompt',
    read: 'Read the full prompt',
    readEffect: 'Read the full {name} prompt',
    copy: 'Copy prompt',
    copyShort: 'Copy',
    copying: 'Copying…',
    copied: 'Copied',
    copiedStatus: 'Copied the full {name} prompt.',
    replay: 'Replay',
    ready: '{name} prompt',
    intro: 'Copy this description into your AI tool alongside the component you want to change.',
    error:
      'Your browser could not copy the prompt. The text is selected below; copy it using your keyboard or device menu.',
    selectAll: 'Select all text',
    language: 'Prompt language',
    reduced: 'Reduced motion is on. Previews stay still; every prompt includes the same option.',
  },
  categories: {
    label: 'Explore effects',
    try: 'Try {name}',
    note: 'Underlined examples open a preview. The other terms are here for reference.',
    items: [
      {
        title: 'Motion',
        description: ['How elements move', 'and respond to input.'],
        examples: ['Hover lift', 'Soft reveal', 'Fade in', 'Parallax'],
      },
      {
        title: 'Style',
        description: ['How text and elements', 'change their appearance.'],
        examples: ['Underline grow', 'Blur to sharp', 'Scale on hover'],
      },
      {
        title: 'Material',
        description: ['Glass, grain and layers', 'for the surface of an interface.'],
        examples: ['Frosted glass', 'Grain texture', 'Glow', 'Layered cards'],
      },
    ],
  },
  guide: {
    heading: ['Use this effect', 'in your project.'],
    intro:
      'Each preview has a prompt with the behavior and timing written out. Copy it into the AI tool you already use.',
    steps: [
      {
        title: 'Try a preview',
        body: 'Pick an effect, then hover, focus, or tap the card. Use Replay if you want another look.',
      },
      {
        title: 'Copy its prompt',
        body: 'The full prompt includes timing, interaction and accessibility details. You can read it before copying.',
      },
      {
        title: 'Give it to your AI',
        body: 'Paste the prompt alongside the component you want to change. It asks the AI to keep your content and design, then apply the effect.',
      },
    ],
  },
  footer: { note: 'UI effects and prompts.', back: 'Back to the effects' },
};

export type HomeMessages = typeof en;
