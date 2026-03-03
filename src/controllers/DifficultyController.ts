import { advancedScenario, numericScenarios } from '../data/scenarios';
import type { Difficulty } from '../types';

export const DifficultyController = {
  getScenario(mode: Difficulty) {
    if (mode === 'advanced') return advancedScenario;
    return numericScenarios[mode];
  },

  getModeLabel(mode: Difficulty): string {
    if (mode === 'standard') return 'Standard · direct computation';
    if (mode === 'intermediate') return 'Intermediate · reverse identity + trap';
    return 'Advanced · algebraic towers';
  },
};
