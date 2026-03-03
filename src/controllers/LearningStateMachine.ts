import { lessonScript } from '../data/scenarios';
import type { LearningPhase } from '../types';

const order: LearningPhase[] = lessonScript.map((s) => s.phase);

export const LearningStateMachine = {
  next(current: LearningPhase): LearningPhase {
    const idx = order.indexOf(current);
    if (idx < 0 || idx === order.length - 1) return 'intro';
    return order[idx + 1];
  },

  getStep(phase: LearningPhase) {
    return lessonScript.find((s) => s.phase === phase) ?? lessonScript[0];
  },
};
