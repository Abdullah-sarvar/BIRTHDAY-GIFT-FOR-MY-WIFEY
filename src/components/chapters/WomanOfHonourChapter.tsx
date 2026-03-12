import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const tributeLines = [
  "She doesn't demand respect — she inspires it.",
  "Her silence holds more wisdom than a thousand speeches.",
  "She is the kind of woman poets write about but never find.",
  "In her haya, there is a fortress. In her kindness, a kingdom.",
  "She makes the ordinary feel sacred.",
];

const loveNotes = [
  { top: "10%", left: "8%", message: "You are my favourite dua come true." },
  { top: "25%", left: "88%", message: "In every hardship, I find ease thinking of you." },
  { top: "50%", left: "4%", message: "Your smile is my favourite ayah of this life." },
  { top: "65%", left: "92%", message: "I thank Allah for writing you into my story." },
  { top: "85%", left: "15%", message: "You are proof that Allah answers unspoken prayers." },
  { top: "88%", left: "75%", message: "The best part of my day is knowing you exist." },
];

const WomanOfHonourChapter = () => {
  const [revealedNotes, setRevealedNotes] = useState<Set<number>>(new Set());
  const [bloomed, setBloomed] = useState(false);

  const toggleNote = (i: number) => {
    setRevealedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="relative min-h-screen py-24 px-6 paper-texture overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-urdu text-4xl md:text-5xl text-emerald mb-12 shadow-emerald">باب سوم</h2>
          <p className="font-serif-display text-xl text-brown-ink/70 italic shadow-brown">The Woman of Honour</p>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Tribute prose */}
        <div className="space-y-8 mb-20">
          {tributeLines.map((line, i) => (
            <motion.p
              key={i}
              className="font-serif-body text-xl md:text-2xl text-brown-ink/80 text-center leading-relaxed italic shadow-brown"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Blooming rose */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-serif-display text-brown-ink/40 text-sm mb-6 tracking-wide uppercase">
            Touch the rose
          </p>
          <button
            onClick={() => setBloomed(true)}
            className="text-6xl md:text-8xl transition-all duration-1000 inline-block"
            style={{
              transform: bloomed ? "scale(1) rotate(0deg)" : "scale(0.4) rotate(-30deg)",
              opacity: bloomed ? 1 : 0.5,
              filter: bloomed ? "none" : "grayscale(0.5)",
            }}
          >
            🌹
          </button>
          <AnimatePresence>
            {bloomed && (
              <motion.p
                className="font-serif-body text-dusty-rose italic mt-4 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                "Like this rose, your beauty blooms with dignity and grace."
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hidden love notes hint */}
        <motion.p
          className="text-center font-serif-display text-brown-ink/30 text-xs tracking-widest uppercase mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ✦ Find the hidden stars on this page ✦
        </motion.p>
      </div>

      {/* Hidden love note stars */}
      {loveNotes.map((note, i) => (
        <div
          key={i}
          className="absolute z-20 cursor-pointer"
          style={{ top: note.top, left: note.left }}
          onClick={() => toggleNote(i)}
        >
          <span
            className="text-lg md:text-xl select-none"
            style={{ animation: "star-glow 3s ease-in-out infinite", animationDelay: `${i * 0.5}s` }}
          >
            ✦
          </span>
          <AnimatePresence>
            {revealedNotes.has(i) && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-3 bg-cream border border-gold/30 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-serif-body text-brown-ink/80 text-xs italic text-center leading-relaxed shadow-brown">
                  {note.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};

export default WomanOfHonourChapter;
