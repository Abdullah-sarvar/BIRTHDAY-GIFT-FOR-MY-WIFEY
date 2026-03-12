import { motion } from "framer-motion";

interface PolaroidPhotoProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  delay?: number;
  className?: string;
}

const PolaroidPhoto = ({
  src,
  alt,
  caption,
  rotation = 0,
  delay = 0,
  className = "",
}: PolaroidPhotoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{ y: -10, rotate: rotation > 0 ? rotation + 2 : rotation - 2, scale: 1.05 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay }}
      className={`bg-cream p-3 pb-12 sm:p-4 sm:pb-16 shadow-xl rounded-sm absolute ${className}`}
      style={{
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      }}
    >
      <div className="relative w-full overflow-hidden mb-4 border border-gold/10 pointer-events-none">
        <div className="absolute inset-0 bg-brown-ink/5 mix-blend-overlay z-10" />
        <img src={src} alt={alt} className="w-full h-auto object-cover sepia-[0.2]" />
      </div>
      {caption && (
        <p className="font-serif-body text-center text-brown-ink/80 text-sm sm:text-base italic absolute bottom-4 sm:bottom-6 inset-x-0 px-2 pointer-events-none">
          {caption}
        </p>
      )}
    </motion.div>
  );
};

export default PolaroidPhoto;
