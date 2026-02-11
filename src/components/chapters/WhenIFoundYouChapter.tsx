import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const memories = [
  { date: "۲۰۲۳", title: "The First Meeting", detail: "Some moments are written by fate before we even know it. That day, destiny smiled." },
  { date: "۲۰۲۳", title: "The First Conversation", detail: "Your words were like poetry I never knew I needed. Every syllable a revelation." },
  { date: "۲۰۲۴", title: "When I Knew", detail: "There was a moment — quiet, unremarkable to the world — when I realized you were the answer to every unspoken prayer." },
  { date: "۲۰۲۴", title: "The Promise", detail: "Not spoken in grand gestures, but whispered in the faithfulness of every small moment shared." },
  { date: "۲۰۲۵", title: "Still Falling", detail: "They say love fades. But ours deepens with every chapter. Like a river finding the sea." },
];

const Petal = ({ delay, left }: { delay: number; left: string }) => (
  <div
    className="absolute text-dusty-rose/40 text-lg pointer-events-none select-none"
    style={{
      left,
      animation: `petal-fall ${8 + Math.random() * 6}s linear ${delay}s infinite`,
      top: "-5vh",
    }}
  >
    ✿
  </div>
);

const WhenIFoundYouChapter = () => {
  const [activeMemory, setActiveMemory] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-24 px-6 paper-texture overflow-hidden">
      {/* Falling petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Petal key={i} delay={i * 2} left={`${10 + i * 10}%`} />
      ))}

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-urdu text-4xl md:text-5xl text-emerald mb-3">باب دوم</h2>
          <p className="font-serif-display text-xl text-brown-ink/70 italic">When I Found You</p>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Manuscript timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gold/30" />

          <div className="space-y-12">
            {memories.map((memory, i) => (
              <motion.div
                key={i}
                className="relative pl-16 md:pl-20 cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                onClick={() => setActiveMemory(activeMemory === i ? null : i)}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full border-2 border-gold/60 bg-cream group-hover:bg-gold/20 transition-colors duration-300" />

                {/* Date */}
                <span className="font-urdu text-gold text-lg">{memory.date}</span>
                <h3 className="font-serif-display text-lg text-emerald mt-1 group-hover:text-emerald/80 transition-colors">
                  {memory.title}
                </h3>

                <AnimatePresence>
                  {activeMemory === i && (
                    <motion.div
                      className="mt-4 p-6 bg-cream/80 rounded-lg border border-gold/20"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="font-serif-body text-brown-ink/70 italic leading-relaxed">
                        {memory.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhenIFoundYouChapter;
