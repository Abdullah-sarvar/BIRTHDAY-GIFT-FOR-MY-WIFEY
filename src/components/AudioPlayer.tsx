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

        const handleInteraction = (e: Event) => {
            console.log("User interaction detected:", e.type);
            startPlayback();
            // Clean up listeners immediately after first successful interaction
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("scroll", handleInteraction);
            document.removeEventListener("touchstart", handleInteraction);
            document.removeEventListener("touchend", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
        };

        // Add listeners for any user interaction
        document.addEventListener("click", handleInteraction);
        document.addEventListener("scroll", handleInteraction);
        document.addEventListener("touchstart", handleInteraction);
        document.addEventListener("touchend", handleInteraction);
        document.addEventListener("keydown", handleInteraction);

        // Initial attempt (some browsers might allow it if site was previously interacted with)
        startPlayback();

        return () => {
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("scroll", handleInteraction);
            document.removeEventListener("touchstart", handleInteraction);
            document.removeEventListener("touchend", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
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
