import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { 
  FaArrowLeft, 
  FaArrowUp, 
  FaArrowDown, 
  FaChartLine, 
  FaMoneyBillWave,
  FaPiggyBank, 
  FaExclamationTriangle 
} from "react-icons/fa";
import { motion } from "framer-motion";

const COLORS_BY_STATUS = {
  Pago: "#03664E",
  Pendente: "#ffbb00",
  Vencendo: "#fc7303",
  Atrasado: "#dc2626",
};

// Funções de formatação
const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatPercent = (value) => {
  if (value === 0) return "0%";
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};

export default function TabelaDashboard() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [tabela, setTabela] = useState(null);
  const [contas, setContas] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [salary, setSalary] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snapshots, setSnapshots] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({
    name: "undefined",
    text: "Clique em um setor do gráfico para mais detalhes",
  });

  // Carregar tudo em uma única chamada
  async function loadAll() {
    if (!user || !id) return;
    
    setLoading(true);
    try {
      const [tabelaRes, contasRes, pagamentosRes, profileRes, snapshotsRes] = await Promise.all([
        supabase
          .from("tabelas")
          .select("id, nome, criada_em")
          .eq("id", id)
          .single(),
        
        supabase
          .from("contas")
          .select("id, nome, vencimento, parcelas, valor, tabela_id")
          .eq("tabela_id", id)
          .order("vencimento", { ascending: true }),
        
        supabase
          .from("pagamentos")
          .select("id, conta_id, tabela_id, valor_pago, pago_em")
          .eq("tabela_id", id)
          .order("pago_em", { ascending: false }),
        
        supabase
          .from("profiles")
          .select("salario")
          .eq("id", user.id)
          .single(),
        
        supabase
          .from("tabela_snapshots")
          .select("*")
          .eq("tabela_id", id)
          .order("ano", { ascending: true })
          .order("mes", { ascending: true })
      ]);

      if (tabelaRes.error) throw tabelaRes.error;
      if (contasRes.error) throw contasRes.error;
      if (pagamentosRes.error) throw pagamentosRes.error;
      if (profileRes.error) throw profileRes.error;

      setTabela(tabelaRes.data);
      setContas(contasRes.data || []);
      setPagamentos(pagamentosRes.data || []);
      setSalary(Number(profileRes.data?.salario) || 0);
      setSnapshots(snapshotsRes.data || []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      alert("Erro ao carregar dados da tabela");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, [user, id]);

  const calcContaTotal = (conta) => Number(conta.valor || 0);

  // MÉTRICAS BASE
  const metrics = useMemo(() => {
    const totalGeral = contas.reduce((s, c) => s + calcContaTotal(c), 0);
    const totalPago = pagamentos.reduce((s, p) => s + Number(p.valor_pago || 0), 0);
    const debito = Math.max(totalGeral - totalPago, 0);

    const contasPagasIds = new Set(pagamentos.map((p) => p.conta_id));
    const qtdPago = contasPagasIds.size;
    const qtdPendente = contas.length - qtdPago;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const today = new Date(now);
    
    const later = new Date();
    later.setDate(now.getDate() + 7);
    later.setHours(0, 0, 0, 0);

    // Contas vencendo (próximos 7 dias)
    const contasVencendo = contas.filter((c) => {
      if (!c.vencimento) return false;
      const v = new Date(c.vencimento);
      v.setHours(0, 0, 0, 0);
      return v >= today && v <= later;
    });

    // Contas atrasadas
    const contasAtrasadas = contas.filter((c) => {
      if (!c.vencimento) return false;
      const v = new Date(c.vencimento);
      v.setHours(0, 0, 0, 0);
      return v < today;
    });

    const valorVencendo = contasVencendo.reduce((s, c) => s + calcContaTotal(c), 0);
    const valorAtrasado = contasAtrasadas.reduce((s, c) => s + calcContaTotal(c), 0);
    const valorPendenteNormal = Math.max(debito - valorVencendo - valorAtrasado, 0);

    // Calcular percentuais
    const percentPago = totalGeral > 0 ? (totalPago / totalGeral) * 100 : 0;
    const percentPendente = totalGeral > 0 ? (debito / totalGeral) * 100 : 0;
    const percentVencendo = totalGeral > 0 ? (valorVencendo / totalGeral) * 100 : 0;
    const percentAtrasado = totalGeral > 0 ? (valorAtrasado / totalGeral) * 100 : 0;

    return {
      totalGeral,
      totalPago,
      debito,
      valorVencendo,
      valorAtrasado,
      valorPendenteNormal,
      qtdPago,
      qtdPendente,
      qtdVencendo: contasVencendo.length,
      qtdAtrasadas: contasAtrasadas.length,
      percentPago,
      percentPendente,
      percentVencendo,
      percentAtrasado,
    };
  }, [contas, pagamentos]);

  // Salvar snapshot mensal
  useEffect(() => {
    if (!user || !id || !salary || metrics.totalGeral === 0) return;
    
    const salvarSnapshotMensal = async () => {
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = hoje.getMonth() + 1;

      // Verificar se já existe snapshot deste mês
      const { data: existente } = await supabase
        .from("tabela_snapshots")
        .select("id")
        .eq("user_id", user.id)
        .eq("tabela_id", id)
        .eq("ano", ano)
        .eq("mes", mes)
        .maybeSingle();

      if (existente) return;

      try {
        await supabase.from("tabela_snapshots").insert({
          user_id: user.id,
          tabela_id: id,
          ano,
          mes,
          salario: salary,
          total_gasto: metrics.totalGeral,
          total_pago: metrics.totalPago,
          total_pendente: metrics.debito,
          percentual_se: salary > 0 ? (metrics.totalGeral / salary) * 100 : 0,
        });
        
        // Recarregar snapshots
        const { data: novosSnapshots } = await supabase
          .from("tabela_snapshots")
          .select("*")
          .eq("tabela_id", id)
          .order("ano", { ascending: true })
          .order("mes", { ascending: true });
        
        setSnapshots(novosSnapshots || []);
      } catch (error) {
        console.error("Erro ao salvar snapshot:", error);
      }
    };

    // Executar apenas uma vez por dia
    const lastSnapshot = localStorage.getItem(`lastSnapshot_${id}`);
    const hoje = new Date().toDateString();
    
    if (lastSnapshot !== hoje) {
      salvarSnapshotMensal();
      localStorage.setItem(`lastSnapshot_${id}`, hoje);
    }
  }, [user, id, salary, metrics.totalGeral]);

  // MÉTRICAS BASEADAS NO SALÁRIO
  const salaryMetrics = useMemo(() => {
    if (!salary || salary <= 0) return null;

    const comprometido = metrics.totalGeral;
    const percentualComprometido = (comprometido / salary) * 100;
    const saldoLivre = salary - comprometido;
    const salarioDiario = salary / 30;

    return {
      comprometido,
      percentualComprometido,
      saldoLivre,
      salarioDiario,
    };
  }, [salary, metrics]);

  // DADOS DO GRÁFICO DE PIZZA
  const pieData = useMemo(() => {
    const data = [];
    
    // Pago
    if (metrics.totalPago > 0) {
      data.push({
        name: "Pago",
        value: Math.max(metrics.totalPago, 1),
        valor: metrics.totalPago,
        text: `${metrics.qtdPago} conta(s) paga(s)`,
        percent: metrics.percentPago,
      });
    }
    
    // Pendente Normal
    if (metrics.valorPendenteNormal > 0) {
      data.push({
        name: "Pendente",
        value: Math.max(metrics.valorPendenteNormal, 1),
        valor: metrics.valorPendenteNormal,
        text: `${metrics.qtdPendente - metrics.qtdVencendo - metrics.qtdAtrasadas} conta(s) pendente(s) - ${formatCurrency(metrics.valorPendenteNormal)}`,
        percent: metrics.totalGeral > 0 ? (metrics.valorPendenteNormal / metrics.totalGeral) * 100 : 0,
      });
    }
    
    // Vencendo
    if (metrics.valorVencendo > 0) {
      data.push({
        name: "Vencendo",
        value: Math.max(metrics.valorVencendo, 1),
        valor: metrics.valorVencendo,
        text: `${metrics.qtdVencendo} conta (s) vencendo nos próximos dias`,
        percent: metrics.percentVencendo,
      });
    }
    
    // Atrasado
    if (metrics.valorAtrasado > 0) {
      data.push({
        name: "Atrasado",
        value: Math.max(metrics.valorAtrasado, 1),
        valor: metrics.valorAtrasado,
        text: `${metrics.qtdAtrasadas} conta(s) atrasada(s)`,
        percent: metrics.percentAtrasado,
      });
    }

    // Se não houver dados, mostrar mensagem
    if (data.length === 0) {
      data.push({
        name: "Sem dados",
        value: 1,
        valor: 0,
        text: "Nenhuma conta registrada",
        percent: 100,
      });
    }

    return data;
  }, [metrics]);

  const barData = useMemo(() => {
    return contas
      .map((c) => ({
        name: c.nome.substring(0, 15) + (c.nome.length > 15 ? "..." : ""),
        value: calcContaTotal(c),
        originalName: c.nome,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [contas]);

  // COMPARAÇÃO MENSAL
  const monthlyComparison = useMemo(() => {
    if (snapshots.length < 2) return null;

    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();
    
    const mesAnterior = mesAtual === 1 ? 12 : mesAtual - 1;
    const anoAnterior = mesAtual === 1 ? anoAtual - 1 : anoAtual;

    const snapshotAtual = snapshots.find(s => 
      s.ano === anoAtual && s.mes === mesAtual
    );
    
    const snapshotAnterior = snapshots.find(s => 
      s.ano === anoAnterior && s.mes === mesAnterior
    );

    if (!snapshotAtual || !snapshotAnterior) return null;

    const diffGasto = snapshotAtual.total_gasto - snapshotAnterior.total_gasto;
    const diffPago = snapshotAtual.total_pago - snapshotAnterior.total_pago;
    const diffPendente = snapshotAtual.total_pendente - snapshotAnterior.total_pendente;
    
    const percentGasto = snapshotAnterior.total_gasto > 0 
      ? (diffGasto / snapshotAnterior.total_gasto) * 100 
      : diffGasto > 0 ? 100 : 0;
    
    const percentPago = snapshotAnterior.total_pago > 0
      ? (diffPago / snapshotAnterior.total_pago) * 100
      : diffPago > 0 ? 100 : 0;

    const insights = [];
    
    if (percentGasto > 20) {
      insights.push("Seus gastos aumentaram significativamente este mês");
    } else if (percentGasto < -20) {
      insights.push("Ótimo controle de gastos este mês!");
    }
    
    if (snapshotAtual.percentual_se > 80) {
      insights.push("Cuidado: mais de 80% do salário comprometido");
    } else if (snapshotAtual.percentual_se < 50) {
      insights.push("Boa gestão: menos de 50% do salário comprometido");
    }
    
    if (diffPendente > 0) {
      insights.push("Atenção: dívidas pendentes aumentaram");
    }

    if (insights.length === 0) {
      insights.push("Sua situação financeira está estável este mês");
    }

    return {
      atual: snapshotAtual,
      anterior: snapshotAnterior,
      diffGasto,
      diffPago,
      diffPendente,
      percentGasto,
      percentPago,
      percentPendente: snapshotAnterior.total_pendente > 0
        ? (diffPendente / snapshotAnterior.total_pendente) * 100
        : diffPendente > 0 ? 100 : 0,
      insights,
      melhorouGasto: diffGasto < 0,
      melhorouPago: diffPago > 0,
      melhorouPendente: diffPendente < 0,
    };
  }, [snapshots]);

  // DADOS PARA GRÁFICO DE COMPARAÇÃO
  const comparisonChartData = useMemo(() => {
    if (!monthlyComparison) return [];
    
    return [
      {
        name: 'Gastos',
        atual: monthlyComparison.atual.total_gasto,
        anterior: monthlyComparison.anterior.total_gasto,
      },
      {
        name: 'Pago',
        atual: monthlyComparison.atual.total_pago,
        anterior: monthlyComparison.anterior.total_pago,
      },
      {
        name: 'Pendente',
        atual: monthlyComparison.atual.total_pendente,
        anterior: monthlyComparison.anterior.total_pendente,
      },
    ];
  }, [monthlyComparison]);

  // DADOS PARA GRÁFICO DE EVOLUÇÃO
  const evolutionChartData = useMemo(() => {
    const ultimos6Meses = snapshots.slice(-6);
    if (ultimos6Meses.length === 0) return [];
    
    return ultimos6Meses.map(s => ({
      name: `${String(s.mes).padStart(2, '0')}/${String(s.ano).slice(-2)}`,
      gasto: Number(s.total_gasto),
      pago: Number(s.total_pago),
      pendente: Number(s.total_pendente),
      percentual: Number(s.percentual_se),
    }));
  }, [snapshots]);

  // Função para renderizar o gráfico de pizza corretamente
  const renderPieChart = () => {
    if (pieData.length === 0) {
      return (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-400">Nenhum dado para exibir</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={pieData.length > 1 ? 2 : 0}
            onClick={(data) => setSelectedStatus(data)}
          
            labelLine={true}
          >
            {pieData.map((entry, i) => (
              <Cell
                key={i}
                fill={COLORS_BY_STATUS[entry.name] || "#888888"}
                cursor="pointer"
                stroke="#fff"
                strokeWidth={1}
              />
            ))}
          </Pie>
<Tooltip
  content={({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;
    
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg border border-gray-700">
        <p className="font-bold font-zalando text-primaria mb-1">{data.name}</p>
        <p className="text-primaria font-zalando">{formatCurrency(data.valor || 0)}</p>
       
      </div>
    );
  }}
/>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-4 md:p-6 mt-0 md:mt-6 lg:mt-8">
      {/* Botão voltar */}
      <button 
        className="bg-secundaria font-zalando flex items-center justify-center text-center text-white px-4 py-2 rounded-lg mb-6 hover:bg-opacity-90 transition"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft className="mr-2" />
        Voltar
      </button>

      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold font-zalando mb-2">
          {tabela?.nome || "Tabela"}
        </h1>
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terciaria"></div>
            <span className="ml-3 text-white">Carregando...</span>
          </div>
        )}
      </div>

      {!loading && (
        <>
          {/* CARDS PRINCIPAIS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { 
                label: "Total Geral", 
                value: metrics.totalGeral,
              
              },
              { 
                label: "Total Pago", 
                value: metrics.totalPago,
                
              },
              { 
                label: "Débito Pendente", 
                value: metrics.debito,
               
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`bg-primaria p-5 rounded-lg shadow-lg ${item.color}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="">
                    <h3 className=" text-lg font-semibold  text-white font-zalando">{item.label}</h3>
                    </div>
                    <div className="text-2xl font-bold text-terciaria font-zalando mt-2">
                      {formatCurrency(item.value)}
                    </div>
                  </div>
                  <div className="text-terciaria">
                    {item.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* GRÁFICOS PRINCIPAIS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Gráfico de Pizza */}
            <div className=" p-4 rounded-lg">
              <h3 className="font-semibold text-white font-zalando text-xl mb-4 text-center">
                SITUAÇÃO FINANCEIRA
              </h3>
              
              {renderPieChart()}
              
              {/* Legenda */}
              <div className="mt-4 space-y-2">
                <p className="text-sm text-center text-white font-zalando mb-3">
                  {selectedStatus.text}
                </p>
                
              
                
            
              </div>
            </div>

            {/* Gráfico de Barras */}
            <div className=" p-4 rounded-lg font-zalando col-span-2">
              <h3 className="font-semibold  text-white font-zalando text-base mb-4 text-center">
                OS 10 MAIORES GASTOS
              </h3>
              
              {barData.length > 0 ? (
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart
                      data={barData}
                      layout="vertical"
                      margin={{ top: 10, right: 20, left: -30, bottom: 10 }}
                    >
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={90}
                        tick={{ fill: "#fff", fontSize: 10 }}
                        axisLine={{ stroke: "#FFFFFF", strokeWidth: 2 }}
                        tickLine={false}
                      />
                      <XAxis
                        type="number"
                        tick={{ fill: "#fff", fontSize: 8 }}
                        tickFormatter={(v) =>
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            notation: "compact",
                          }).format(v)
                        }
                        axisLine={{ stroke: "#FFFFFF", strokeWidth: 2 }}
                        tickLine={false}
                      />
                      <Tooltip
                        formatter={(value, name, props) => {
                          const data = props.payload;
                          return [
                            formatCurrency(value),
                            data.originalName || name
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
              ) : (
                <div className="flex items-center justify-center h-48">
                  <p className="text-gray-400">Nenhuma conta registrada</p>
                </div>
              )}
            </div>
          </section>

          {/* MÉTRICAS DO SALÁRIO */}
          {salaryMetrics && (
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { 
                  label: "Salário", 
                  value: salary, 
                  color: "text-terciaria",
                  description: "Renda mensal"
                },
                { 
                  label: "Comprometido", 
                  value: `${salaryMetrics.percentualComprometido.toFixed(1)}%`, 
                  color: "text-terciaria",
                  description: "Do salário"
                },
                { 
                  label: "Saldo Livre", 
                  value: salaryMetrics.saldoLivre, 
                  color: salaryMetrics.saldoLivre < 0 ? "text-red-500" : "text-green-500",
                  description: salaryMetrics.saldoLivre < 0 ? "Negativo" : "Disponível"
                },
                { 
                  label: "Limite Diário", 
                  value: salaryMetrics.salarioDiario, 
                  color: "text-terciaria",
                  description: "Para gastos extras"
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-primaria p-4 rounded-lg">
                  <div className="text-sm text-gray-300 font-zalando font-semibold">
                    {item.label}
                  </div>
                  <div className={`text-xl font-bold font-zalando mt-1 ${item.color}`}>
                    {typeof item.value === 'number' 
                      ? formatCurrency(item.value)
                      : item.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.description}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* COMPARAÇÃO MENSAL */}
          {monthlyComparison && (
            <section className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white font-zalando flex items-center">
                    <FaChartLine className="mr-3 text-terciaria" />
                    Comparativo Mensal
                  </h2>
                  <span className="text-sm text-gray-300">
                    {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </span>
                </div>

                {/* CARDS DE COMPARAÇÃO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      title: "Gastos Totais",
                      atual: monthlyComparison.atual.total_gasto,
                      anterior: monthlyComparison.anterior.total_gasto,
                      diff: monthlyComparison.diffGasto,
                      percent: monthlyComparison.percentGasto,
                      melhorou: monthlyComparison.melhorouGasto,
                      icon: <FaMoneyBillWave />,
                    },
                    {
                      title: "Valor Pago",
                      atual: monthlyComparison.atual.total_pago,
                      anterior: monthlyComparison.anterior.total_pago,
                      diff: monthlyComparison.diffPago,
                      percent: monthlyComparison.percentPago,
                      melhorou: monthlyComparison.melhorouPago,
                      icon: <FaChartLine />,
                    },
                    {
                      title: "Pendências",
                      atual: monthlyComparison.atual.total_pendente,
                      anterior: monthlyComparison.anterior.total_pendente,
                      diff: monthlyComparison.diffPendente,
                      percent: monthlyComparison.percentPendente,
                      melhorou: monthlyComparison.melhorouPendente,
                      icon: <FaExclamationTriangle />,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-primaria p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold font-zalando">{item.title}</h3>
                        <div className={`p-2 rounded-full ${item.melhorou ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                          <div className={`${item.melhorou ? 'text-green-400' : 'text-red-400'}`}>
                            {item.icon}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {formatCurrency(item.atual)}
                          </div>
                          <div className="text-sm text-gray-400">
                            Mês atual
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`flex items-center justify-end ${item.melhorou ? 'text-green-400' : 'text-red-400'}`}>
                            {item.melhorou ? <FaArrowDown className="mr-1" /> : <FaArrowUp className="mr-1" />}
                            <span className="font-bold">{formatPercent(item.percent)}</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            vs mês anterior
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Mês anterior: {formatCurrency(item.anterior)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* GRÁFICO DE COMPARAÇÃO */}
                {comparisonChartData.length > 0 && (
                  <div className="bg-primaria p-4 rounded-lg mb-6">
                    <h3 className="text-white font-semibold mb-4 font-zalando">Comparação Visual</h3>
                    <div style={{ width: '100%', height: 250 }}>
                      <ResponsiveContainer>
                        <BarChart data={comparisonChartData}>
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#fff' }}
                            axisLine={{ stroke: '#fff' }}
                          />
                          <YAxis 
                            tick={{ fill: '#fff' }}
                            tickFormatter={(v) => formatCurrency(v).replace('R$', '')}
                            axisLine={{ stroke: '#fff' }}
                          />
                          <Tooltip
                            formatter={(value) => [formatCurrency(value), 'Valor']}
                          />
                          <Bar 
                            dataKey="anterior" 
                            name="Mês Anterior" 
                            fill="#4B5563" 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="atual" 
                            name="Mês Atual" 
                            fill="#ffcc00" 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* INSIGHTS */}
                {monthlyComparison.insights.length > 0 && (
                  <div className="bg-primaria p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-3 font-zalando flex items-center">
                      <FaPiggyBank className="mr-2 text-terciaria" />
                      Insights Financeiros
                    </h3>
                    <div className="space-y-2">
                      {monthlyComparison.insights.map((insight, idx) => (
                        <div key={idx} className="flex items-start p-3 bg-gray-800/50 rounded">
                          <div className={`p-1 rounded-full mr-3 ${insight.includes('Cuidado') || insight.includes('Atenção') ? 'bg-red-900/30' : 'bg-green-900/30'}`}>
                            {insight.includes('Cuidado') || insight.includes('Atenção') ? (
                              <FaExclamationTriangle className="text-red-400" />
                            ) : (
                              <FaChartLine className="text-green-400" />
                            )}
                          </div>
                          <p className="text-white text-sm">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </section>
          )}

          {/* GRÁFICO DE EVOLUÇÃO */}
          {evolutionChartData.length > 0 && (
            <section className="mb-8">
              <div className="bg-primaria p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-4 font-zalando">
                  Evolução dos Últimos {evolutionChartData.length} Meses
                </h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <AreaChart data={evolutionChartData}>
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#fff' }}
                        axisLine={{ stroke: '#fff' }}
                      />
                      <YAxis 
                        tick={{ fill: '#fff' }}
                        tickFormatter={(v) => formatCurrency(v).replace('R$', '')}
                        axisLine={{ stroke: '#fff' }}
                      />
                      <Tooltip
                        formatter={(value) => [formatCurrency(value), 'Valor']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gasto" 
                        name="Gastos" 
                        stroke="#ffcc00" 
                        fill="#ffcc00" 
                        fillOpacity={0.3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="pago" 
                        name="Pago" 
                        stroke="#03664E" 
                        fill="#03664E" 
                        fillOpacity={0.3}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="percentual" 
                        name="% do Salário" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        yAxisId="right"
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: '#fff' }}
                        tickFormatter={(v) => `${v.toFixed(0)}%`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#ffcc00]"></div>
                    <span className="text-white text-xs">Gastos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#03664E]"></div>
                    <span className="text-white text-xs">Pago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#8B5CF6]"></div>
                    <span className="text-white text-xs">% Salário</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* LISTA DE CONTAS */}
          <section className="mb-6">
            <h3 className="font-semibold mb-4 text-white text-xl font-zalando">Contas</h3>
            <div className="flex flex-col gap-3">
              {contas.length > 0 ? contas.map(c => {
                const vencimento = c.vencimento ? new Date(c.vencimento) : null;
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                
                let statusColor = "bg-gray-700";
                let statusText = "Pendente";
                
                if (vencimento) {
                  vencimento.setHours(0, 0, 0, 0);
                  if (vencimento < hoje) {
                    statusColor = "bg-red-600";
                    statusText = "Atrasada";
                  } else if ((vencimento - hoje) / (1000 * 60 * 60 * 24) <= 7) {
                    statusColor = "bg-orange-500";
                    statusText = "Vencendo";
                  }
                }

                return (
                  <div key={c.id} className="bg-primaria p-4 rounded-lg flex justify-between items-center hover:bg-opacity-80 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
                        <div className="font-medium text-white">{c.nome}</div>
                        <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">
                          {statusText}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        {vencimento ? vencimento.toLocaleDateString('pt-BR') : "Sem data"}
                        {c.parcelas && ` • ${c.parcelas}x`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl text-terciaria">
                        {formatCurrency(calcContaTotal(c))}
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="bg-primaria p-8 rounded-lg text-center">
                  <div className="text-4xl mb-3">📋</div>
                  <p className="text-white font-zalando text-lg mb-2">
                    Nenhuma conta registrada
                  </p>
                  <p className="text-gray-400">
                    Adicione contas para começar a análise
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}