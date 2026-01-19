import React from "react";
import { ThreeDCarousel } from "../home/ThreeDCarousel";
import BlurEffect from "../home/EffectBlurText/BlurEffect";
import { motion } from "framer-motion";

const Frase = () => {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80",
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
