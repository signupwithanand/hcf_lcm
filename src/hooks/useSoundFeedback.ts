import { useCallback, useRef } from 'react';

export function useSoundFeedback() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const beep = useCallback((frequency: number, duration = 0.08) => {
    const AudioClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioClass) return;

    if (!audioCtxRef.current) audioCtxRef.current = new AudioClass();
    const ctx = audioCtxRef.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.value = 0.04;

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, []);

  return {
    split: () => beep(520),
    merge: () => beep(410),
    success: () => beep(660, 0.12),
    error: () => beep(220, 0.12),
  };
}
