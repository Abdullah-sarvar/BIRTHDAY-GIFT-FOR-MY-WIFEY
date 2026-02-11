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
                // For mobile: ensure volume is set *after* play attempt or during it
                audio.play()
                    .then(() => {
                        setIsPlaying(true);
                        fadeIn();
                    })
                    .catch((err) => {
                        console.warn("Playback attempt failed:", err);
                    });
            }
        };

        const handleInteraction = (e: Event) => {
            console.log("Unlocking audio via:", e.type);
            // On mobile, sometimes calling load() first helps "prime" the element
            audio.load();
            startPlayback();

            ["click", "scroll", "touchstart", "touchend", "keydown"].forEach(type => {
                document.removeEventListener(type, handleInteraction);
            });
        };

        // Add listeners for any user interaction
        ["click", "scroll", "touchstart", "touchend", "keydown"].forEach(type => {
            document.addEventListener(type, handleInteraction);
        });

        // Try initial autoplay (muted often allows this)
        audio.muted = true;
        audio.play()
            .then(() => {
                console.log("Muted autoplay success");
                // If muted autoplay works, we still want to unmute on interaction
                const unmute = () => {
                    audio.muted = false;
                    fadeIn();
                    ["click", "scroll", "touchstart", "touchend", "keydown"].forEach(type => {
                        document.removeEventListener(type, unmute);
                    });
                };
                ["click", "scroll", "touchstart", "touchend", "keydown"].forEach(type => {
                    document.addEventListener(type, unmute);
                });
            })
            .catch(() => {
                console.log("Muted autoplay blocked, waiting for interaction");
            });

        return () => {
            ["click", "scroll", "touchstart", "touchend", "keydown"].forEach(type => {
                document.removeEventListener(type, handleInteraction);
            });
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
