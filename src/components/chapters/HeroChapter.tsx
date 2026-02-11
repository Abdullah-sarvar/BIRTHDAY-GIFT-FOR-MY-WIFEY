import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const HeroChapter = ({ onEnter }: { onEnter: () => void }) => {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    // Trigger global audio unlock event
    window.dispatchEvent(new CustomEvent("unlock-audio"));
    setEntered(true);
    setTimeout(onEnter, 1500);
  };

  return (
    <AnimatePresence>
      {!entered && (
        <motion.section
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Warm glow behind text */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(43 65% 55% / 0.4), transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Name in golden calligraphy */}
          <motion.h1
            className="font-urdu text-5xl md:text-7xl gold-shimmer mb-8 z-10 pt-8 pb-24 leading-[2.2]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          >
            تمہارے نام
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-serif-display text-gold-light/80 text-lg md:text-xl italic max-w-md text-center z-10 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
          >
            "For the most dignified woman my heart has ever known."
          </motion.p>

          {/* Enter button */}
          <motion.button
            onClick={handleEnter}
            className="z-10 px-8 py-3 border-2 border-gold/60 rounded-full font-serif-display text-gold-light tracking-widest text-sm uppercase transition-all duration-500 hover:border-gold hover:bg-gold/10"
            style={{ animation: "pulse-gold 3s ease-in-out infinite" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 4 }}
          >
            Enter the Story
          </motion.button>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default HeroChapter;
