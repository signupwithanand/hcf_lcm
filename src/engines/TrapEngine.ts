import type { Difficulty } from '../types';

export interface TrapResult {
  prompt: string;
  learnerChoice: 'hcf' | 'lcm';
  isCorrect: boolean;
  feedback: string;
}

export const TrapEngine = {
  evaluate(mode: Difficulty, learnerChoice: 'hcf' | 'lcm'): TrapResult | null {
    if (mode !== 'intermediate') return null;

    const isCorrect = learnerChoice === 'lcm';
    return {
      prompt: 'In reverse identity, which value must be larger or equal to both inputs?',
      learnerChoice,
      isCorrect,
      feedback: isCorrect
        ? 'Correct. LCM must cover all prime towers from both numbers.'
        : 'Not yet. HCF is overlap (minimum), so it cannot exceed both numbers.',
    };
  },
};
