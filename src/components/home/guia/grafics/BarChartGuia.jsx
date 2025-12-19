import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    <section className="h-screen w-full px-5">
      <div className="rounded-lg font-zalando col-span-2 ">
        {/* TÍTULO */}
        <h1 className="font-semibold text-primaria text-2xl md:text-4xl lg:text-5xl font-zalando text-center mb-3">
          GRÁFICO EM BARRA
        </h1>

        <p className="text-white font-zalando text-center text-[11px] md:text-sm mb-14">
          O gráfico de pizza apresenta uma visão visual da situação das suas contas,
          separada por status.
        </p>

      </div>
      <div className='md:mx-40'>
        <p className="text-white font-zalando text-justify text-base md:text-lg lg:text-xl mb-14">
          Este gráfico apresenta as 10 despesas mais altas registradas, organizadas do maior para o menor valor, permitindo visualizar rapidamente quais contas consomem a maior parte do orçamento mensal. Com ele, o usuário consegue identificar de forma imediata quais gastos têm maior impacto financeiro, apoiar decisões importantes e ter mais clareza e consciência no controle das finanças. É uma ferramenta ideal para quem busca uma visão rápida, objetiva e estratégica das despesas, facilitando a organização e o planejamento financeiro.

          </p>


         
      </div>

      <div className="w-full h-[390px] lg:h-[520px] md:">
        <ResponsiveContainer>
          <BarChart
            data={barDataMock}
            layout="vertical"
            margin={{ top: 10, right: 30, left: -50, bottom: 10 }}
            className='font-zalando  '
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

            <Bar
              dataKey="value"
              radius={[0, 8, 8, 0]}
              fill="#ffcc00"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default BarChartGuia;
