import { motion } from 'framer-motion';
import type { PrimeMap } from '../types';
import { PrimeBlock } from './PrimeBlock';

interface PrimeVisualizerProps {
  title: string;
  map: PrimeMap;
  highlightMode: 'none' | 'hcf' | 'lcm';
  comparatorMap?: PrimeMap;
  duration: number;
  stagger: number;
  variableMap?: Record<number, string>;
}

const orderedPrimes = [2, 3, 5, 7, 11, 13] as const;

export function PrimeVisualizer({ title, map, highlightMode, comparatorMap, duration, stagger, variableMap }: PrimeVisualizerProps) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      <div className="tower-row">
        {orderedPrimes.map((prime, idx) => {
          const height = map[prime] ?? 0;
          if (!height) return null;

          const otherHeight = comparatorMap?.[prime] ?? 0;
          const overlap = Math.min(height, otherHeight);
          const coverage = Math.max(height, otherHeight);

          return (
            <div className="tower" key={prime}>
              {[...Array(height)].map((_, layer) => {
                const shouldGlow =
                  highlightMode === 'hcf'
                    ? layer < overlap
                    : highlightMode === 'lcm'
                      ? layer < coverage
                      : false;

                return (
                  <div key={`${prime}-${layer}`} title={`Exponent layer ${layer + 1}`}>
                    <PrimeBlock
                      label={variableMap?.[prime] ?? String(prime)}
                      glow={shouldGlow}
                      delay={idx * stagger * 0.001 + layer * 0.03}
                      duration={duration * 0.001}
                    />
                  </div>
                );
              })}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + idx * 0.05 }}>
                {variableMap?.[prime] ? `${variableMap[prime]}^${height}` : `${prime}^${height}`}
              </motion.p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
