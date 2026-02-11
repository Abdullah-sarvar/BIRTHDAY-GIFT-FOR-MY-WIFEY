import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TillJannahChapter = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(39 45% 96%) 0%, hsl(30 60% 90%) 40%, hsl(35 65% 85%) 70%, hsl(43 50% 80%) 100%)",
      }}
    >
      {/* Soft sunrise glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, hsl(43 65% 55% / 0.4), transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-12"
        >
          <h2 className="font-urdu text-4xl md:text-5xl text-emerald mb-3">آخری باب</h2>
          <p className="font-serif-display text-xl text-brown-ink/70 italic">Till Jannah</p>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Main quote */}
        <motion.p
          className="font-urdu text-3xl md:text-4xl lg:text-5xl text-emerald leading-[2] mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          ہر کہانی کا اختتام نہیں ہوتا، کچھ کہانیاں دعا بن جاتی ہیں
        </motion.p>

        <motion.p
          className="font-serif-body text-brown-ink/50 italic text-sm mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          "Not every story ends. Some become prayers."
        </motion.p>

        <motion.h3
          className="font-serif-display text-2xl md:text-3xl text-emerald mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          Happy Birthday, my honourable queen.
        </motion.h3>

        {!revealed && (
          <motion.button
            onClick={() => setRevealed(true)}
            className="px-10 py-4 border-2 border-gold/60 rounded-full font-serif-display text-emerald tracking-widest text-sm transition-all duration-500 hover:border-gold hover:bg-gold/10"
            style={{ animation: "pulse-gold 3s ease-in-out infinite" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            Will you continue this story with me?
          </motion.button>
        )}

        <AnimatePresence>
          {revealed && (
            <>
              {/* Golden light spread */}
              <motion.div
                className="fixed inset-0 z-40 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                style={{
                  background: "radial-gradient(circle at 50% 50%, hsl(43 65% 55% / 0.15), transparent 70%)",
                }}
              />

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <p className="font-urdu text-3xl md:text-4xl gold-shimmer mb-4">
                  جنّت تک، ان شاء اللہ
                </p>
                <p className="font-serif-display text-gold italic text-xl">
                  Till Jannah, InshaAllah.
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TillJannahChapter;
