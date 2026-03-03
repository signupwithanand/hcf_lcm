import type { LearningPhase } from '../types';

export interface AnimationPace {
  transitionMs: number;
  staggerMs: number;
}

export const AnimationController = {
  getPace(isSlow: boolean): AnimationPace {
    return isSlow
      ? { transitionMs: 1000, staggerMs: 240 }
      : { transitionMs: 500, staggerMs: 120 };
  },

  shouldShowHighlight(phase: LearningPhase): boolean {
    return phase === 'hcf' || phase === 'lcm' || phase === 'trap';
  },
};
