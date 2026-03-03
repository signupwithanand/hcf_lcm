import { motion } from 'framer-motion';

interface PrimeBlockProps {
  label: string;
  glow: boolean;
  delay: number;
  duration: number;
}

export function PrimeBlock({ label, glow, delay, duration }: PrimeBlockProps) {
  return (
    <motion.svg
      viewBox="0 0 88 88"
      className="prime-cube"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration }}
      whileHover={{ scale: 1.06 }}
      role="img"
      aria-label={`Prime block ${label}`}
    >
      <defs>
        <linearGradient id={`front-${label}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#83d8ff" />
          <stop offset="100%" stopColor="#2f6bff" />
        </linearGradient>
      </defs>
      <rect x="12" y="16" width="64" height="56" rx="14" fill={`url(#front-${label})`} className={glow ? 'cube-glow' : ''} />
      <text x="44" y="50" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="24" fontWeight="700">
        {label}
      </text>
    </motion.svg>
  );
}
