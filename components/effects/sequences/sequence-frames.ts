import type { SequenceSpec } from '@/content/effects/types';
import { sequenceEntryDelay, sequenceTextExit } from '@/content/effects/sequence-timing';

export type SequenceTrack = {
  target: string;
  frames: Keyframe[];
  duration: number;
  delay?: number;
  easing?: string;
};

export function arrivalFrames(spec: SequenceSpec): Keyframe[] {
  return spec.id === 'overprint'
    ? [
        {
          opacity: 0.2,
          transform: `translateY(${spec.distance}px) rotate(${spec.rotation}deg) scale(.98)`,
        },
        { opacity: 1, transform: 'translateY(0) rotate(0) scale(1)' },
      ]
    : [
        {
          opacity: 0,
          filter: `blur(${spec.blur}px)`,
          transform: `translateY(${spec.distance}px) scale(${spec.startScale})`,
        },
        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0) scale(1)' },
      ];
}

export function entranceTracks(spec: SequenceSpec, delay = 0): SequenceTrack[] {
  return [
    { target: 'sheet', frames: arrivalFrames(spec), duration: spec.duration, delay },
    ...['title', 'caption'].map((target, index) => ({
      target,
      frames: [
        { opacity: 0.2, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, clipPath: 'inset(0)' },
      ],
      duration: spec.duration * 0.7,
      delay: delay + index * spec.stagger,
    })),
  ];
}

export function openingTracks(spec: SequenceSpec): SequenceTrack[] {
  const revealAt = spec.formation + spec.hold;
  const total = revealAt + spec.duration;
  const overlay: SequenceTrack = {
    target: 'overlay',
    duration: total,
    easing: 'linear',
    frames: [
      { opacity: 0, clipPath: 'inset(0)', offset: 0 },
      { opacity: 1, clipPath: 'inset(0)', offset: 120 / total },
      { opacity: 1, clipPath: 'inset(0)', offset: revealAt / total, easing: spec.easing },
      {
        opacity: spec.id === 'overprint' ? 1 : 0,
        clipPath: spec.id === 'overprint' ? 'inset(0 0 0 100%)' : 'inset(42% 0 42% 0)',
        offset: 1,
      },
    ],
  };
  const formation: SequenceTrack[] =
    spec.id === 'overprint'
      ? [
          {
            target: 'mark',
            duration: spec.formation,
            frames: [
              { transform: `translate(${spec.offset}px, ${-spec.offset * 0.75}px)` },
              { transform: 'translate(0, 0)' },
            ],
          },
          {
            target: 'registration',
            duration: spec.formation,
            frames: [
              { opacity: 0.9, transform: `translate(${-spec.offset}px, ${spec.offset * 0.75}px)` },
              { opacity: 0, transform: 'translate(0, 0)' },
            ],
          },
        ]
      : [
          {
            target: 'opening-image',
            duration: spec.formation,
            frames: [
              {
                opacity: 0.15,
                filter: `blur(${spec.blur}px) contrast(1.6)`,
                transform: `scale(${spec.startScale})`,
              },
              { opacity: 1, filter: 'blur(0px) contrast(1)', transform: 'scale(1)' },
            ],
          },
          {
            target: 'mark',
            duration: spec.formation,
            frames: [
              { opacity: 0, filter: `blur(${spec.blur}px)` },
              { opacity: 1, filter: 'blur(0px)' },
            ],
          },
        ];
  return [overlay, ...formation, ...entranceTracks(spec, revealAt + sequenceEntryDelay)];
}

export function textTracks(spec: SequenceSpec, alternate: boolean): SequenceTrack[] {
  const exit = sequenceTextExit(spec);
  const from = alternate ? 'primary-text' : 'alternate-text';
  const to = alternate ? 'alternate-text' : 'primary-text';
  const outgoing: Keyframe[] =
    spec.id === 'overprint'
      ? [
          { opacity: 1, clipPath: 'inset(0)', transform: 'translateX(0)' },
          { opacity: 0, clipPath: 'inset(0 100% 0 0)', transform: `translateX(${-spec.offset}px)` },
        ]
      : [
          { opacity: 1, filter: 'blur(0px)' },
          { opacity: 0, filter: `blur(${spec.blur}px)` },
        ];
  const incoming: Keyframe[] =
    spec.id === 'overprint'
      ? [
          { opacity: 0, clipPath: 'inset(0 0 0 100%)', transform: `translateX(${spec.offset}px)` },
          { opacity: 1, clipPath: 'inset(0)', transform: 'translateX(0)' },
        ]
      : [
          { opacity: 0, filter: `blur(${spec.blur}px)` },
          { opacity: 1, filter: 'blur(0px)' },
        ];
  return [
    { target: from, frames: outgoing, duration: exit },
    { target: to, frames: incoming, duration: spec.duration, delay: exit },
  ];
}
