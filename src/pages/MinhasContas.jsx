import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaArrowLeft, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TbCancel } from "react-icons/tb";
import { motion } from "framer-motion";

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

  // pagamentos (histórico)
  const [pagamentos, setPagamentos] = useState([]);

  // modal pagamento (registrar)
  const [mostrarModalPagamento, setMostrarModalPagamento] = useState(false);
  const [contaParaPagar, setContaParaPagar] = useState(null);
  const [parcelasPagas, setParcelasPagas] = useState(1);

  // modal cancelar pagamento
  const [mostrarModalCancelar, setMostrarModalCancelar] = useState(false);
  const [pagamentoParaCancelar, setPagamentoParaCancelar] = useState(null);
  const [parcelasCancelar, setParcelasCancelar] = useState(1);

  // seleção de pagamento no histórico (item selecionado)
  const [pagamentoSelecionadoId, setPagamentoSelecionadoId] = useState(null);

  /* =====================
   VARIANTS
===================== */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // tempo entre um card e outro
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

const listContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const listItemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};




  // Carregar tabelas do Supabase quando user estiver pronto
  useEffect(() => {
    if (!user) return;
    loadTabelas();
  }, [user]);

  useEffect(() => {
    if (tabelaAtual) {
      loadPagamentos();
    } else {
      setPagamentos([]);
      setPagamentoSelecionadoId(null);
    }
  }, [tabelaAtual]);

  // ---------- Helpers ----------
  const formatarDataBR = (iso) => {
    if (!iso) return "";
    const d = parseDateAsUTC(iso);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };


  const parseDateAsUTC = (dateStr) => {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  };


  const isPastDate = (isoDate) => {
    if (!isoDate) return false;

    const venc = parseDateAsUTC(isoDate);

    const hoje = new Date();
    const hojeUTC = new Date(Date.UTC(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    ));

    return venc < hojeUTC;
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
        .select("id, nome, vencimento, parcelas, valor, status, tabela_id, created_at")
        .eq("tabela_id", tabelaId)
        .order("vencimento", { ascending: true });

      if (error) throw error;
      setContas(data || []);
    } catch (err) {
      console.error("Erro ao carregar contas:", err);
    }
  };

  const loadPagamentos = async () => {
    if (!tabelaAtual) return;
    try {
      const { data, error } = await supabase
        .from("pagamentos")
        .select("*")
        .eq("tabela_id", tabelaAtual.id)
        .order("pago_em", { ascending: false });

      if (error) throw error;
      setPagamentos(data || []);
      setPagamentoSelecionadoId(null);
    } catch (err) {
      console.error("Erro ao carregar pagamentos:", err);
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
    await loadPagamentos();
  };

  const voltarParaLista = () => {
    setTabelaAtual(null);
    setShowTable(false);
    setContas([]);
    setModoDeletar(false);
    setContaParaDeletar(null);
    setNovaConta({ nome: "", vencimento: "", parcelas: "", valor: "" });
    setPagamentos([]);
    setPagamentoSelecionadoId(null);
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
      // 1. Deletar pagamentos vinculados à conta
      const { error: erroPagamentos } = await supabase
        .from("pagamentos")
        .delete()
        .eq("conta_id", contaId);

      if (erroPagamentos) {
        console.error("Erro ao deletar pagamentos:", erroPagamentos);
        alert("Erro ao remover pagamentos da conta.");
        return;
      }

      // 2. Deletar a conta
      const { error: erroConta } = await supabase
        .from("contas")
        .delete()
        .eq("id", contaId);

      if (erroConta) {
        console.error("Erro ao deletar conta:", erroConta);
        alert("Erro ao remover a conta.");
        return;
      }

      // 3. Remover do estado local
      setContas((prev) => prev.filter((c) => c.id !== contaId));

      // 4. Atualizar tabelas e pagamentos (importante para o Dashboard)
      await loadTabelas();
      await loadPagamentos();

    } catch (err) {
      console.error("Erro deletar conta:", err);
      alert("Erro inesperado ao deletar conta.");
    }
  };


  // marcar linha para deletar (agora também seleciona para ações)
  const ativarModoDeletar = () => {
    setModoDeletar(true);
    setContaParaDeletar(null);
  };

  const handleClickLinha = (conta) => {
    // seleciona a conta que será usada pelos botões abaixo
    setContaParaDeletar(contaParaDeletar === conta.id ? null : conta.id);
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

    const venc = parseDateAsUTC(conta.vencimento);

    const hoje = new Date();
    const hojeUTC = new Date(Date.UTC(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    ));

    const diffDays = Math.floor((venc - hojeUTC) / 86400000);

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
    .sort((a, b) => {
      const da = parseDateAsUTC(a.vencimento);
      const db = parseDateAsUTC(b.vencimento);
      return da - db;
    });


  // abrir modal de pagamento (escolher quantas parcelas)
  const abrirModalPagamento = (conta) => {
    if (!conta) return;
    setContaParaPagar(conta);
    setParcelasPagas(1);
    setMostrarModalPagamento(true);
  };

  // confirmar pagamento parcial/total
  const confirmarPagamento = async () => {
    if (!contaParaPagar) return;
    try {
      const conta = contaParaPagar;
      const parcelasOriginais = conta.parcelas ? Number(conta.parcelas) : 1;
      const valorTotal = Number(conta.valor) || 0;
      const valorParcela = parcelasOriginais ? (valorTotal / parcelasOriginais) : valorTotal;
      const qtdPagas = Number(parcelasPagas);

      // valor pago neste registro
      const valorPagoRegistro = Number((valorParcela * qtdPagas).toFixed(2));

      // inserir registro em pagamentos
      const { error: errInsert } = await supabase
        .from("pagamentos")
        .insert([{
          conta_id: conta.id,
          tabela_id: conta.tabela_id,
          parcelas_pagas: qtdPagas,
          valor_pago: valorPagoRegistro,
          user_id: user.id
        }]);
      if (errInsert) throw errInsert;

      // calcular novas parcelas e novo valor restante
      const novasParcelas = parcelasOriginais - qtdPagas;
      const novoValor = Number((valorParcela * Math.max(novasParcelas, 0)).toFixed(2));

      // atualizar conta: se zerou, marcar status pago e limpar parcelas/valor; senão reduzir
      const { error: errUpdate } = await supabase
        .from("contas")
        .update({
          parcelas: novasParcelas <= 0 ? null : novasParcelas,
          valor: novasParcelas <= 0 ? null : novoValor,
          status: novasParcelas <= 0 ? "pago" : "pendente"
        })
        .eq("id", conta.id);

      if (errUpdate) throw errUpdate;

      // recarregar dados
      await loadContas(tabelaAtual.id);
      await loadPagamentos();

      setMostrarModalPagamento(false);
      setContaParaPagar(null);
      // se seleção era a conta, desmarcar
      if (contaParaDeletar === conta.id) setContaParaDeletar(null);

    } catch (err) {
      console.error("Erro ao confirmar pagamento:", err);
      alert("Erro ao registrar pagamento");
    }
  };

  // cancelar pagamento (desfazer total/parcial)
  const cancelarPagamento = async () => {
    if (!pagamentoParaCancelar) return;

    try {
      const pagamento = pagamentoParaCancelar;
      // buscar conta atual (pode ter sido alterada)
      const conta = await (async () => {
        const c = contas.find(c => c.id === pagamento.conta_id);
        if (c) return c;
        // fallback: buscar no servidor
        const { data: contaServer, error: err } = await supabase
          .from("contas")
          .select("*")
          .eq("id", pagamento.conta_id)
          .single();
        if (err) throw err;
        return contaServer;
      })();

      if (!conta) {
        alert("Conta não encontrada");
        return;
      }

      // valor por parcela aproximado
      const valorParcela = pagamento.parcelas_pagas && pagamento.parcelas_pagas > 0
        ? pagamento.valor_pago / pagamento.parcelas_pagas
        : (conta.valor && conta.parcelas ? Number(conta.valor) / Number(conta.parcelas) : 0);

      const qtdCancelar = Number(parcelasCancelar);
      if (qtdCancelar <= 0) return alert("Escolha ao menos 1 parcela para desfazer.");

      // novas parcelas da conta = (parcelas atuais ou 0) + qtdCancelar
      // Nota: aqui assumimos que `conta.parcelas` guarda parcelas restantes (ou null)
      const parcelasAtuais = conta.parcelas ? Number(conta.parcelas) : 0;
      const novasParcelas = parcelasAtuais + qtdCancelar;
      const novoValor = Number((novasParcelas * valorParcela).toFixed(2));

      // atualizar conta
      const { error: errUpdate } = await supabase
        .from("contas")
        .update({
          parcelas: novasParcelas <= 0 ? null : novasParcelas,
          valor: novasParcelas <= 0 ? null : novoValor,
          status: "pendente"
        })
        .eq("id", conta.id);

      if (errUpdate) throw errUpdate;

      // ajustar / remover registro de pagamento
      if (qtdCancelar >= pagamento.parcelas_pagas) {
        // remover o pagamento por completo
        const { error: errDel } = await supabase.from("pagamentos").delete().eq("id", pagamento.id);
        if (errDel) throw errDel;
      } else {
        const novasParcelasPagas = pagamento.parcelas_pagas - qtdCancelar;
        const novoValorPago = Number((novasParcelasPagas * valorParcela).toFixed(2));
        const { error: errUpd } = await supabase
          .from("pagamentos")
          .update({
            parcelas_pagas: novasParcelasPagas,
            valor_pago: novoValorPago
          })
          .eq("id", pagamento.id);
        if (errUpd) throw errUpd;
      }

      // recarregar
      await loadContas(tabelaAtual.id);
      await loadPagamentos();

      setMostrarModalCancelar(false);
      setPagamentoParaCancelar(null);
      setPagamentoSelecionadoId(null);
    } catch (err) {
      console.error("Erro ao cancelar pagamento:", err);
      alert("Erro ao cancelar pagamento");
    }
  };

  // abrir modal de cancelar para o pagamento selecionado no histórico
  const abrirModalCancelarSelecionado = () => {
    if (!pagamentoSelecionadoId) return alert("Selecione um pagamento no histórico primeiro.");
    const p = pagamentos.find(pp => pp.id === pagamentoSelecionadoId);
    if (!p) return alert("Pagamento não encontrado.");
    setPagamentoParaCancelar(p);
    setParcelasCancelar(1);
    setMostrarModalCancelar(true);
  };

  // botão para "marcar como pago" (abrir modal usando a conta selecionada)
  const handleAbrirPagamentoSelecionada = () => {
    const conta = contas.find(c => c.id === contaParaDeletar);
    if (!conta) return alert("Selecione uma conta primeiro.");
    abrirModalPagamento(conta);
  };


  // render
  if (!showTable) {
    return (
      <motion.div className="text-white flex flex-col items-center justify-center p-6 mt-20"


      >
        <motion.h1 className="text-3xl md:text-5xl font-semibold text-center font-zalando mb-8"
          initial={{
            opacity: 0,
            y: 100,
            filter: "blur(10px)"
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
          }}
          exit={{
            opacity: 0,
            y: -100,
            filter: "blur(10px)"
          }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}

        >
          MINHAS TABELAS
        </motion.h1>

        {!criandoNovaTabela ? (
          <motion.div className="flex items-center justify-center"
            initial={{
              opacity: 0,
              y: 100,
              filter: "blur(10px)"
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)"
            }}
            exit={{
              opacity: 0,
              y: -100,
              filter: "blur(10px)"
            }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut"
            }}
          >
            <button
              onClick={() => setCriandoNovaTabela(true)}
              className="bg-primaria font-zalando text-black font-semibold py-3 px-6 rounded-xl hover:bg-yellow-300 transition text-lg"
            >
              CRIAR TABELA
            </button>
          </motion.div>
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
            <motion.h2 className="text-4xl md:text-5xl font-semibold font-zalando text-center mb-16"
              initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut"
              }}
            >
              Suas Tabelas
            </motion.h2>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4"
             variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
   delay={0.5}
  >
              {tabelas.map((tabela) => (
                <motion.div
                  key={tabela.id}
                  variants={cardVariants}
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
                </motion.div>
              ))}
            </motion.div>
          </div>

        )}
      </motion.div>

    );

  }

  // TELA DA TABELA (detalhes)
  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      <div className="w-full max-w-5xl lg:max-w-7xl p-3 mt-10">
        <motion.button
                  initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}  
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: "easeOut"
              }}

          onClick={voltarParaLista}
          className="bg-secundaria text-white font-zalando py-2 px-4 rounded-xl hover:bg-green-700 transition mb-4 flex items-center gap-2"
        >
          <FaArrowLeft />
          Voltar
        </motion.button>

        <div className="flex justify-center items-center pt-10">
          <motion.h1 className="font-zalando text-base"
                initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: "easeOut"
              }}
              >TABELA
              </motion.h1>
        </div>

        {tabelaAtual && (
          <motion.h2 
                initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: "easeOut"
              }}
              delay={0.5}
              className="text-2xl font-zalando text-center mb-6 text-primaria">{tabelaAtual.nome}</motion.h2>
        )}

        {/* filtros e ações */}
        <motion.div className="flex flex-col md:flex-row items-center gap-3 mb-4 "
              initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: "easeOut"
              }}
        >
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
        </motion.div>

        {/* Cabeçalho */}
        <motion.div className="bg-primaria font-zalando mx-1 text-black font-semibold rounded-xl 
  flex justify-between items-center px-3 py-3 gap-4"
        initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: "easeOut"
              }}
              >
          <span className="w-32 text-[11px] md:text-lg lg:text-2xl">NOME</span>
          <span className="w-32 text-[11px] md:text-lg lg:text-2xl">VENCIMENTO</span>
          <span className="w-24 text-[11px] md:text-lg lg:text-2xl  ">PARCELAS</span>
          <span className="w-32 text-[11px] md:text-lg lg:text-2xl text-center">VALOR</span>
        </motion.div>


        {/* Linhas da tabela */}
        {contasFiltradas.map((conta) => {
          const valorParcela = calcularParcela(conta.valor, conta.parcelas);

          return (
        <motion.div
  key={conta.id}
 
   initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: "easeOut"
              }}

  onClick={() => handleClickLinha(conta)}
  className={`font-zalando flex items-center justify-between px-3 py-3 mt-2 
    rounded-xl mx-1 transition-all
    ${conta.status === "pago"
      ? "bg-green-600 text-white"
      : getStatus(conta) === "vencida"
        ? "bg-red-600 text-white"
        : getStatus(conta) === "quase"
          ? "bg-yellow-300 text-black"
          : "bg-primaria text-black"
    }
    ${contaParaDeletar === conta.id ? "ring-4 ring-yellow-400" : ""}`}
>
  <span
   initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: "easeOut"
              }}
               className="w-32 text-xs md:text-lg lg:text-xl">{conta.nome}</span>

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
</motion.div>


          );
        })}

        {/* Inputs para adicionar nova conta */}
        <motion.div className="flex flex-col space-y-3 md:space-y-0 md:flex-row gap-3 mt-6"
        initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.8,
                ease: "easeOut"
              }}
        >
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
        </motion.div>

        <div className="flex flex-col md:flex-row gap-3 mt-5">
          {/* Adicionar */}
          <motion.button
           initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: "easeOut"
              }}
              
            onClick={handleAddConta}
            disabled={modoDeletar}
            className={`${modoDeletar ? "bg-gray-400" : "bg-primaria hover:bg-yellow-300"} 
      text-white p-3 rounded-xl flex items-center justify-center transition flex-1 font-zalando`}
          >
            <FaPlus className="mr-2" />
            Adicionar
          </motion.button>
          {/* Deletar linha */}
          {!modoDeletar ? (
            <motion.button
              initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: "easeOut"
              }}
              onClick={ativarModoDeletar}
              className="bg-vermelho text-white font-zalando p-3 rounded-xl flex items-center justify-center hover:bg-red-500 transition flex-1"
            >
              <FaTrash className="mr-2" />
              Deletar Linha
            </motion.button>
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

          {/* BOTÃO PAGAR / DESMARCAR (aparece quando há uma conta selecionada e não estamos no modo deletar) */}
          {contaParaDeletar && !modoDeletar && (
            <button
              onClick={handleAbrirPagamentoSelecionada}
              className={`${(contas.find(c => c.id === contaParaDeletar) || {}).status === "pago"
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-green-600 hover:bg-green-700"
                } 
      text-white font-zalando p-3 rounded-xl flex items-center justify-center transition flex-1`}
            >
              {(contas.find(c => c.id === contaParaDeletar) || {}).status === "pago"
                ? "Desmarcar Pago"
                : "Marcar como Pago"}
            </button>
          )}
        </div>

        {/* Histórico de pagamentos (Contas Pagas) */}
        <motion.h2 className="mt-10 text-xl font-zalando text-center"
         initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: "easeOut"
              }}
              >
                Histórico de Pagamentos
                </motion.h2>

        <motion.div className="bg-black bg-opacity-10 p-4 rounded-xl mt-4"
         initial={{
                opacity: 0,
                y: 100,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                filter: "blur(10px)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: "easeOut"
              }}
              >
          {pagamentos.length === 0 ? (
            <p className="text-center text-gray-300 font-zalando">Nenhum pagamento registrado ainda</p>
          ) : (
            pagamentos.map((p) => {
              const contaOriginal = contas.find(c => c.id === p.conta_id);

              const selected = pagamentoSelecionadoId === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    // selecionar pagamento para cancelar
                    setPagamentoSelecionadoId(selected ? null : p.id);
                    // também atualizar o objeto que será usado no modal
                    setPagamentoParaCancelar(selected ? null : p);
                  }}
                  className={`font-zalando flex items-center justify-between px-3 py-3 mt-2 
                  rounded-xl mx-1 transition-all ${selected ? "ring-4 ring-yellow-400 bg-primaria text-black" : "bg-primaria text-black"}`}
                  style={{ cursor: "pointer" }}
                >
                  {/* NOME */}
                  <span className="w-32 text-xs md:text-lg lg:text-xl">
                    {contaOriginal?.nome || "Conta"}
                  </span>

                  {/* DATA */}
                  <span className="w-32 text-xs md:text-lg lg:text-xl">
                    {formatarDataBR(p.pago_em)}
                  </span>

                  {/* PARCELAS */}
                  <span className="w-24 text-xs md:text-lg lg:text-xl text-center">
                    {p.parcelas_pagas}x
                  </span>

                  {/* VALOR */}
                  <span className="w-32 text-xs md:text-lg lg:text-xl text-center">
                    {formatMoney(p.valor_pago)}
                  </span>
                </div>
              );
            })
          )}
        </motion.div>

        {/* BOTÃO '↩ Cancelar Pagamento' - embaixo do histórico */}

        <div className="mt-4 flex justify-center  ">
          <button
            onClick={abrirModalCancelarSelecionado}
            disabled={!pagamentoSelecionadoId}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-zalando ${pagamentoSelecionadoId ? "bg-red-700 hover:bg-red-800 text-white" : "bg-gray-500 text-white cursor-not-allowed"
              }`}
          >
            <span >
              <TbCancel />
            </span>
            Cancelar Pagamento
          </button>

        </div>
        <div className=" items-center flex justify-center">
          <p className="font-zalando text-xs mt-2 text-white/40">Para cancelar selecione a conta</p>
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

        {/* MODAL PAGAMENTO (registrar pagamento parcial/total) */}
        {mostrarModalPagamento && contaParaPagar && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white text-black p-6 rounded-xl max-w-sm w-full font-zalando">
              <h2 className="text-xl font-bold mb-4 text-center font-zalando">Quantas parcelas você pagou?</h2>

              <p className="mb-2 text-center">Conta: <strong>{contaParaPagar.nome}</strong></p>
              <p className="mb-2 text-center">Parcelas restantes: {contaParaPagar.parcelas || 1}</p>

              <select
                value={parcelasPagas}
                onChange={(e) => setParcelasPagas(Number(e.target.value))}
                className="w-full p-3 border rounded-xl mb-4"
              >
                {Array.from({ length: Math.max(Number(contaParaPagar.parcelas || 1), 1) }, (_, i) => i + 1)
                  .map(n => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "parcela" : "parcelas"}
                    </option>
                  ))}
              </select>

              <div className="flex gap-3">
                <button
                  onClick={confirmarPagamento}
                  className="bg-secundaria hover:bg-green-900 text-white p-3 rounded-xl flex-1"
                >
                  Confirmar
                </button>

                <button
                  onClick={() => { setMostrarModalPagamento(false); setContaParaPagar(null); }}
                  className="bg-red-600 hover:bg-red-800 text-white p-3 rounded-xl flex-1"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL CANCELAR (desfazer parcelas pagas) */}
        {mostrarModalCancelar && pagamentoParaCancelar && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white text-black p-6 rounded-xl max-w-sm w-full font-zalando">
              <h2 className="text-xl font-bold mb-4 text-center">Cancelar pagamento</h2>

              <p className="mb-2 text-center">
                Conta: <strong>{contas.find(c => c.id === pagamentoParaCancelar.conta_id)?.nome || "Conta"}</strong>
              </p>

              <p className="mb-2 text-center">
                Pagou: {pagamentoParaCancelar.parcelas_pagas} {pagamentoParaCancelar.parcelas_pagas === 1 ? "parcela" : "parcelas"}
              </p>

              <select
                value={parcelasCancelar}
                onChange={(e) => setParcelasCancelar(Number(e.target.value))}
                className="w-full p-3 border rounded-xl mb-4"
              >
                {Array.from({ length: pagamentoParaCancelar.parcelas_pagas }, (_, i) => i + 1)
                  .map(n => (
                    <option key={n} value={n}>
                      Desfazer {n} {n === 1 ? "parcela" : "parcelas"}
                    </option>
                  ))}
              </select>

              <div className="flex gap-3 items-center justify-center">
                <button
                  onClick={cancelarPagamento}
                  className="bg-red-700 text-white p-3 rounded-xl flex-1"
                >
                  Confirmar
                </button>

                <button
                  onClick={() => { setMostrarModalCancelar(false); setPagamentoParaCancelar(null); setPagamentoSelecionadoId(null); }}
                  className="bg-gray-500 text-white p-3 rounded-xl flex-1"
                >
                  Fechar
                </button>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
