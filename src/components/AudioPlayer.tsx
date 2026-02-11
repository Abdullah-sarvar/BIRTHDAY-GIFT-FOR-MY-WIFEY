import { useState, useRef, useEffect } from "react";

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
        const audio = audioRef.current;
        if (!audio) return;

        const startPlayback = () => {
            if (audio.paused) {
                audio.play()
                    .then(() => {
                        setIsPlaying(true);
                        fadeIn();
                    })
                    .catch((err) => console.warn("Playback blocked:", err));
            }
        };

        const stopPlayback = () => {
            if (!audio.paused) {
                fadeOut();
            }
        };

        const handleInteraction = () => {
            startPlayback();
            cleanupInteractionListeners(); // Only clean up interaction listeners
        };

        const cleanupInteractionListeners = () => {
            ["click", "scroll", "touchstart", "touchend", "keydown"].forEach(type => {
                document.removeEventListener(type, handleInteraction);
            });
            window.removeEventListener("unlock-audio", handleInteraction);
        };

        const cleanup = () => {
            cleanupInteractionListeners();
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            // @ts-ignore
            delete window.playMusic;
            // @ts-ignore
            delete window.pauseMusic;
        };

        // Expose to window for direct, synchronous calling from other components
        // @ts-ignore
        window.playMusic = () => {
            console.log("Global playMusic called");
            startPlayback();
            cleanupInteractionListeners(); // Clean up interaction listeners once played via global function
        };

        // @ts-ignore
        window.pauseMusic = () => {
            console.log("Global pauseMusic called");
            stopPlayback();
        };

        // Broad interaction listeners as fallback
        ["click", "scroll", "touchstart", "touchend", "keydown"].forEach(type => {
            document.addEventListener(type, handleInteraction);
        });

        // Explicit custom event for the Enter button
        window.addEventListener("unlock-audio", handleInteraction);

        // Initial attempt
        startPlayback();

        return () => {
            cleanup();
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().then(() => {
                    fadeIn();
                }).catch((err) => {
                    console.error("Audio playback failed:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleEnded = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().then(() => {
                fadeIn();
            }).catch((err) => console.warn("Loop playback failed:", err));
        }
    };

    return (
        <div className="sr-only">
            <audio
                ref={audioRef}
                src="/song.mp3"
                onEnded={handleEnded}
            />
        </div>
    );
};

export default AudioPlayer;
