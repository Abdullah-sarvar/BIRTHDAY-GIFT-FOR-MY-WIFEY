import { useState, useRef, useEffect } from "react";
import { Music, Music2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeIntervalRef = useRef<number | null>(null);

    const fadeIn = () => {
        if (!audioRef.current) return;

        let volume = 0;
        audioRef.current.volume = volume;

        // Clear any existing fades
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        fadeIntervalRef.current = window.setInterval(() => {
            if (audioRef.current && volume < 0.5) {
                volume += 0.02; // Slower fade for smoother effect
                audioRef.current.volume = Math.min(volume, 0.5);
            } else {
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
        }, 150);
    };

    useEffect(() => {
        const startPlayback = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        fadeIn();
                    })
                    .catch((err) => console.warn("Playback failed:", err));
            }
        };

        const handleInteraction = () => {
            startPlayback();
            // Clean up listeners immediately after first interaction
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("scroll", handleInteraction);
            document.removeEventListener("touchstart", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
        };

        // Add listeners for any user interaction
        document.addEventListener("click", handleInteraction);
        document.addEventListener("scroll", handleInteraction);
        document.addEventListener("touchstart", handleInteraction);
        document.addEventListener("keydown", handleInteraction);

        // Initial attempt (some browsers might allow it if site was previously interacted with)
        startPlayback();

        return () => {
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("scroll", handleInteraction);
            document.removeEventListener("touchstart", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                // Simple pause, no fade out requested
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((err) => {
                    console.error("Audio playback failed:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <audio
                ref={audioRef}
                src="/song.mp3"
                loop
            />

            <motion.button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-cream/80 backdrop-blur-md border border-gold/30 flex items-center justify-center shadow-lg text-emerald transition-all duration-500 hover:bg-gold/20 hover:border-gold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                title={isPlaying ? "Mute Music" : "Play Music"}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                        >
                            <Music className="w-5 h-5" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="paused"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                        >
                            <Music2 className="w-5 h-5 opacity-40" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated pulse when playing */}
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-gold/40"
                        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                )}
            </motion.button>
        </div>
    );
};

export default AudioPlayer;
