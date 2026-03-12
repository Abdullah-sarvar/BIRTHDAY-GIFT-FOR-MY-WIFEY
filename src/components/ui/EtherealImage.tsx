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
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay }}
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{
        // Use a radial gradient mask to fade the edges out completely
        maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
      }}
    >
      <div className="absolute inset-0 bg-gold/20 mix-blend-overlay z-10 pointer-events-none" />
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover sepia-[0.3] hover:sepia-0 transition-all duration-1000"
      />
    </motion.div>
  );
};

export default EtherealImage;
