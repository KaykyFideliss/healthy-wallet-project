"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroGeometric } from "../Shade-Landing-NaoPaga";

/* ================= ANIMAÇÕES ================= */

const easeSmooth = [0.22, 1, 0.36, 1];

const sectionVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeSmooth }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

const blurUp = {
  hidden: { opacity: 0, y: 80, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeSmooth }
  },
  exit: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
    transition: { duration: 0.5 }
  }
};

const staggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

/* ================= COMPONENTE ================= */

export default function NaoPagas() {
  const contasMock = [
    {
      id: 1,
      nome: "Conta de Luz",
      vencimento: "2026-01-18",
      valor: 1200.0,
      status: "Vencendo",
      cor: "bg-yellow-400",
      mensagem:
        "A cor amarela indica que esta conta está próxima da data de vencimento. Isso significa que o prazo para pagamento está chegando nos próximos dias e requer atenção para evitar atrasos, juros ou multas. Recomendamos verificar essa conta o quanto antes e, se possível, realizar o pagamento antecipadamente para manter seu controle financeiro em dia."
    },
    {
      id: 2,
      nome: "Internet",
      vencimento: "2026-01-05",
      valor: 1200.0,
      status: "Pendente",
      cor: "bg-red-500",
      mensagem:"A cor vermelha indica que a conta está vencida. Isso significa que o prazo de pagamento já expirou e é necessária uma ação imediata para evitar juros, multas ou outras penalidades financeiras."
        
    },
    {
      id: 3,
      nome: "Aluguel",
      vencimento: "2026-02-10",
      valor: 1200.0,
      status: "Em dia",
      cor: "bg-[#FFBB00]",
      mensagem:
        "A cor amarelo-escura indica que a conta vence entre 3 e 5 dias. Ela funciona como um aviso preventivo para que você se organize financeiramente e se prepare para o pagamento, evitando atrasos, juros ou encargos adicionais."
    }
  ];

  return (
    <motion.section
      className="relative min-h-screen w-full overflow-hidden"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.15 }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <HeroGeometric title1="" title2="" description="" />
      </div>

      {/* CONTEÚDO */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center px-4 sm:px-6 lg:px-8"
        variants={blurUp}
      >
        {/* TÍTULO */}
        <motion.div
          className="w-full max-w-6xl mx-auto text-center mt-12"
          variants={blurUp}
        >
          <h1 className="font-zalando font-semibold text-primaria text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3">
            CONTAS NÃO PAGAS
          </h1>

          <p className="font-zalando text-white text-xs sm:text-sm md:text-lg max-w-3xl mx-auto opacity-90">
            Nessa seção você encontra todas as suas contas que estão pendentes ou vencidas.
          </p>
        </motion.div>

        {/* LISTA DE CARDS */}
        <motion.div
          className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col gap-8 mt-12 mb-20"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {contasMock.map((c) => (
            <motion.div key={c.id} variants={blurUp} className="w-full">
              {/* CARD */}
              <div
                className={`${c.cor} w-full rounded-xl p-4 sm:p-5 flex justify-between items-center transition hover:bg-opacity-80`}
              >
                <div className="flex-1">
                  <div className="font-zalando font-semibold text-lg sm:text-xl text-white">
                    {c.nome}
                  </div>

                  <div className="font-zalando text-xs sm:text-sm text-white/90 mt-1">
                    {new Date(c.vencimento).toLocaleDateString("pt-BR")}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-zalando text-white font-semibold text-sm sm:text-base">
                    R$ {c.valor.toFixed(2).replace(".", ",")}
                  </div>
                  <span className="font-zalando text-xs sm:text-sm text-white font-semibold">
                    {c.status}
                  </span>
                </div>
              </div>

              {/* DESCRIÇÃO */}
              <p className="mt-4 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-white font-zalando text-justify sm:text-center opacity-90">
                {c.mensagem}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* OVERLAY FINAL */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
    </motion.section>
  );
}
