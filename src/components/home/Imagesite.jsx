import React from 'react'
import { FaWallet } from "react-icons/fa"
import { MdScreenshotMonitor, MdOutlineInsights } from "react-icons/md"
import { motion } from "framer-motion"

/* =====================
   VARIANTS
===================== */

const imageVariant = {
  hidden: {
    opacity: 0,
    x: -80,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -80,
    filter: "blur(12px)",
    transition: {
      duration: 0.6,
      ease: "easeIn"
    }
  }
}

const textVariant = {
  hidden: {
    opacity: 0,
    x: 80,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: "easeOut",
      staggerChildren: 0.15
    }
  },
  exit: {
    opacity: 0,
    x: 80,
    filter: "blur(12px)",
    transition: {
      duration: 0.6,
      ease: "easeIn"
    }
  }
}

const itemFade = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const Imagesite = () => {
  return (
    <section className="min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-4 px-6 py-10 mt-8 rounded-lg shadow-md mx-auto">

     
      <motion.div
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full lg:w-1/2 items-center flex justify-center"
      >
        <img
          src="/img/home/pessoa-confusa.png"
          alt="Pessoa confusa com finanças"
          className="rounded-3xl w-full max-w-sm lg:max-w-lg"
        />
      </motion.div>

      {/* =====================
          TEXTO (DIREITA)
      ===================== */}
      <motion.div
        variants={textVariant}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col justify-left w-full lg:w-1/2 max-w-lg lg:mr-52 gap-2 text-center lg:text-left"
      >

        {/* Badge */}
        <motion.div variants={itemFade} className="flex items-end justify-center lg:justify-start mb-2">
          <div className="flex items-center justify-center h-1 border-primaria border-2 rounded-3xl p-2 w-fit">
            <div className="pr-3">
              <p className="bg-secundaria animate-pulse rounded-full w-2 h-2"></p>
            </div>
            <p className="text-[10px] text-white font-zalando uppercase">
              Por que nos escolher?
            </p>
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          variants={itemFade}
          className="text-white font-zalando text-2xl lg:text-3xl leading-snug"
        >
          Por que escolher o{" "}
          <span className="font-bold text-primaria">Healthy Wallet</span>?
        </motion.h1>

        {/* Benefícios */}
        <div className="flex flex-col gap-4 mt-4">

          {/* Item 1 */}
          <motion.div variants={itemFade} className="flex items-center gap-4 lg:gap-6 p-3 lg:p-4 rounded-xl justify-center lg:justify-start">
            <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-primaria rounded-full flex-shrink-0">
              <FaWallet className="text-white text-3xl lg:text-4xl" />
            </div>
            <div className="flex flex-col text-left max-w-xs">
              <h1 className="text-white font-zalando font-bold text-base lg:text-lg">
                Controle financeiro simplificado
              </h1>
              <p className="text-white font-zalando text-xs lg:text-sm">
                Gerencie seus gastos e acompanhe suas metas com clareza e praticidade.
              </p>
            </div>
          </motion.div>

          {/* Item 2 */}
          <motion.div variants={itemFade} className="flex items-center gap-4 lg:gap-6 p-3 lg:p-4 rounded-xl justify-center lg:justify-start">
            <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-primaria rounded-full flex-shrink-0">
              <MdScreenshotMonitor className="text-white text-4xl lg:text-5xl" />
            </div>
            <div className="flex flex-col text-left max-w-xs">
              <h1 className="text-white font-zalando font-bold text-base lg:text-lg">
                Visual moderno e intuitivo
              </h1>
              <p className="text-white font-zalando text-xs lg:text-sm">
                Uma interface pensada para ser bonita, leve e fácil de usar.
              </p>
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div variants={itemFade} className="flex items-center gap-4 lg:gap-6 p-3 lg:p-4 rounded-xl justify-center lg:justify-start">
            <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-primaria rounded-full flex-shrink-0">
              <MdOutlineInsights className="text-white text-4xl lg:text-5xl" />
            </div>
            <div className="flex flex-col text-left max-w-xs">
              <h1 className="text-white font-zalando font-bold text-base lg:text-lg">
                Insights que fazem diferença
              </h1>
              <p className="text-white font-zalando text-xs lg:text-sm">
                Descubra padrões e economize com relatórios inteligentes.
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

export default Imagesite
