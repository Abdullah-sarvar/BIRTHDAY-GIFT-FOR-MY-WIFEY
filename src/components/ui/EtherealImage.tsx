import { motion } from "framer-motion";

interface EtherealImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

const EtherealImage = ({ src, alt, className = "", delay = 0 }: EtherealImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className={`relative overflow-hidden ${className}`}
      style={{
        willChange: "opacity, transform",
        // Use an elliptical radial gradient mask so it adapts to the image's aspect ratio
        maskImage: "radial-gradient(ellipse at center, black 15%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 15%, transparent 70%)",
      }}
    >
      <div className="absolute inset-0 bg-gold/20 mix-blend-overlay z-10 pointer-events-none" />
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover sepia-[0.3] hover:sepia-0 transition-all duration-1000"
      />
    </motion.div>
  );
};

export default EtherealImage;
