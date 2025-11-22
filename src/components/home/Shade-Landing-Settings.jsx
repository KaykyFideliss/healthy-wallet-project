"use client";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({ className, delay = 0, width = 400, height = 100, rotate = 0, gradient = "from-white/[0.08]" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ 
        duration: 1.8, // Reduzido de 2.4
        delay, 
        ease: [0.23, 0.86, 0.39, 0.96], 
        opacity: { duration: 1.0 } // Reduzido de 1.2
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }} // Reduzido de 15 para 10
        transition={{ 
          duration: 16, // Aumentado de 12 para 16 (mais lento = menos processamento)
          repeat: Number.POSITIVE_INFINITY, 
          ease: "easeInOut" 
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[1px] border border-white/[0.1]", // Reduzido blur e border
            "shadow-[0_4px_24px_0_rgba(255,255,255,0.08)]", // Sombra mais leve
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]" // Efeito mais suave
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroGeometricSettings({
  title1 = "BEM-VINDO AO",
  title2 = "",
  description = "Sua plataforma completa para gestão financeira inteligente e controle total do seu dinheiro.",
  className,
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduzido de 30 para 20
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, // Reduzido de 1
        delay: 0.3 + i * 0.15, // Delay reduzido
        ease: [0.25, 0.4, 0.25, 1] 
      } 
    }),
  };

  return (
    <div className={cn("relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]", className)}>
      {/* Background gradient simplificado */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] via-transparent to-yellow-500/[0.03] blur-2xl" />
      
      <div className="absolute inset-0 overflow-hidden">
        {/* Reduzi o número de formas de 5 para 4 e simplifiquei os delays */}
        <ElegantShape 
          delay={0.2} 
          width={600} 
          height={140} 
          rotate={12} 
          gradient="from-green-400/[0.12]" 
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" 
        />
        <ElegantShape 
          delay={0.3} 
          width={500} 
          height={120} 
          rotate={-15} 
          gradient="from-yellow-400/[0.12]" 
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" 
        />
        <ElegantShape 
          delay={0.4} 
          width={300} 
          height={80} 
          rotate={-8} 
          gradient="from-yellow-300/[0.1]" 
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" 
        />
        <ElegantShape 
          delay={0.5} 
          width={200} 
          height={60} 
          rotate={20} 
          gradient="from-green-500/[0.1]" 
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" 
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent font-zalando bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span className={cn("bg-clip-text text-6xl sm:text-8xl md:text-9xl text-transparent font-zalando bg-gradient-to-r from-primaria via-primaria/90 to-primaria/95")}>
                {title2}
              </span>
            </h1>
          </motion.div>
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-xs sm:text-lg md:text-base font-zalando text-white/70 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {description}
            </p>
          </motion.div>
        </div>  
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/60 pointer-events-none" />
    </div>
  );
}