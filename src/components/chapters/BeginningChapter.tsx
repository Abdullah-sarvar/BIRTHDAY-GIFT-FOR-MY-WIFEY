import { motion } from "framer-motion";
import { useState } from "react";

const poeticLines = [
  { urdu: "تمہاری آنکھوں میں سکون ہے", english: "In your eyes, there is peace." },
  { urdu: "تمہاری باتوں میں ادب ہے", english: "In your words, there is grace." },
  { urdu: "تمہارے ہونے میں دعا ہے", english: "In your existence, there is prayer." },
  { urdu: "تمہاری ہنسی میں جنّت ہے", english: "In your laughter, there is paradise." },
  { urdu: "تمہاری خاموشی میں بھی کتاب ہے", english: "Even in your silence, there is a story." },
];

const favouriteThings = [
  "The way you carry yourself with quiet strength.",
  "Your patience — deeper than any ocean I've known.",
  "The softness in your voice when you speak of those you love.",
  "Your eyes that hold entire worlds of unspoken kindness.",
  "The way your faith shines through everything you do.",
];

const BeginningChapter = () => {
  const [revealedCount, setRevealedCount] = useState(0);

  return (
    <section className="relative min-h-screen py-24 px-6 paper-texture overflow-hidden">
      {/* Golden dust particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="golden-dust"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }}
        />
      ))}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Chapter title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-urdu text-4xl md:text-5xl text-emerald mb-3">باب اوّل</h2>
          <p className="font-serif-display text-xl text-brown-ink/70 italic">The Beginning</p>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Poetic lines */}
        <div className="space-y-10 mb-20">
          {poeticLines.map((line, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
            >
              <p className="font-urdu text-2xl md:text-3xl text-emerald/90 mb-2">{line.urdu}</p>
              <p className="font-serif-body text-brown-ink/60 italic text-sm">{line.english}</p>
            </motion.div>
          ))}
        </div>

        {/* Reveal button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-serif-display text-brown-ink/50 text-sm mb-4 tracking-wide uppercase">
            A hidden truth
          </p>
          <button
            onClick={() => setRevealedCount((c) => Math.min(c + 1, favouriteThings.length))}
            className="px-8 py-3 border-2 border-gold/50 rounded-full font-serif-display text-emerald text-sm tracking-wider transition-all duration-500 hover:border-gold hover:bg-gold/5"
            style={{ animation: "pulse-gold 3s ease-in-out infinite" }}
          >
            {revealedCount < favouriteThings.length
              ? "Press to Reveal My Favourite Thing About You"
              : "You've seen them all ✦"}
          </button>

          <div className="mt-8 space-y-4">
            {favouriteThings.slice(0, revealedCount).map((thing, i) => (
              <motion.p
                key={i}
                className="font-serif-body text-brown-ink/80 italic text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
              >
                "{thing}"
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeginningChapter;
