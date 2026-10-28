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

export const easingValues = {
  out: motionTokens.easing,
  'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  linear: 'linear',
};
export const tintValues = { paper: '247, 232, 216', cool: '223, 237, 248', rose: '250, 224, 217' };
