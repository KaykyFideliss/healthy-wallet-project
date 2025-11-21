"use client";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({ className, delay = 0, width = 400, height = 100, rotate = 0, gradient = "from-white/[0.08]" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ 
        duration: 1.8,
        delay, 
        ease: [0.23, 0.86, 0.39, 0.96], 
        opacity: { duration: 1.0 } 
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }} // Movimento vertical contínuo
        transition={{ 
          duration: 16, // Velocidade do movimento
          repeat: Infinity, 
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
            "backdrop-blur-[1px] border border-white/[0.1]",
            "shadow-[0_4px_24px_0_rgba(255,255,255,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroGeometricPlano({
  title1 = "",
  title2 = "",
  description = "",
  className,
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 100 }, // Começa 100px mais abaixo
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, // Duração um pouco maior para suavidade
        delay: 0.2 + i * 0.1, // Delay ajustado
        ease: [0.25, 0.4, 0.25, 1] 
      } 
    }),
  };

  // Variante para o container principal - movimento de baixo
  const containerVariants = {
    hidden: { opacity: 0, y: 80 }, // Container começa mais abaixo
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.4, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Ativa quando 50px entra na tela
      variants={containerVariants}
      className={cn("relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] via-transparent to-yellow-500/[0.03] blur-2xl" />
      
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape 
          delay={0.2} 
          width={600} 
          height={140} 
          rotate={12} 
          gradient="from-green-400/[0.12]" 
          className="left-[-10%] top-[5%] md:left-[-5%] md:top-[20%]" 
        />

        <ElegantShape 
          delay={0.2} 
          width={600} 
          height={140} 
          rotate={-20} 
          gradient="from-green-400/[0.12]" 
          className=" right-[-5%] top-[10%] md:right-[0%] md:top-[80%]" 
        />

        <ElegantShape 
          delay={0.2} 
          width={600} 
          height={140} 
          rotate={-15} 
          gradient="from-yellow-400/[0.12]" 
          className="left-[-10%] bottom-[5%] md:right-[-5%] md:top-[75%]" 
        />

        <ElegantShape 
          delay={0.2} 
          width={600} 
          height={140}
          rotate={-20} 
          gradient="from-yellow-500/[0.1]" 
          className="right-[5%] bottom-[%] md:right-[0%] md:top-[15%]" 
        />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 md:px-6"
        variants={fadeUpVariants}
        custom={0}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={1}
            variants={fadeUpVariants}
          >
          </motion.div>
        </div>  
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/60 pointer-events-none" />
    </motion.div>
  );
}