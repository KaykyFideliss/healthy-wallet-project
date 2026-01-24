import React from 'react'
import { motion } from "framer-motion";

const CardPrincipais = () => {
  // Variantes de animação para os cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "blur(12px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      filter: "blur(10px)",
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    }
  };

  // Variantes para o título
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(8px)",
      transition: {
        duration: 0.5
      }
    }
  };

  // Variantes para os textos
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
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
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(6px)",
      transition: {
        duration: 0.4
      }
    }
  };

  // Variantes para as linhas divisórias
  const lineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      scaleX: 0,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="w-full min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* TÍTULO */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.2 }}
          variants={titleVariants}
        >
          <h1 className="font-semibold text-primaria text-2xl md:text-4xl lg:text-5xl font-zalando text-center mb-6">
            CARDS DE RESUMO
          </h1>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.2 }}
          variants={textVariants}
        >
          <p className="text-white font-zalando text-center text-lg mb-14">
            Logo no topo da página Dashboard, você encontra três indicadores principais:
          </p>
        </motion.div>

        {/* ===== TOTAL GERAL ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
          {/* CARD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            className="relative flex justify-center md:justify-left order-2 lg:order-1"
          >
            <div className="hidden lg:block absolute left-20 top-4 w-72 h-32 bg-white rounded-lg shadow-lg z-0" />
            
            <div className="relative z-10 bg-primaria p-5 rounded-lg shadow-lg w-[320px] sm:w-[360px]">
              <h3 className="text-lg font-semibold text-white font-zalando">
                Total Geral
              </h3>
              <div className="text-2xl font-bold text-terciaria font-zalando mt-2">
                R$ 2.450,00
              </div>
              <p className="text-xs text-white font-semibold opacity-80 mt-1 font-zalando">
                Soma de todas as contas da tabela
              </p>
            </div>
          </motion.div>

          <div className='justify-center items-center mx-auto font-zalando order-1 lg:order-1'>
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.3 }}
              variants={textVariants}
            >
              <h2 className='text-primaria font-semibold pb-2 text-center lg:text-left'>
                TOTAL GERADO
              </h2>
              <p className="text-white font-zalando text-justify leading-relaxed max-w-lg">
                Representa a soma de todas as contas cadastradas nesta tabela,
                independentemente do status (pagas ou pendentes). Esse valor indica
                o custo total do período que você está controlando.
              </p>
            </motion.div>
          </div>
        </div>

        {/* LINHA DIVISÓRIA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.2 }}
          variants={lineVariants}
          className="h-px bg-white/40 mb-14 origin-left"
        />

        {/* ===== TOTAL PAGO ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
          {/* TEXTO */}
          <div className='justify-center items-center mx-auto font-zalando'>
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.3 }}
              variants={textVariants}
            >
              <h2 className='text-primaria font-semibold pb-2 text-center lg:text-left'>
                TOTAL PAGO
              </h2>
              <p className="text-white font-zalando text-justify leading-relaxed max-w-lg mx-auto lg:order-1">
                Mostra o valor total que já foi pago, com base nos pagamentos registrados.
                Serve para acompanhar sua evolução e saber quanto já foi quitado.
              </p>
            </motion.div>
          </div>

          {/* CARD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            className="relative flex justify-center md:justify-left order-1 lg:order-2"
          >
            <div className="hidden lg:block absolute right-20 top-4 w-72 h-32 bg-white rounded-lg shadow-lg z-0" />

            <div className="relative z-10 bg-primaria p-5 rounded-lg shadow-lg w-[320px] sm:w-[360px]">
              <h3 className="text-lg font-semibold text-white font-zalando">
                Total Pago
              </h3>
              <div className="text-2xl font-bold text-terciaria font-zalando mt-2">
                R$ 1.350,00
              </div>
              <p className="text-xs text-white font-semibold opacity-80 mt-1 font-zalando">
                Valor já quitado
              </p>
            </div>
          </motion.div>
        </div>

        {/* LINHA DIVISÓRIA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.2 }}
          variants={lineVariants}
          className="h-px bg-white/40 mb-14 origin-left"
        />

        {/* ===== DÉBITO PENDENTE ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* CARD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            className="relative flex justify-center md:justify-left order-2 lg:order-1"
          >
            <div className="hidden lg:block absolute left-20 top-4 w-72 h-32 bg-white rounded-lg shadow-lg z-0" />

            <div className="relative z-10 bg-primaria p-5 rounded-lg shadow-lg w-[320px] sm:w-[360px]">
              <h3 className="text-lg font-semibold text-white font-zalando">
                Débito Pendente
              </h3>
              <div className="text-2xl font-bold text-terciaria font-zalando mt-2">
                R$ 1.100,00
              </div>
              <p className="text-xs text-white font-semibold opacity-80 mt-1 font-zalando">
                Valor ainda em aberto
              </p>
            </div>
          </motion.div>

          <div className='justify-center items-center mx-auto font-zalando order-1 lg:order-2'>
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.3 }}
              variants={textVariants}
            >
              <h2 className='text-primaria font-semibold pb-2 text-center lg:text-left'>
                PENDÊNCIAS
              </h2>
              <p className="text-white font-zalando text-justify leading-relaxed max-w-lg mx-auto">
                Indica quanto ainda falta pagar, considerando contas pendentes,
                vencendo ou atrasadas. Esse valor ajuda a entender o impacto
                financeiro que ainda está por vir.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardPrincipais