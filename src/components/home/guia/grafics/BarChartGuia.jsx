import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= ANIMAÇÃO ================= */

const easeSmooth = [0.22, 1, 0.36, 1];

const blurUpVariant = {
  hidden: {
    opacity: 0,
    y: 80,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: easeSmooth,
    },
  },
  exit: {
    opacity: 0,
    y: 60,
    filter: "blur(10px)",
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

const BarChartGuia = () => {
  const barDataMock = [
    { name: "Aluguel", value: 1800, originalName: "Valor" },
    { name: "Cartão", value: 950, originalName: "Valor" },
    { name: "Mercado", value: 720, originalName: "Valor" },
    { name: "Internet", value: 120, originalName: "Valor" },
    { name: "Luz", value: 210, originalName: "Valor" },
    { name: "Água", value: 95, originalName: "Valor" },
    { name: "Streaming", value: 70, originalName: "Valor" },
    { name: "Academia", value: 110, originalName: "Valor" },
    { name: "Telefone", value: 85, originalName: "Valor" },
    { name: "Outros", value: 60, originalName: "Valor" },
  ];

  return (
    <motion.section
      className="w-full px-5"
      variants={blurUpVariant}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="rounded-lg font-zalando col-span-2">
        <motion.h1 className="font-semibold text-primaria text-2xl md:text-4xl lg:text-5xl text-center mb-3"
         variants={blurUpVariant}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      >
          GRÁFICO EM BARRA
        </motion.h1>

        <motion.p className="text-white text-center text-[11px] md:text-sm mb-14"
         variants={blurUpVariant}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      >
          O gráfico de pizza apresenta uma visão visual da situação das suas contas,
          separada por status.
        </motion.p>
      </div>

      <div className="md:mx-40">
        <motion.p className="text-white font-zalando text-justify text-base md:text-lg lg:text-xl mb-14"
         variants={blurUpVariant}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      >
          Este gráfico apresenta as 10 despesas mais altas registradas, organizadas
          do maior para o menor valor, permitindo visualizar rapidamente quais
          contas consomem a maior parte do orçamento mensal. Com ele, o usuário
          consegue identificar de forma imediata quais gastos têm maior impacto
          financeiro, apoiar decisões importantes e ter mais clareza e consciência
          no controle das finanças.
        </motion.p>
      </div>

      <motion.div className="w-full h-[390px] lg:h-[520px]"
       variants={blurUpVariant}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      >
        <ResponsiveContainer>
          <BarChart
            data={barDataMock}
            layout="vertical"
            margin={{ top: 10, right: 30, left: -50, bottom: 10 }}
          >
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fill: "#fff", fontSize: 8 }}
              tickLine={false}
              axisLine={{ stroke: "#FFFFFF", strokeWidth: 2 }}
            />

            <XAxis
              type="number"
              tick={{ fill: "#fff", fontSize: 8 }}
              tickLine={false}
              axisLine={{ stroke: "#FFFFFF", strokeWidth: 2 }}
              tickFormatter={(v) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  notation: "compact",
                }).format(v)
              }
            />

            <Tooltip
              formatter={(value, name, props) => {
                const data = props.payload;
                return [
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value),
                  data.originalName,
                ];
              }}
            />

            <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#ffcc00" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.section>
  );
};

export default BarChartGuia;
