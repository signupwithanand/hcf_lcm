import type { AlgebraicProblem, Difficulty, LessonStep, NumericProblem } from '../types';

export const numericScenarios: Record<Exclude<Difficulty, 'advanced'>, NumericProblem> = {
  standard: {
    id: 'std-126-84',
    title: 'Standard: Direct Computation',
    a: 126,
    b: 84,
    hint: 'Break each number into prime DNA blocks. Then compare stack heights.',
  },
  intermediate: {
    id: 'int-reverse-432',
    title: 'Intermediate: Reverse Identity',
    a: 54,
    b: 72,
    product: 3888,
    knownHcf: 18,
    hint: 'Use a × b = HCF × LCM after validating prime structure first.',
    trapPrompt: 'Some students mistakenly pick 18 as LCM. Is that possible if LCM must cover both numbers?'
  },
};

export const advancedScenario: AlgebraicProblem = {
  id: 'adv-x3y2-xy3',
  title: 'Advanced: Literal Prime Towers',
  a: { 2: 3, 3: 2 },
  b: { 2: 1, 3: 3 },
  variableMap: { 2: 'x', 3: 'y' },
  hint: 'Treat x and y exponents exactly like prime stack heights.',
};

export const lessonScript: LessonStep[] = [
  { phase: 'intro', narration: 'Today we reveal number structure, not shortcuts.', actionLabel: 'Start mission' },
  { phase: 'factorizeA', narration: 'Tap to split Number A into glowing prime blocks.', actionLabel: 'Factorize A' },
  { phase: 'factorizeB', narration: 'Now split Number B with the same rules.', actionLabel: 'Factorize B' },
  { phase: 'predict', narration: 'Predict the overlap and maximum coverage before reveal.', actionLabel: 'Reveal logic' },
  { phase: 'hcf', narration: 'HCF chooses minimum stack height for every shared prime.', actionLabel: 'Show HCF extraction' },
  { phase: 'lcm', narration: 'LCM chooses maximum stack height to cover both numbers.', actionLabel: 'Show LCM skyline' },
  { phase: 'trap', narration: 'Check misconception trap and correct reasoning visually.', actionLabel: 'Resolve trap' },
  { phase: 'summary', narration: 'You solved through structure. That is true mastery.', actionLabel: 'Restart' },
];
