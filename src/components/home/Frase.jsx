import React from "react";
import { ThreeDCarousel } from "../home/ThreeDCarousel";
import BlurEffect from "../home/EffectBlurText/BlurEffect";
import { motion } from "framer-motion";

const Frase = () => {
  // Url das imagens para o carrossel
  const images = [
    "/img/home/Carrossel/papel.png",
    "/img/home/Carrossel/feliz.png",
    "/img/home/Carrossel/duvida.png"
  ];

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-16 py-20 px-5 bg-terciaria overflow-hidden">
      <motion.div
        initial={{ 
          opacity: 0, 
          y: 100, 
          filter: "blur(10px)" 
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)" 
        }}
        exit={{ 
          opacity: 0, 
          y: -100, 
          filter: "blur(10px)" 
        }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        <BlurEffect />
      </motion.div>

      <motion.div
        initial={{ 
          opacity: 0, 
          y: 100, 
          filter: "blur(10px)" 
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)" 
        }}
        exit={{ 
          opacity: 0, 
          y: -100, 
          filter: "blur(10px)" 
        }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2 // delay para o carrossel aparecer depois do texto
        }}
        className="w-full max-w-6xl"
      >
        <ThreeDCarousel images={images} />
      </motion.div>
    </section>
  );
};

export default Frase;