import React from 'react'
import { motion } from "framer-motion";

const CardSalario = () => {
  return (
    <section className="w-full min-h-screen px-4 py-16 mt-16">

      <div className="max-w-6xl mx-auto">

        {/* ===== TÍTULO DA SEÇÃO ===== */}
        <h1 className="font-semibold text-primaria text-2xl md:text-4xl lg:text-5xl font-zalando text-center mb-6">
          MÉTRICAS DO SALARIO
        </h1>

        {/* DESCRIÇÃO */}
        <p className="text-white font-zalando text-center text-lg mb-14">
          Esta seção mostra, de forma simples e objetiva, como sua renda mensal está sendo utilizada e quanto você tem disponível para gastar ou poupar.
        </p>

        {/* ===== SALÁRIO (RENDA MENSAL) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">

          {/* CARD — SALÁRIO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex justify-center md:justify-left order-2 lg:order-1"
          >
            <div className="hidden lg:block absolute left-20 top-4 w-72 h-32 bg-white rounded-lg shadow-lg z-0" />

            <div className="relative z-10 bg-primaria p-5 rounded-lg shadow-lg w-[320px] sm:w-[360px]">
              <h3 className="text-lg font-semibold text-white font-zalando">
                Salário
              </h3>
              <div className="text-2xl font-bold text-terciaria font-zalando mt-2">
                R$ 3.500,00
              </div>
              <p className="text-xs text-white font-semibold opacity-80 mt-1 font-zalando">
                Renda Mensal
              </p>
            </div>
          </motion.div>

          {/* TEXTO — EXPLICAÇÃO DO SALÁRIO */}
          <div className="justify-center items-center mx-auto font-zalando order-1 lg:order-1">
            <h2 className="text-primaria font-semibold pb-2 text-center lg:text-left">
              SUA RENDA MENSAL
            </h2>
            <p className="text-white font-zalando text-justify leading-relaxed max-w-lg">
              Representa o valor total da sua renda mensal cadastrada no sistema. Esse valor é a base para todos os cálculos financeiros apresentados.
            </p>
          </div>

        </div>

        {/* DIVISOR */}
        <div className="h-px bg-white/40 mb-14" />

        {/* ===== SALÁRIO COMPROMETIDO (%) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">

          {/* TEXTO — COMPROMETIMENTO DO SALÁRIO */}
          <div className="justify-center items-center mx-auto font-zalando">
            <h2 className="text-primaria font-semibold pb-2">
              PORCENTAGEM DO SALÁRIO COMPROMETIDO
            </h2>
            <p className="text-white font-zalando text-justify leading-relaxed max-w-lg mx-auto">
              Mostra a porcentagem do seu salário que já está comprometida com o pagamento das contas desta tabela. Esse indicador ajuda a avaliar se seus gastos estão dentro de um limite saudável.
            </p>
          </div>

          {/* CARD — COMPROMETIDO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex justify-center md:justify-left order-1 lg:order-2"
          >
            <div className="hidden lg:block absolute right-20 top-4 w-72 h-32 bg-white rounded-lg shadow-lg z-0" />

            <div className="relative z-10 bg-primaria p-5 rounded-lg shadow-lg w-[320px] sm:w-[360px]">
              <h3 className="text-lg font-semibold text-white font-zalando">
                Comprometido
              </h3>
              <div className="text-2xl font-bold text-terciaria font-zalando mt-2">
                60.0%
              </div>
              <p className="text-xs text-white font-semibold opacity-80 mt-1 font-zalando">
                Do Salário
              </p>
            </div>
          </motion.div>

        </div>

        {/* DIVISOR */}
        <div className="h-px bg-white/40 mb-14" />


        {/* ===== SALDO LIVRE ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* CARD — SALDO LIVRE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex justify-center md:justify-left order-2 lg:order-1"
          >
            <div className="hidden lg:block absolute left-20 top-4 w-72 h-32 bg-white rounded-lg shadow-lg z-0" />

            <div className="relative z-10 bg-primaria p-5 rounded-lg shadow-lg w-[320px] sm:w-[360px]">
              <h3 className="text-lg font-semibold text-white font-zalando">
                Saldo Livre
              </h3>
              <div className="text-2xl font-bold text-green-600 font-zalando mt-2">
                R$ 1.400,00
              </div>
              <p className="text-xs text-white font-semibold opacity-80 mt-1 font-zalando">
                Disponível para uso
              </p>
            </div>
          </motion.div>

          {/* TEXTO — SALDO LIVRE */}
          <div className="justify-center items-center mx-auto font-zalando order-1 lg:order-2">
            <h2 className="text-primaria font-semibold pb-2">
              SALDO LIVRE
            </h2>
            <p className="text-white font-zalando text-justify leading-relaxed max-w-lg mx-auto">
              Indica quanto sobra do seu salário após considerar todas as despesas. Um valor positivo significa dinheiro disponível; negativo indica gastos acima da renda.
            </p>
          </div>

        </div>
        
<br />
<br />
  {/* DIVISOR */}
        <div className="h-px bg-white/40 mb-14" />
        {/* ===== LIMITE DIÁRIO ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">

          {/* TEXTO — LIMITE DIÁRIO */}
          <div className="justify-center items-center mx-auto font-zalando mt-20">
            <h2 className="text-primaria font-semibold pb-2">
              LIMITE DIÁRIO
            </h2>
            <p className="text-white font-zalando text-justify leading-relaxed max-w-lg mx-auto">
              Apresenta uma estimativa de quanto você poderia gastar por dia, considerando o salário mensal dividido por 30 dias. Serve como referência para controle diário.
            </p>
          </div>

          {/* CARD — LIMITE DIÁRIO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex justify-center md:justify-left order-1 lg:order-2"
          >
            <div className="hidden lg:block absolute right-20 top-4 w-72 h-32 bg-white rounded-lg shadow-lg z-0" />

            <div className="relative z-10 bg-primaria p-5 rounded-lg shadow-lg w-[320px] sm:w-[360px]">
              <h3 className="text-lg font-semibold text-white font-zalando">
                Limite Diário
              </h3>
              <div className="text-2xl font-bold text-terciaria font-zalando mt-2">
                R$ 116,67
              </div>
              <p className="text-xs text-white font-semibold opacity-80 mt-1 font-zalando">
                Para gastos extras
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default CardSalario
