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
        initial="hidden"
        whileInView="visible"
        exit="exit"
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <BlurEffect />
      </motion.div>

      <div className="w-full max-w-6xl">
        <ThreeDCarousel images={images} />
      </div>


      <div>
      </div>


    </section>
  );
};

export default Frase;
