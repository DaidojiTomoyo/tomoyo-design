import type common from '@/messages/en/common.json';
import type home from '@/messages/en/home.json';
import type catalog from '@/messages/en/catalog.json';
import type detail from '@/messages/en/effect-detail.json';
import type controls from '@/messages/en/controls.json';
import type motion from '@/messages/en/motion-preview.json';

import type composition from '@/messages/en/composition.json';
import type sequence from '@/messages/en/sequence.json';

export type Messages = {
  Sequence: typeof sequence;
  Composition: typeof composition;
  Common: typeof common;
  Home: typeof home;
  Catalog: typeof catalog;
  EffectDetail: typeof detail;
  Controls: typeof controls;
  MotionPreview: typeof motion;
};
export type MessageNamespace = keyof Messages;
