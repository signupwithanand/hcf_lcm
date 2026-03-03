import { useMemo, useState } from 'react';
import { ControlDeck } from './components/ControlDeck';
import { ExplanationOverlay } from './components/ExplanationOverlay';
import { MasteryBar } from './components/MasteryBar';
import { PrimeVisualizer } from './components/PrimeVisualizer';
import { AnimationController } from './controllers/AnimationController';
import { DifficultyController } from './controllers/DifficultyController';
import { LearningStateMachine } from './controllers/LearningStateMachine';
import { lessonScript } from './data/scenarios';
import { FactorizationEngine } from './engines/FactorizationEngine';
import { HCFEngine } from './engines/HCFEngine';
import { LCMEngine } from './engines/LCMEngine';
import { TrapEngine, type TrapResult } from './engines/TrapEngine';
import { useSoundFeedback } from './hooks/useSoundFeedback';
import type { Difficulty, LearningPhase, PrimeMap } from './types';

function getNumericMaps(a: number, b: number): { mapA: PrimeMap; mapB: PrimeMap } {
  return {
    mapA: FactorizationEngine.factorizeNumber(a),
    mapB: FactorizationEngine.factorizeNumber(b),
  };
}

export default function App() {
  const [mode, setMode] = useState<Difficulty>('standard');
  const [phase, setPhase] = useState<LearningPhase>('intro');
  const [isSlow, setIsSlow] = useState(true);
  const [trapResult, setTrapResult] = useState<TrapResult | null>(null);
  const sound = useSoundFeedback();

  const scenario = DifficultyController.getScenario(mode);
  const pace = AnimationController.getPace(isSlow);

  const maps = useMemo(() => {
    if ('a' in scenario && typeof scenario.a === 'number') {
      return getNumericMaps(scenario.a, scenario.b);
    }
    return { mapA: scenario.a, mapB: scenario.b };
  }, [scenario]);

  const hcfMap = HCFEngine.extractCommon(maps.mapA, maps.mapB);
  const lcmMap = LCMEngine.extractCoverage(maps.mapA, maps.mapB);
  const hcfValue = HCFEngine.multiply(hcfMap);
  const lcmValue = LCMEngine.multiply(lcmMap);

  const currentStep = LearningStateMachine.getStep(phase);
  const phaseIndex = lessonScript.findIndex((s) => s.phase === phase);

  const highlightMode = phase === 'hcf' ? 'hcf' : phase === 'lcm' || phase === 'summary' ? 'lcm' : 'none';

  const onAdvance = () => {
    if (phase === 'factorizeA' || phase === 'factorizeB') sound.split();
    if (phase === 'hcf' || phase === 'lcm') sound.merge();

    const nextPhase = mode === 'standard' && phase === 'lcm' ? 'summary' : LearningStateMachine.next(phase);
    setPhase(nextPhase);
  };

  const onModeChange = (nextMode: Difficulty) => {
    setMode(nextMode);
    setPhase('intro');
    setTrapResult(null);
  };

  const onTrapChoice = (choice: 'hcf' | 'lcm') => {
    const result = TrapEngine.evaluate(mode, choice);
    setTrapResult(result);
    if (!result) return;
    if (result.isCorrect) sound.success();
    else sound.error();
  };

  const explainText =
    phase === 'hcf'
      ? `HCF = ${FactorizationEngine.toExpandedText(hcfMap)} = ${hcfValue}`
      : phase === 'lcm' || phase === 'summary'
        ? `LCM = ${FactorizationEngine.toExpandedText(lcmMap)} = ${lcmValue}`
        : currentStep.narration;

  const trapText = trapResult ? `${trapResult.feedback}` : ('trapPrompt' in scenario ? scenario.trapPrompt : '');

  return (
    <main>
      <header className="hero panel">
        <h1>CBSE Class 10 · HCF & LCM Direct Computation Lab</h1>
        <p>{DifficultyController.getModeLabel(mode)}</p>
        <p className="hint">{scenario.hint}</p>
        <MasteryBar phaseIndex={Math.max(phaseIndex, 0)} total={lessonScript.length} />
      </header>

      <PrimeVisualizer
        title="Number A Prime DNA"
        map={maps.mapA}
        comparatorMap={maps.mapB}
        highlightMode={highlightMode}
        duration={pace.transitionMs}
        stagger={pace.staggerMs}
        variableMap={'variableMap' in scenario ? scenario.variableMap : undefined}
      />

      <PrimeVisualizer
        title="Number B Prime DNA"
        map={maps.mapB}
        comparatorMap={maps.mapA}
        highlightMode={highlightMode}
        duration={pace.transitionMs}
        stagger={pace.staggerMs}
        variableMap={'variableMap' in scenario ? scenario.variableMap : undefined}
      />

      <ControlDeck
        mode={mode}
        isSlow={isSlow}
        onModeChange={onModeChange}
        onToggleSpeed={() => setIsSlow((v) => !v)}
        onNext={onAdvance}
        actionLabel={currentStep.actionLabel}
        onTrapChoice={onTrapChoice}
        showTrapChoices={phase === 'trap' && mode === 'intermediate'}
      />

      <ExplanationOverlay text={phase === 'trap' ? trapText || currentStep.narration : explainText} visible />
    </main>
  );
}
