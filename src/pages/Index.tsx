import { useState } from "react";
import { motion } from "framer-motion";
import HeroChapter from "@/components/chapters/HeroChapter";
import BeginningChapter from "@/components/chapters/BeginningChapter";
import WhenIFoundYouChapter from "@/components/chapters/WhenIFoundYouChapter";
import WomanOfHonourChapter from "@/components/chapters/WomanOfHonourChapter";
import PrayerChapter from "@/components/chapters/PrayerChapter";
import TillJannahChapter from "@/components/chapters/TillJannahChapter";

const ChapterDivider = () => (
  <div className="flex items-center justify-center py-16">
    <div className="w-16 h-px bg-gold/30" />
    <span className="mx-4 text-gold/40 text-lg">✦</span>
    <div className="w-16 h-px bg-gold/30" />
  </div>
);

const Index = () => {
  const [entered, setEntered] = useState(false);

  return (
    <main className="bg-background min-h-screen">
      <HeroChapter onEnter={() => setEntered(true)} />

      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <BeginningChapter />
          <ChapterDivider />
          <WhenIFoundYouChapter />
          <ChapterDivider />
          <WomanOfHonourChapter />
          <ChapterDivider />
          <PrayerChapter />
          <ChapterDivider />
          <TillJannahChapter />

          {/* Footer */}
          <div className="py-12 text-center">
            <p className="font-serif-body text-brown-ink/30 text-xs tracking-widest">
              Written with love. Sealed with dua.
            </p>
          </div>
        </motion.div>
      )}
    </main>
  );
};

export default Index;
