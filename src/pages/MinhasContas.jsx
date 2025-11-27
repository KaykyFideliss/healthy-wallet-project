
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaArrowLeft, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MinhasContas() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tabelas, setTabelas] = useState([]);
  const [tabelaAtual, setTabelaAtual] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [contas, setContas] = useState([]);
  const [novaConta, setNovaConta] = useState({
    nome: "",
    vencimento: "",
    parcelas: "",
    valor: ""
  });
  const [criandoNovaTabela, setCriandoNovaTabela] = useState(false);
  const [nomeNovaTabela, setNomeNovaTabela] = useState("");
  const [modoDeletar, setModoDeletar] = useState(false);
  const [contaParaDeletar, setContaParaDeletar] = useState(null);

  // filtro: all / vencidas / quase / ok / pagas
  const [filtro, setFiltro] = useState("all");

  // Carregar tabelas do Supabase quando user estiver pronto
  useEffect(() => {
    if (!user) return;
    loadTabelas();
  }, [user]);

  // ---------- Helpers ----------
  const formatarDataBR = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isPastDate = (isoDate) => {
    if (!isoDate) return false;
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    const venc = new Date(isoDate);
    venc.setHours(0,0,0,0);
    return venc < hoje;
  };

  const calcularParcela = (valor, parcelas) => {
    const v = Number(valor);
    const p = Number(parcelas);
    if (!v || !p) return null;
    return v / p;
  };

  const formatMoney = (v) => {
    if (v === null || v === undefined || v === "") return "";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(v));
  };

  // ---------- Load / CRUD ----------
  const loadTabelas = async () => {
    try {
      const { data, error } = await supabase
        .from("tabelas")
        .select("id, nome, criada_em")
        .eq("user_id", user.id)
        .order("criada_em", { ascending: false });

      if (error) throw error;
      setTabelas(data || []);
    } catch (err) {
      console.error("Erro ao carregar tabelas:", err);
    }
  };

  const loadContas = async (tabelaId) => {
    try {
      const { data, error } = await supabase
        .from("contas")
        .select("id, nome, vencimento, parcelas, valor, status, created_at")
        .eq("tabela_id", tabelaId)
        .order("vencimento", { ascending: true });

      if (error) throw error;
      setContas(data || []);
    } catch (err) {
      console.error("Erro ao carregar contas:", err);
    }
  };

  const criarNovaTabela = async () => {
    if (!nomeNovaTabela.trim()) return;
    try {
      const { data, error } = await supabase
        .from("tabelas")
        .insert([{ user_id: user.id, nome: nomeNovaTabela }])
        .select()
        .single();

      if (error) throw error;

      setTabelas((prev) => [data, ...prev]);
      setTabelaAtual(data);
      setNomeNovaTabela("");
      setCriandoNovaTabela(false);
      setShowTable(true);
      await loadContas(data.id);
    } catch (err) {
      console.error("Erro criar tabela:", err);
      alert("Erro ao criar tabela");
    }
  };

  const deletarTabela = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Tem certeza que quer deletar esta tabela e suas contas?")) return;
    try {
      // deletar contas associadas
      const { error: delContError } = await supabase
        .from("contas")
        .delete()
        .eq("tabela_id", id);

      if (delContError) throw delContError;

      const { error } = await supabase
        .from("tabelas")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTabelas((prev) => prev.filter((t) => t.id !== id));
      if (tabelaAtual?.id === id) voltarParaLista();
    } catch (err) {
      console.error("Erro deletar tabela:", err);
      alert("Erro ao deletar tabela");
    }
  };

  const selecionarTabela = async (tabela) => {
    setTabelaAtual(tabela);
    setShowTable(true);
    setModoDeletar(false);
    setContaParaDeletar(null);
    await loadContas(tabela.id);
  };

  const voltarParaLista = () => {
    setTabelaAtual(null);
    setShowTable(false);
    setContas([]);
    setModoDeletar(false);
    setContaParaDeletar(null);
    setNovaConta({ nome: "", vencimento: "", parcelas: "", valor: "" });
  };

  const handleAddConta = async () => {
    if (!novaConta.nome || !novaConta.vencimento || !novaConta.valor) {
      alert("Preencha nome, vencimento e valor.");
      return;
    }
    if (!tabelaAtual) return alert("Selecione uma tabela.");

    // aviso se data passada
    if (isPastDate(novaConta.vencimento)) {
      const ok = window.confirm("⚠️ A data informada já passou. Deseja continuar mesmo assim?");
      if (!ok) return;
    }

    try {
      const payload = {
        tabela_id: tabelaAtual.id,
        nome: novaConta.nome,
        vencimento: novaConta.vencimento,
        parcelas: novaConta.parcelas ? Number(novaConta.parcelas) : null,
        valor: novaConta.valor ? Number(novaConta.valor) : null,
        status: "pendente"
      };

      const { data, error } = await supabase
        .from("contas")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      const novas = [...contas, data].sort((a, b) => new Date(a.vencimento) - new Date(b.vencimento));
      setContas(novas);
      await loadTabelas();
      setNovaConta({ nome: "", vencimento: "", parcelas: "", valor: "" });
    } catch (err) {
      console.error("Erro adicionar conta:", err);
      alert("Erro ao adicionar conta");
    }
  };

  const handleDeleteConta = async (contaId) => {
    if (!window.confirm("Deseja realmente deletar esta conta?")) return;
    try {
      const { error } = await supabase
        .from("contas")
        .delete()
        .eq("id", contaId);

      if (error) throw error;

      setContas((prev) => prev.filter((c) => c.id !== contaId));
      await loadTabelas();
    } catch (err) {
      console.error("Erro deletar conta:", err);
      alert("Erro ao deletar conta");
    }
  };

  // marcar linha para deletar (modo simples)
  const ativarModoDeletar = () => {
    setModoDeletar(true);
    setContaParaDeletar(null);
  };

  const handleClickLinha = (conta) => {
    if (modoDeletar) {
      setContaParaDeletar(conta.id);
    }
  };

  const confirmarDelecao = async () => {
    if (!contaParaDeletar) return;
    await handleDeleteConta(contaParaDeletar);
    setModoDeletar(false);
    setContaParaDeletar(null);
  };

  const getStatus = (conta) => {
    if (!conta) return "ok";
    if (conta.status === "pago") return "pago";
    if (!conta.vencimento) return "ok";
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    const venc = new Date(conta.vencimento);
    venc.setHours(0,0,0,0);
    const diffMs = venc - hoje;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "vencida";
    if (diffDays <= 3) return "quase";
    return "ok";
  };

  const contasFiltradas = contas
    .filter((c) => {
      if (filtro === "all") return true;
      if (filtro === "pagas") return c.status === "pago";
      const status = getStatus(c);
      if (filtro === "vencidas") return status === "vencida";
      if (filtro === "quase") return status === "quase";
      if (filtro === "ok") return status === "ok";
      return true;
    })
    .sort((a,b) => new Date(a.vencimento) - new Date(b.vencimento));

  const togglePago = async (conta) => {
    try {
      const novoStatus = conta.status === "pago" ? "pendente" : "pago";
      const { error } = await supabase
        .from("contas")
        .update({ status: novoStatus })
        .eq("id", conta.id);

      if (error) throw error;

      setContas((prev) => prev.map((c) => (c.id === conta.id ? { ...c, status: novoStatus } : c)));
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      alert("Erro ao atualizar status");
    }
  };

  // render
  if (!showTable) {
    return (
      <div className="text-white flex flex-col items-center justify-center p-6 mt-20">
        <h1 className="text-3xl md:text-5xl font-semibold text-center font-zalando mb-8">MINHAS TABELAS</h1>

        {!criandoNovaTabela ? (
          <div className="flex items-center justify-center">
            <button
              onClick={() => setCriandoNovaTabela(true)}
              className="bg-primaria font-zalando text-black font-semibold py-3 px-6 rounded-xl hover:bg-yellow-300 transition text-lg"
            >
              CRIAR TABELA
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Nome da tabela..."
              value={nomeNovaTabela}
              onChange={(e) => setNomeNovaTabela(e.target.value)}
              className="p-3 rounded-xl text-black font-zalando text-center w-64"
              onKeyPress={(e) => e.key === "Enter" && criarNovaTabela()}
            />
            <div className="flex gap-3">
              <button
                onClick={criarNovaTabela}
                className="bg-primaria font-zalando text-black font-semibold py-2 px-4 rounded-xl hover:bg-yellow-300 transition"
              >
                Criar
              </button>
              <button
                onClick={() => setCriandoNovaTabela(false)}
                className="bg-gray-500 font-zalando text-white font-semibold py-2 px-4 rounded-xl hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {tabelas.length > 0 && (
          <div className="mt-16 w-full max-w-2xl md:max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-semibold font-zalando text-center mb-16">Suas Tabelas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tabelas.map((tabela) => (
                <div
                  key={tabela.id}
                  onClick={() => selecionarTabela(tabela)}
                  className="bg-primaria text-terciaria p-4 rounded-xl cursor-pointer hover:bg-yellow-300 transition transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-zalando font-bold text-lg">{tabela.nome}</h3>
                    <button
                      onClick={(e) => deletarTabela(tabela.id, e)}
                      className="bg-vermelho text-white p-2 rounded-lg hover:bg-red-800"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-secundaria font-zalando mt-2">
                    Clique para abrir
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // TELA DA TABELA (detalhes)
  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      <div className="w-full max-w-5xl lg:max-w-7xl p-3 mt-10">
        <button
          onClick={voltarParaLista}
          className="bg-secundaria text-white font-zalando py-2 px-4 rounded-xl hover:bg-green-700 transition mb-4 flex items-center gap-2"
        >
          <FaArrowLeft />
          Voltar
        </button>

        <div className="flex justify-center items-center pt-10">
          <h1 className="font-zalando text-base">TABELA</h1>
        </div>

        {tabelaAtual && (
          <h2 className="text-2xl font-zalando text-center mb-6 text-primaria">{tabelaAtual.nome}</h2>
        )}

        {/* filtros e ações */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-4 ">
          <div className="flex gap-2 items-center relative">
            <label className="font-zalando mr-4">Filtrar:</label>

            {/* custom select com fundo preto e seta */}
            <div className="relative inline-block">
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="appearance-none p-2 rounded-md text-primaria bg-black font-zalando pr-8"
                style={{ minWidth: 160 }}
              >
                <option value="all">Todas</option>
                <option value="vencidas">Vencidas</option>
                <option value="quase">Quase (≤3 dias)</option>
                <option value="ok">Ok</option>
                <option value="pagas">Pagas</option>
              </select>

              {/* ícone de seta posicionado */}
              <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-primaria pointer-events-none" />
            </div>
          </div>

        
        </div>

        {/* Cabeçalho */} 
    <div className="bg-primaria font-zalando mx-1 text-black font-semibold rounded-xl 
  flex justify-between items-center px-3 py-3 gap-4">
  <span className="w-32 text-[11px] md:text-lg lg:text-2xl">NOME</span>
  <span className="w-32 text-[11px] md:text-lg lg:text-2xl">VENCIMENTO</span>
  <span className="w-24 text-[11px] md:text-lg lg:text-2xl  ">PARCELAS</span>
  <span className="w-32 text-[11px] md:text-lg lg:text-2xl text-center">VALOR</span>
  
</div>


        {/* Linhas da tabela */}
       {contasFiltradas.map((conta) => {
  const status = getStatus(conta);
  const valorParcela = calcularParcela(conta.valor, conta.parcelas);

  const rowClass =
    status === "pago"
      ? "bg-green-600 text-white"
      : status === "vencida"
      ? "bg-red-600 text-white"
      : status === "quase"
      ? "bg-yellow-300 text-black"
      : "bg-primaria text-black";

  return (
    <div
  key={conta.id}
  onClick={() => setContaParaDeletar(conta.id)}
  className={`font-zalando flex items-center justify-between px-3 py-3 mt-2 
  rounded-xl mx-1 transition-all ${
    conta.status === "pago"
      ? "bg-green-600 text-white"
      : getStatus(conta) === "vencida"
      ? "bg-red-600 text-white"
      : getStatus(conta) === "quase"
      ? "bg-yellow-300 text-black"
      : "bg-primaria text-black"
  } ${
    contaParaDeletar === conta.id ? "ring-4 ring-yellow-400" : ""
  }`}
>
  <span className="w-32 text-xs md:text-lg lg:text-xl">{conta.nome}</span>

  <span className="w-32 text-xs md:text-lg lg:text-xl">
    {formatarDataBR(conta.vencimento)}
  </span>

 <span className="w-24 text-xs md:text-lg lg:text-xl text-center flex justify-center items-center">
  {conta.parcelas ? `${conta.parcelas}x` : "-"}
</span>

<span className="w-44 text-xs md:text-lg lg:text-xl text-center flex justify-center items-center">
  {conta.parcelas && calcularParcela(conta.valor, conta.parcelas)
    ? `${formatMoney(calcularParcela(conta.valor, conta.parcelas))} x ${conta.parcelas}`
    : formatMoney(conta.valor)}
</span>


    

    
    </div>
  );
})}


        {/* Inputs para adicionar nova conta */}
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row gap-3 mt-6">
          <input
            type="text"
            placeholder="Nome da conta"
            value={novaConta.nome}
            onChange={(e) => setNovaConta({ ...novaConta, nome: e.target.value })}
            className="p-2 rounded-xl font-zalando text-black w-full md:w-1/4"
          />

          {/* input date -> garante formato YYYY-MM-DD */}
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            value={novaConta.vencimento}
            onChange={(e) => setNovaConta({ ...novaConta, vencimento: e.target.value })}
            className="p-2 rounded-xl font-zalando text-black w-full md:w-1/4"
          />

          <input
            type="number"
            placeholder="Parcelas"
            value={novaConta.parcelas}
            onChange={(e) => setNovaConta({ ...novaConta, parcelas: e.target.value })}
            className="p-2 rounded-xl font-zalando text-black w-full md:w-1/4"
            min="1"
          />

          <input
            type="number"
            placeholder="Valor a pagar"
            value={novaConta.valor}
            onChange={(e) => setNovaConta({ ...novaConta, valor: e.target.value })}
            className="p-2 rounded-xl font-zalando text-black w-full md:w-1/4"
            step="0.01"
          />
        </div>

<div className="flex flex-col md:flex-row gap-3 mt-5">
  
  {/* Adicionar */}
  <button
    onClick={handleAddConta}
    disabled={modoDeletar}
    className={`${modoDeletar ? "bg-gray-400" : "bg-primaria hover:bg-yellow-300"} 
      text-white p-3 rounded-xl flex items-center justify-center transition flex-1 font-zalando`}
  >
    <FaPlus className="mr-2" />
    Adicionar
  </button>

  {/* Deletar linha */}
  {!modoDeletar ? (
    <button
      onClick={ativarModoDeletar}
      className="bg-vermelho text-white font-zalando p-3 rounded-xl flex items-center justify-center hover:bg-red-500 transition flex-1"
    >
      <FaTrash className="mr-2" />
      Deletar Linha
    </button>
  ) : (
    <div className="flex gap-3 flex-1">
      <button
        onClick={confirmarDelecao}
        disabled={!contaParaDeletar}
        className={`${!contaParaDeletar ? "bg-gray-400" : "bg-vermelho hover:bg-red-500"} 
        text-black p-3 rounded-xl flex items-center justify-center transition flex-1 font-zalando`}
      >
        Confirmar Deleção
      </button>

      <button
        onClick={() => {
          setModoDeletar(false);
          setContaParaDeletar(null);
        }}
        className="bg-gray-500 text-white font-zalando p-3 rounded-xl flex items-center justify-center hover:bg-gray-600 transition flex-1"
      >
        Cancelar
      </button>
    </div>
  )}

  {/* BOTÃO PAGAR / DESMARCAR */}
  {contaParaDeletar && !modoDeletar && (
    <button
      onClick={() => togglePago(contas.find(c => c.id === contaParaDeletar))}
      className={`${
        contas.find(c => c.id === contaParaDeletar).status === "pago"
          ? "bg-red-700 hover:bg-red-800"
          : "bg-green-600 hover:bg-green-700"
      } 
      text-white font-zalando p-3 rounded-xl flex items-center justify-center transition flex-1`}
    >
      {contas.find(c => c.id === contaParaDeletar).status === "pago"
        ? "Desmarcar Pago"
        : "Marcar como Pago"}
    </button>
  )}

</div>



      <div className="mt-6 flex gap-4 items-center justify-center font-zalando text-sm">
        <div className="flex items-center gap-2">
          <p className="h-3 w-3 rounded-full bg-red-600"></p>
        <p>Atrasada</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="h-3 w-3 rounded-full bg-yellow-600"></p>
        <p>Pendente</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="h-3 w-3 rounded-full bg-green-600"></p>
        <p>Pago</p>
        </div>
      </div>

        {/* Mensagem modo deletar */}
        {modoDeletar && (
          <div className="mt-4 p-3 bg-terciaria rounded-xl font-zalando text-center">
            <p className="text-white font-zalando">
              {contaParaDeletar ? `Pronto para remover a conta selecionada.` : "Modo deletar ativado! Clique na conta para selecionar."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
