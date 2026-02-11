import { motion } from "framer-motion";
import { useState } from "react";

const duas = [
  { urdu: "اے اللہ، اسے ہمیشہ خوش رکھ", english: "O Allah, keep her always happy." },
  { urdu: "اسے وہ سب دے جو اس کا دل چاہے", english: "Grant her all that her heart desires." },
  { urdu: "اس کی ہر مشکل آسان فرما", english: "Ease every hardship she faces." },
  { urdu: "اسے صحت، سکون اور برکت عطا فرما", english: "Bless her with health, peace, and barakah." },
  { urdu: "ہمارا رشتہ جنّت تک پہنچا", english: "Let our bond reach all the way to Jannah." },
  { urdu: "آمین، یا ربّ العالمین", english: "Ameen, O Lord of all the worlds." },
];

const PrayerChapter = () => {
  const [revealedCount, setRevealedCount] = useState(0);

  return (
    <section className="relative min-h-screen py-24 px-6 paper-texture overflow-hidden">
      {/* Ink-wash background overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, hsl(25 20% 35% / 0.3), transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-urdu text-4xl md:text-5xl text-emerald mb-3">باب چہارم</h2>
          <p className="font-serif-display text-xl text-brown-ink/70 italic">A Prayer for You</p>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Prayer page - slightly tilted */}
        <motion.div
          className="bg-cream/60 border border-gold/20 rounded-lg p-8 md:p-12 max-w-lg mx-auto"
          style={{ transform: "rotate(-1deg)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-urdu text-2xl text-emerald text-center mb-8">🤲</p>

          <div className="space-y-6 mb-8">
            {duas.slice(0, revealedCount).map((dua, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-urdu text-xl md:text-2xl text-emerald/90 mb-1">{dua.urdu}</p>
                <p className="font-serif-body text-brown-ink/50 italic text-xs">{dua.english}</p>
              </motion.div>
            ))}
          </div>

          {revealedCount < duas.length && (
            <div className="text-center">
              <button
                onClick={() => setRevealedCount((c) => c + 1)}
                className="px-6 py-2 border border-gold/40 rounded-full font-serif-display text-emerald text-xs tracking-wider transition-all duration-500 hover:border-gold hover:bg-gold/5"
              >
                Reveal next dua ✦
              </button>
            </div>
          )}

          {revealedCount >= duas.length && (
            <motion.p
              className="text-center font-serif-body text-gold italic text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Every prayer, for you. Always.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PrayerChapter;
