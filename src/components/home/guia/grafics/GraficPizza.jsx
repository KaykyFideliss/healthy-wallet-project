import React from "react";
import { motion } from "framer-motion";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { HeroGeometric } from '@/components/home/guia/Shade-Landing-Guia';

/* Dados simulados */
const pieDataMock = [
    { name: "Pago", value: 1200, valor: 1200 },
    { name: "Pendente", value: 800, valor: 800 },
    { name: "Atrasado", value: 400, valor: 400 },
];

const COLORS_BY_STATUS = {
    Pago: "#03664E",
    Pendente: "#ffbb00",
    Atrasado: "#fb0c06",
};

/* Gráfico visual (mock) */
const PieChartGuia = () => {
    return (
        <ResponsiveContainer width="100%" height={620}>
            <PieChart>
                <Pie
                    data={pieDataMock}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={90}
                    outerRadius={160}
                    paddingAngle={2}
                >
                    {pieDataMock.map((entry, i) => (
                        <Cell
                            key={i}
                            fill={COLORS_BY_STATUS[entry.name]}
                            strokeWidth={1}
                        />
                    ))}
                </Pie>
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const data = payload[0].payload;

                        return (
                            <div className="bg-white p-3 rounded-lg border border-gray-300">
                                <p className="font-semibold font-zalando text-terciaria mb-1">
                                    {data.name}
                                </p>
                                <p className="font-zalando text-terciaria">
                                    R$ {data.valor.toFixed(2)}
                                </p>
                            </div>
                        );
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

const GraficPizza = () => {
    return (
        <motion.section 
            className="relative min-h-screen w-full px-4 py-20 overflow-hidden"
            initial={{ filter: "blur(10px)", opacity: 0 }}
            whileInView={{ filter: "blur(0px)", opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* HeroGeometric como background */}
            <div className="absolute inset-0 z-0">
                <HeroGeometric
                    title1=""
                    title2=""
                    description=""
                />
            </div>

            {/* Conteúdo principal */}
            <div className="relative z-10">
                <div className="items-center justify-center">
                    {/* TÍTULO */}
                    <h1 className="font-semibold text-primaria text-2xl md:text-4xl lg:text-5xl font-zalando text-center mb-3">
                        GRÁFICO DE PIZZA
                    </h1>

                    <p className="text-white font-zalando text-center text-xs md:text-sm mb-14">
                        O gráfico de pizza apresenta uma visão visual da situação das suas contas,
                        separada por status.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, x: 0, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="mx-0 lg:mx-96"
                    >
                        <h3 className="font-semibold text-white text-xl md:text-2xl lg:text-3xl font-zalando text-center mb-3">
                            COMO INTERPRETAR ?
                        </h3>
                        <p className="text-white font-zalando text-justify text-base md:text-lg lg:text-xl mb-14">
                            O gráfico de pizza apresenta uma visão clara e objetiva da distribuição
                            das suas contas por status. Cada setor representa a proporção do valor
                            total em uma determinada situação, permitindo identificar rapidamente
                            quais despesas já foram pagas, quais estão pendentes e quais exigem
                            atenção imediata.
                        </p>
                    </motion.div>
                </div>

                {/* CONTEÚDO */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 0, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="flex gap-3 items-center">
                            <span className="w-8 h-24 rounded-lg bg-secundaria" />
                            <p className="text-gray-300 font-zalando">
                                <strong className="text-secundaria font-semibold">VERDE - PAGO</strong>
                                <br />
                                Representa a parte do valor total que já foi quitada. Indica contas finalizadas, que não geram mais pendências nem preocupações no seu controle financeiro.
                            </p>
                        </div>
                    </motion.div>

                    {/* Gráfico */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center order-1 lg:order-2"
                    >
                        <div className="w-full max-w-xl">
                            <PieChartGuia />
                        </div>
                    </motion.div>

                    {/* Texto */}
                    <motion.div
                        initial={{ opacity: 0, x:   0, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 order-1 lg:order-2"
                    >
                        <div className="flex gap-3 items-center">
                            <span className="w-8 h-24 rounded-lg bg-vermelho" />
                            <p className="text-gray-300 font-zalando">
                                <strong className="text-vermelho font-semibold">AMARELO - ATRASADO</strong>
                                <br />
                              Indica contas cujo vencimento já passou e que ainda não foram pagas. Esse status aponta pendências críticas, que podem gerar juros, multas ou impactar seu controle financeiro.
                            </p>
                        </div>
                        <br />
                        <br />
                        <div className="flex gap-3 items-center">
                            <span className="w-8 h-24 rounded-lg bg-primaria" />
                            <p className="text-gray-300 font-zalando">
                                <strong className="text-primaria font-semibold">VERMELHO - VENCENDO</strong>
                                <br />
                                Representa contas que vencem nos próximos 7 dias. Esse status serve como alerta, sinalizando a necessidade de atenção imediata para evitar atrasos e encargos.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default GraficPizza;