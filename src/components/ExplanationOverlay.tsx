import { AnimatePresence, motion } from 'framer-motion';

interface ExplanationOverlayProps {
  text: string;
  visible: boolean;
}

export function ExplanationOverlay({ text, visible }: ExplanationOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="overlay"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
        >
          <p>{text}</p>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
