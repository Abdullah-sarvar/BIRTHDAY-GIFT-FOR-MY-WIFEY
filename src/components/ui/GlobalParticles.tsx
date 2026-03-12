import { motion } from "framer-motion";

const GlobalParticles = () => {
  // Create a single set of 20 particles that follow the viewport
  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="golden-dust"
          initial={{
            opacity: Math.random() * 0.5 + 0.2,
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          animate={{
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
          }}
        />
      ))}
    </div>
  );
};

export default GlobalParticles;
