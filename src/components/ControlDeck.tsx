import type { Difficulty } from '../types';

interface ControlDeckProps {
  mode: Difficulty;
  isSlow: boolean;
  onModeChange: (mode: Difficulty) => void;
  onToggleSpeed: () => void;
  onNext: () => void;
  actionLabel: string;
  onTrapChoice: (choice: 'hcf' | 'lcm') => void;
  showTrapChoices: boolean;
}

export function ControlDeck({
  mode,
  isSlow,
  onModeChange,
  onToggleSpeed,
  onNext,
  actionLabel,
  onTrapChoice,
  showTrapChoices,
}: ControlDeckProps) {
  return (
    <section className="controls panel">
      <div className="mode-switch">
        {(['standard', 'intermediate', 'advanced'] as const).map((item) => (
          <button key={item} onClick={() => onModeChange(item)} className={mode === item ? 'active' : ''}>
            {item}
          </button>
        ))}
      </div>
      <button onClick={onToggleSpeed}>Mode: {isSlow ? 'Slow' : 'Fast'}</button>
      <button onClick={onNext}>{actionLabel}</button>
      {showTrapChoices && (
        <div className="trap-row">
          <button onClick={() => onTrapChoice('hcf')}>Choose HCF</button>
          <button onClick={() => onTrapChoice('lcm')}>Choose LCM</button>
        </div>
      )}
    </section>
  );
}
