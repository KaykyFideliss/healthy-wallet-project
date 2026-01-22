import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ThreeDCarousel({ images }) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const intervalRef = useRef(null);

  const prev = () =>
    setActive((prev) => (prev - 1 + total) % total);

  const next = () =>
    setActive((prev) => (prev + 1) % total);

  const getIndex = (offset) =>
    (active + offset + total) % total;

  /*  AUTOPLAY (5 segundos) */
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [active]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      next();
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  
  /* =========================
     POSIÇÕES FIXAS
  ========================== */
  const positions = [
    { offset: -1, x: "-35%", scale: 0.8, rotateY: 35, opacity: 0.5, z: 5 },
    { offset: 0, x: "0%", scale: 1, rotateY: 0, opacity: 1, z: 10 },
    { offset: 1, x: "35%", scale: 0.8, rotateY: -35, opacity: 0.5, z: 5 },
  ];

  /* =========================
     DRAG / SWIPE
  ========================== */
  const handleDragEnd = (_, info) => {
    if (info.offset.x > 80) {
      prev();
    } else if (info.offset.x < -80) {
      next();
    }
  };

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden perspective-[1200px]"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Botão esquerdo */}
      <button
        onClick={prev}
        className="absolute left-0 mr-32 pr-5 z-20 h-12 w-12 rounded-full shadow flex items-center justify-center"
      >
         <ChevronLeft className="text-white/30 hover:text-white transform duration-300 scale-110" />
      </button>

      {/* Área do carousel */}
      <motion.div
        className="relative w-full max-w-6xl h-[320px] sm:h-[420px] flex items-center justify-center "
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragStart={stopAutoPlay}
        onDragEnd={handleDragEnd}
      >
        {positions.map((pos) => {
          const imageIndex = getIndex(pos.offset);

          return (
            <motion.img
              key={imageIndex}
              src={images[imageIndex]}
              alt=""
              className="absolute rounded-2xl shadow-2xl object-cover cursor-grab active:cursor-grabbing"
              initial={false}
              animate={{
                x: pos.x,
                scale: pos.scale,
                rotateY: pos.rotateY,
                opacity: pos.opacity,
                zIndex: pos.z,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              style={{
                width: "70%",
                height: "100%",
              }}
              onClick={() => setActive(imageIndex)}
            />
          );
        })}
      </motion.div>

      {/* Botão direito */}
      <button
        onClick={next}
        className="absolute right-0 ml-32 pl-5  z-20 h-12 w-12 rounded-full shadow flex items-center justify-center"
      >
        <ChevronRight className="text-white/30 hover:text-white transform duration-300 scale-110" />
      </button>
    </div>
  );
}
