import React from 'react'
import { motion } from "framer-motion";

const CardPrincipais = () => {
  return (
    <section className="w-full min-h-screen px-4 py-16">

      <div className="max-w-6xl mx-auto">

        {/* TÍTULO */}
        <h1 className="font-semibold text-primaria text-2xl md:text-4xl lg:text-5xl font-zalando text-center mb-6">
          CARDS DE RESUMO
        </h1>

        <p className="text-white font-zalando text-center text-lg mb-14">
          Logo no topo da página Dashboard, você encontra três indicadores principais:
        </p>

        {/* ===== TOTAL GERAL ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">

          {/* CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex justify-center md:justify-left order-2 lg:order-1 "
          >
            <div className="hidden lg:block absolute left-20 top-4 w-72 h-32 bg-white rounded-lg shadow-lg z-0" />


            <div className="relative z-10 bg-primaria p-5 rounded-lg shadow-lg w-[320px] sm:w-[360px]">
              <h3 className="text-lg font-semibold text-white font-zalando ">
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

<div className=' justify-center items-center mx-auto font-zalando order-1 lg:order-1'>
          <h2 className='text-primaria font-semibold pb-2 text-center lg:text-left   '>TOTAL GERADO</h2>
          {/* TEXTO */}
          <p className="text-white font-zalando text-justify leading-relaxed max-w-lg ">
            Representa a soma de todas as contas cadastradas nesta tabela,
            independentemente do status (pagas ou pendentes). Esse valor indica
            o custo total do período que você está controlando.
          </p>
</div>
        </div>

        <div className="h-px bg-white/40 mb-14" />

        {/* ===== TOTAL PAGO ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">

<div className=' justify-center items-center mx-auto font-zalando  '>
          <h2 className='text-primaria font-semibold pb-2'>TOTAL PAGO</h2>
          {/* TEXTO */}
          <p className="text-white font-zalando text-justify leading-relaxed max-w-lg mx-auto lg:order-1">
            Mostra o valor total que já foi pago, com base nos pagamentos registrados.
            Serve para acompanhar sua evolução e saber quanto já foi quitado.
          </p>
          </div>

          {/* CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex justify-center md:justify-left  order-1 lg:order-2"
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

        <div className="h-px bg-white/40 mb-14" />

        {/* ===== DÉBITO PENDENTE ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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

<div className=' justify-center items-center mx-auto font-zalando  order-1 lg:order-2  '>
          <h2 className='text-primaria font-semibold pb-2'>PENDÊNCIAS</h2>
          {/* TEXTO */}
          <p className="text-white font-zalando text-justify leading-relaxed max-w-lg mx-auto">
            Indica quanto ainda falta pagar, considerando contas pendentes,
            vencendo ou atrasadas. Esse valor ajuda a entender o impacto
            financeiro que ainda está por vir.
          </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default CardPrincipais
