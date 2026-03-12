import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EtherealImage from "../ui/EtherealImage";

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


      <div className="max-w-2xl mx-auto relative z-10">
        {/* Chapter title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-urdu text-4xl md:text-5xl text-emerald mb-12 shadow-emerald">باب اوّل</h2>
          <p className="font-serif-display text-xl text-brown-ink/70 italic shadow-brown">The Beginning</p>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Poetic lines and Images */}
        <div className="space-y-24 mb-32 relative">
          {poeticLines.map((line, i) => (
            <motion.div
              key={i}
              className="text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
            >
              <p className="font-urdu text-2xl md:text-3xl text-emerald/90 mb-6 drop-shadow-sm text-readable shadow-emerald">{line.urdu}</p>
              <p className="font-serif-body text-brown-ink/80 italic text-sm text-readable shadow-brown">{line.english}</p>
            </motion.div>
          ))}
          {/* Ethereal background fading images */}
          <div className="absolute inset-0 pointer-events-none -translate-y-12">
             <EtherealImage
               src="/images/1.jpeg"
               alt="A beautiful memory"
               className="w-64 md:w-80 absolute -left-12 md:-left-32 top-[10%] opacity-20 mix-blend-multiply"
               delay={0.5}
             />
             <EtherealImage
               src="/images/2.jpeg"
               alt="Another beautiful memory"
               className="w-56 md:w-72 absolute -right-32 md:-right-80 top-[45%] opacity-30 mix-blend-multiply"
               delay={1}
             />
          </div>
        </div>

        {/* Reveal button */}
        <motion.div
          className="text-center relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-serif-display text-brown-ink/50 text-sm mb-4 tracking-wide uppercase relative z-10">
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

          <div className="mt-8 space-y-4 relative z-10">
            {favouriteThings.slice(0, revealedCount).map((thing, i) => (
              <motion.p
                key={i}
                className="font-serif-body text-brown-ink/80 italic text-lg leading-relaxed text-readable shadow-brown"
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
              >
                "{thing}"
              </motion.p>
            ))}
          </div>

          {/* Image 3 now sits at the very end of the chapter as a final visual flourish */}
          <AnimatePresence>
            {revealedCount >= favouriteThings.length && (
              <motion.div 
                className="mt-16 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <EtherealImage
                  src="/images/3.jpeg"
                  alt="A final memory"
                  className="w-full max-w-md opacity-60"
                  delay={0.5}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BeginningChapter;
