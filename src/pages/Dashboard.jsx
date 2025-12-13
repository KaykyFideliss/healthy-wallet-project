import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const COLORS = ["#04BF8A", "#FFCC28", "#FF6B6B"];

export default function Dashboard() {
  const { user } = useAuth();
  const [tabelas, setTabelas] = useState([]);
  const [allContas, setAllContas] = useState([]);
  const [allPagamentos, setAllPagamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadAll() {
    setLoading(true);
    try {
      // 1) tabelas do user
      const { data: tb, error: errTb } = await supabase
        .from("tabelas")
        .select("id, nome, criada_em")
        .eq("user_id", user.id)
        .order("criada_em", { ascending: false });

      if (errTb) throw errTb;
      setTabelas(tb || []);

      const tabelaIds = (tb || []).map(t => t.id);

      // 2) todas as contas dessas tabelas
      const { data: contasData, error: errContas } = await supabase
        .from("contas")
        .select("id, tabela_id, nome, vencimento, parcelas, valor")
        .in("tabela_id", tabelaIds.length ? tabelaIds : [null]);

      if (errContas) throw errContas;
      setAllContas(contasData || []);

      // 3) pagamentos relacionados
      const { data: pagamentosData, error: errP } = await supabase
        .from("pagamentos")
        .select("id, conta_id, tabela_id, parcelas_pagas, valor_pago, pago_em")
        .in("tabela_id", tabelaIds.length ? tabelaIds : [null]);

      if (errP) throw errP;
      setAllPagamentos(pagamentosData || []);
    } catch (err) {
      console.error("Erro loadAll:", err);
      setError(err.message || "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }

  // helper: calcula total (considerando Opção C: valor por parcela)
  const calcContaTotal = (conta) => {
    const v = Number(conta.valor || 0);
    const p = conta.parcelas ? Number(conta.parcelas) : 1;
    return v * (p || 1);
  };

  // derive per-table aggregates
  const tabelasWithMetrics = useMemo(() => {
    return tabelas.map(t => {
      const contasDaTabela = allContas.filter(c => c.tabela_id === t.id);
      const pagamentosDaTabela = allPagamentos.filter(p => p.tabela_id === t.id);

      const totalGeral = contasDaTabela.reduce((s, c) => s + calcContaTotal(c), 0);
      const totalPago = pagamentosDaTabela.reduce((s, p) => s + (Number(p.valor_pago) || 0), 0);
      const debito = Math.max(totalGeral - totalPago, 0);

      // contas a vencer (próximos 7 dias)
      const now = new Date();
      const later = new Date(); later.setDate(now.getDate() + 7);
      const contasVencer = contasDaTabela.filter(c => {
        if (!c.vencimento) return false;
        const v = new Date(c.vencimento);
        v.setHours(0, 0, 0, 0);
        return v >= now && v <= later;
      }).length;

      const contasCount = contasDaTabela.length;

      // pie data: pago vs pendente
      const pie = [
        { name: "Pago", value: totalPago },
        { name: "Pendente", value: debito }
      ];

      return {
        ...t,
        contasCount,
        totalGeral,
        totalPago,
        debito,
        contasVencer,
        pie
      };
    });
  }, [tabelas, allContas, allPagamentos]);

  return (
    <div className="p-6">
      <header className="flex m-16 items-center justify-between mb-6">
        <div className="items-center justify-center w-full flex flex-col">
          <h1 className="text-3xl md:text-5xl text-white font-semibold text-center font-zalando ">DASHBOARD</h1>
          <p className="text-sm my-1 font-zalando text-primaria/60">Analise e veja seus gastos </p>
        </div>
      </header>
      <div className="w-full h-scree items-center text-center justify-center">
        {loading && <p className="text-sm text-white font-zalando justify-center flex flex-col items-center">Carregando...</p>}
        {error && <p className="text-sm  text-white font-zalando justify-center flex flex-col items-center bg-black">{error}</p>}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tabelasWithMetrics.map(t => (
          <div key={t.id} className="bg-primaria p-4 rounded-xl text-black relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-zalando font-bold text-lg"  >{t.nome}</h3>
                <p className="text-xs text-secundaria font-zalando">{t.contasCount} conta(s)</p>
              </div>

              <div style={{ width: 80, height: 80 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={t.pie} dataKey="value" nameKey="name" innerRadius={18} outerRadius={30} paddingAngle={2}>
                      {t.pie.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>

            </div>


            <div className="mt-4 flex gap-2 text-center flex-col">
              <Link
                to={`/tabela/${t.id}`}
                className="font-zalando text-white hover:text-secundaria px-3 py-2 flex items-center gap-2 text-base justify-center bg-secundaria rounded hover:bg-white transition"
              >
                Abrir Dashboard <FaChevronRight />
              </Link>
            </div>
            <div className="mt-2 text-xs mx-4 flex justify-between items-center text-center flex-col-2">
              <div className=" text-white font-zalando">Data de criação</div>
              <div className=" font-zalando text-white">{new Date(t.criada_em).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </section>

      {tabelasWithMetrics.length === 0 && !loading && (
        <div className="mt-8 text-gray-300">Você ainda não criou tabelas. Vá em "Minhas Tabelas" e crie a primeira.</div>
      )}
    </div>
  );
}
