import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { FaArrowLeft } from "react-icons/fa";

const COLORS = ["#03664E", "#FFCC28"];


export default function TabelaDashboard() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [tabela, setTabela] = useState(null);
  const [contas, setContas] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (!id) return;
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  async function loadAll() {
    setLoading(true);
    try {
      const { data: t, error: errT } = await supabase.from("tabelas").select("id, nome, criada_em").eq("id", id).single();
      if (errT) throw errT;
      setTabela(t);

      const { data: cData, error: errC } = await supabase
        .from("contas")
        .select("id, nome, vencimento, parcelas, valor, tabela_id")
        .eq("tabela_id", id)
        .order("vencimento", { ascending: true });

      if (errC) throw errC;
      setContas(cData || []);

      const { data: pData, error: errP } = await supabase
        .from("pagamentos")
        .select("id, conta_id, tabela_id, valor_pago, pago_em")
        .eq("tabela_id", id)
        .order("pago_em", { ascending: false });

      if (errP) throw errP;
      setPagamentos(pData || []);
    } catch (err) {
      console.error("Erro tabela:", err);
      alert("Erro ao carregar detalhes da tabela");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  const calcContaTotal = (conta) => {
    return Number(conta.valor || 0);
  };

  const metrics = useMemo(() => {
    const totalGeral = contas.reduce((s, c) => s + calcContaTotal(c), 0);
    const totalPago = pagamentos.reduce((s, p) => s + (Number(p.valor_pago) || 0), 0);
    const debito = Math.max(totalGeral - totalPago, 0);

    const now = new Date(); now.setHours(0, 0, 0, 0);
    const later = new Date(); later.setDate(now.getDate() + 7); later.setHours(0, 0, 0, 0);

    const contasVencendo = contas.filter(c => {
      if (!c.vencimento) return false;
      const v = new Date(c.vencimento); v.setHours(0, 0, 0, 0);
      return v >= now && v <= later;
    });

    const valorVencendo = contasVencendo.reduce(
      (s, c) => s + calcContaTotal(c),
      0
    );

    return {
      totalGeral,
      totalPago,
      debito,
      contasCount: contas.length,
      contasVencendo: contasVencendo.length,
      valorVencendo
    };
  }, [contas, pagamentos]);


  // pie data: pago vs pendente
  const pieData = [
    { name: "Pago", value: metrics.totalPago },
    { name: "Pendente", value: metrics.debito },
    { name: "Vencendo", value: metrics.valorVencendo }
  ];


  // barra: valores por conta (top 6)
  const barData = contas.slice(0, 6).map(c => ({ name: c.nome, value: calcContaTotal(c) }));

  return (
    <div className="p-6 mt-0 md:mt-6 lg:mt-8">
      <button className="bg-secundaria font-zalando flex items-center justify-center text-center  text-white px-3 py-2 rounded mb-4" onClick={() => navigate("/dashboard")}>
        <FaArrowLeft className="m-1" />
        Voltar
      </button>

      <div className=" text-center justify-center flex-col ">   <h1 className="  mb-5  text-3xl md:text-5xl text-white font-semibold text-center font-zalando ">{tabela?.nome || "Tabela"}</h1>
        {loading && <div>Carregando...</div>}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primaria  p-4 rounded">
          <div className="text-base text-white font-zalando font-semibold">Total geral</div>
          <div className="text-2xl font-bold mt-1 font-zalando text-terciaria">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(metrics.totalGeral)}</div>
        </div>
        <div className="bg-primaria p-4 rounded">
          <div className="text-base text-white font-zalando font-semibold">Total pago</div>
          <div className="text-2xl font-bold mt-1 font-zalando text-terciaria">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(metrics.totalPago)}</div>
        </div>
        <div className="bg-primaria p-4 rounded">
          <div className="text-base text-white font-zalando font-semibold">Débito</div>
          <div className="text-2xl font-bold mt-1 font-zalando text-terciaria">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(metrics.debito)}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-terciaria p-4 rounded mb-10">
          <h3 className="font-semibold text-white font-zalando text-base mb-2 justify-center flex ">SITUAÇÃO FINANCEIRA </h3>
          <div style={{ width: "100%", height: 180 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={30} outerRadius={60}>
                  {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-center  text-white font-zalando mt-2">
              {metrics.contasVencendo} conta(s) vencendo nos próximos 7 dias
            </p>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded col-span-2">
          <h3 className="font-semibold mb-2">Valores por conta (top)</h3>
          <div style={{ width: "100%", height: 180 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v)} />
                <Bar className="rounded-xl" dataKey="value" fill="#FFCC28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="mb-6 ">
        <h3 className="font-semibold mb-2 text-white">Contas</h3>
        <div className="flex flex-col gap-2">
          {contas.map(c => (
            <div key={c.id} className="bg-primaria p-3 rounded- flex justify-between items-center">
              <div>
                <div className="font-medium">{c.nome}</div>
                <div className="text-sm text-black/70">{c.vencimento ? new Date(c.vencimento).toLocaleDateString() : "—"}</div>
              </div>
              <div className="text-right">
                <div>{c.parcelas ? `${c.parcelas}x` : "-"}</div>
                <div className="font-bold">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(calcContaTotal(c))}</div>
              </div>
            </div>
          ))}
          {contas.length === 0 && <div className="text-gray-300">Nenhuma conta nessa tabela.</div>}
        </div>
      </section>
    </div>
  );
}
