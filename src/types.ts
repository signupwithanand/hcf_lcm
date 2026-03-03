export type Difficulty = 'standard' | 'intermediate' | 'advanced';

export type LearningPhase =
  | 'intro'
  | 'factorizeA'
  | 'factorizeB'
  | 'predict'
  | 'hcf'
  | 'lcm'
  | 'trap'
  | 'summary';

export type Prime = 2 | 3 | 5 | 7 | 11 | 13;

export type PrimeMap = Partial<Record<Prime, number>>;

export interface NumericProblem {
  id: string;
  title: string;
  a: number;
  b: number;
  hint: string;
  trapPrompt?: string;
  product?: number;
  knownHcf?: number;
}

export interface AlgebraicProblem {
  id: string;
  title: string;
  a: PrimeMap;
  b: PrimeMap;
  variableMap: Record<Prime, 'x' | 'y'>;
  hint: string;
}

export interface LessonStep {
  phase: LearningPhase;
  narration: string;
  actionLabel: string;
}
