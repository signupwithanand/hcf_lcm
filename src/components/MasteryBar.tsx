interface MasteryBarProps {
  phaseIndex: number;
  total: number;
}

export function MasteryBar({ phaseIndex, total }: MasteryBarProps) {
  const progress = Math.min(100, Math.round((phaseIndex / (total - 1)) * 100));
  return (
    <div className="mastery-wrap" aria-label="Mastery progress">
      <div className="mastery-fill" style={{ width: `${progress}%` }} />
      <span>Mastery {progress}%</span>
    </div>
  );
}
