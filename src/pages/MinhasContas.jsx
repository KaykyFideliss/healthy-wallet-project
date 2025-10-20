import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";


const MinhasContas = () => {
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
    const [modoDeletar, setModoDeletar] = useState(false);
    const [contaParaDeletar, setContaParaDeletar] = useState(null);
    const [criandoNovaTabela, setCriandoNovaTabela] = useState(false);
    const [nomeNovaTabela, setNomeNovaTabela] = useState("");

    // Carregar tabelas do localStorage
    useEffect(() => {
        const tabelasSalvas = localStorage.getItem('minhasTabelasContas');
        if (tabelasSalvas) {
            setTabelas(JSON.parse(tabelasSalvas));
        }
    }, []);

    // Salvar tabelas no localStorage
    useEffect(() => {
        localStorage.setItem('minhasTabelasContas', JSON.stringify(tabelas));
    }, [tabelas]);

    // Quando muda a tabela atual, atualiza as contas
    useEffect(() => {
        if (tabelaAtual) {
            setContas(tabelaAtual.contas || []);
        }
    }, [tabelaAtual]);

    const handleCreateTable = () => {
        setCriandoNovaTabela(true);
    };

    const criarNovaTabela = () => {
        if (!nomeNovaTabela.trim()) return;

        const novaTabela = {
            id: Date.now(),
            nome: nomeNovaTabela,
            contas: [],
            criadaEm: new Date().toLocaleDateString('pt-BR')
        };

        setTabelas([...tabelas, novaTabela]);
        setTabelaAtual(novaTabela);
        setNomeNovaTabela("");
        setCriandoNovaTabela(false);
        setShowTable(true);
    };

    const selecionarTabela = (tabela) => {
        setTabelaAtual(tabela);
        setShowTable(true);
    };

    const voltarParaLista = () => {
        // Salva as alterações na tabela atual antes de voltar
        if (tabelaAtual) {
            const tabelaAtualizada = {
                ...tabelaAtual,
                contas: contas
            };
            const novasTabelas = tabelas.map(t =>
                t.id === tabelaAtualizada.id ? tabelaAtualizada : t
            );
            setTabelas(novasTabelas);
        }

        setTabelaAtual(null);
        setShowTable(false);
        setModoDeletar(false);
        setContaParaDeletar(null);
        setNovaConta({ nome: "", vencimento: "", parcelas: "", valor: "" });
    };

    const handleAddConta = () => {
        if (!novaConta.nome || !novaConta.vencimento || !novaConta.valor) return;

        const novasContas = [...contas, novaConta];
        setContas(novasContas);

        // Atualiza a tabela atual
        if (tabelaAtual) {
            const tabelaAtualizada = {
                ...tabelaAtual,
                contas: novasContas
            };
            const novasTabelas = tabelas.map(t =>
                t.id === tabelaAtualizada.id ? tabelaAtualizada : t
            );
            setTabelas(novasTabelas);
        }

        setNovaConta({ nome: "", vencimento: "", parcelas: "", valor: "" });
    };

    const ativarModoDeletar = () => {
        setModoDeletar(true);
        setContaParaDeletar(null);
    };

    const handleClickLinha = (index) => {
        if (modoDeletar) {
            setContaParaDeletar(index);
        }
    };

    const confirmarDelecao = () => {
        if (contaParaDeletar !== null) {
            const novasContas = contas.filter((_, i) => i !== contaParaDeletar);
            setContas(novasContas);

            // Atualiza a tabela atual
            if (tabelaAtual) {
                const tabelaAtualizada = {
                    ...tabelaAtual,
                    contas: novasContas
                };
                const novasTabelas = tabelas.map(t =>
                    t.id === tabelaAtualizada.id ? tabelaAtualizada : t
                );
                setTabelas(novasTabelas);
            }

            cancelarDelecao();
        }
    };

    const cancelarDelecao = () => {
        setModoDeletar(false);
        setContaParaDeletar(null);
    };

    const deletarTabela = (id, e) => {
        e.stopPropagation();
        if (window.confirm("Tem certeza que quer deletar esta tabela?")) {
            const novasTabelas = tabelas.filter(t => t.id !== id);
            setTabelas(novasTabelas);
            if (tabelaAtual && tabelaAtual.id === id) {
                voltarParaLista();
            }
        }
    };

    // Tela de listagem de tabelas
    if (!showTable) {
        return (
            <div className="  text-white flex flex-col items-center justify-center p-6  mt-20">
                <h1 className="text-3xl md:text-5xl  font-semibold  text-center font-zalando mb-8">MINHAS TABELAS</h1>

                {!criandoNovaTabela ? (
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handleCreateTable}
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
                            onKeyPress={(e) => e.key === 'Enter' && criarNovaTabela()}
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

                {/* Lista de tabelas existentes */}
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
                                        <h3 className="font-zalando font-bold text-lg">
                                            {tabela.nome}
                                        </h3>
                                        <button
                                            onClick={(e) => deletarTabela(tabela.id, e)}
                                            className="bg-vermelho text-white p-2 rounded-lg hover:bg-red-800"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-secundaria font-zalando mt-2">
                                        {tabela.contas.length} conta(s)
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Tela da tabela (mantendo SEU layout original)
    return (
        <div className="min-h-screen text-white flex flex-col items-center">
            <div className="w-full max-w-5xl lg:max-w-7xl p-3 mt-10">
                {/* Botão Voltar */}
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
                {/* Nome da Tabela Atual */}
                {tabelaAtual && (

                    <h2 className="text-2xl font-zalando text-center mb-6 text-primaria">
                        {tabelaAtual.nome}
                    </h2>
                )}

                {/* Cabeçalho */}
                <div className="bg-primaria font-zalando mx-1 text-black font-semibold rounded-xl flex justify-between md:justify-around pl-1 pr-1 py-3">
                    <span className="text-xs md:text-lg lg:text-3xl">NOME</span>
                    <span className="text-xs pl-0 md:text-lg md:pl-14 lg:text-3xl">VENCIMENTO</span>
                    <span className="text-xs md:text-lg lg:text-3xl">PARCELAS</span>
                    <span className="text-xs md:text-lg lg:text-3xl">VALOR</span>
                </div>

                {/* Linhas da tabela */}
                {contas.map((conta, index) => (
                    <div
                        key={index}
                        onClick={() => handleClickLinha(index)}
                        className={`font-zalando text-black flex justify-between lg:gap-4 px-1 md:px-16 lg:px-20 py-1 mt-2 rounded-xl mx-1 items-center cursor-pointer transition-all ${modoDeletar
                                ? contaParaDeletar === index
                                    ? 'bg-yellow-500 animate-pulse'
                                    : 'bg-primaria hover:bg-yellow-300'
                                : 'bg-primaria'
                            }`}
                    >
                        <span className="text-xs w-16 md:w-24 md:text-lg lg:text-2xl break-keep">{conta.nome}</span>
                        <span className="w-28 text-[12px] md:w-36 md:text-[17px]">{conta.vencimento}</span>
                        <span className="text-base items-center flex justify-center w-16">{conta.parcelas}</span>
                        <span className="text-xs flex justify-center w-16 md:text-lg md:pl-6">{conta.valor}</span>
                    </div>
                ))}

                {/* Inputs para adicionar nova conta */}
                <div className="flex flex-col md:flex-row gap-3 mt-6">
                    <input
                        type="text"
                        placeholder="Nome da conta"
                        value={novaConta.nome}
                        onChange={(e) => setNovaConta({ ...novaConta, nome: e.target.value })}
                        className="p-2 min-w-0 rounded-xl font-zalando text-black w-full md:w-1/4"

                    />

                    <input
                        type="text"
                        placeholder="DD/MM/AAAA"
                        value={novaConta.vencimento}
                        onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length > 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2);
                            }
                            if (value.length > 5) {
                                value = value.substring(0, 5) + '/' + value.substring(5, 9);
                            }
                            if (value.length === 10) {
                                const [dia, mes, ano] = value.split('/').map(Number);
                                if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 2025) {
                                    alert('Data inválida! Verifique dia, mês e ano.');
                                    return;
                                }
                                const dataDigitada = new Date(ano, mes - 1, dia);
                                const dataAtual = new Date();
                                dataAtual.setHours(0, 0, 0, 0);
                                const dataValida =
                                    dataDigitada.getDate() === dia &&
                                    dataDigitada.getMonth() === mes - 1 &&
                                    dataDigitada.getFullYear() === ano;
                                if (!dataValida) {
                                    alert('Data inválida! Este dia não existe neste mês.');
                                    return;
                                }
                                if (dataDigitada < dataAtual) {
                                    alert('Não é possível adicionar uma data passada!');
                                    return;
                                }
                            }
                            setNovaConta({ ...novaConta, vencimento: value });
                        }}
                        className="p-2 rounded-xl text-black w-full md:w-1/4 font-zalando"
                        maxLength={10}
                    />

                    <input
                        type="number"
                        placeholder="Parcelas"
                        value={novaConta.parcelas}
                        onChange={(e) => setNovaConta({ ...novaConta, parcelas: e.target.value })}
                        className="p-2 rounded-xl font-zalando text-black w-full md:w-1/4"
                    />

                    <input
                        type="number"
                        placeholder="Valor a pagar"
                        value={novaConta.valor}
                        onChange={(e) => setNovaConta({ ...novaConta, valor: e.target.value })}
                        className="p-2 rounded-xl font-zalando text-black w-full md:w-1/4"
                    />
                </div>

                {/* Botões */}
                <div className="flex flex-col md:flex-row gap-3 mt-5">
                    <button
                        onClick={handleAddConta}
                        disabled={modoDeletar}
                        className={`${modoDeletar ? 'bg-gray-400' : 'bg-primaria hover:bg-yellow-300'
                            } text-white p-3 rounded-xl flex items-center justify-center transition flex-1 font-zalando`}
                    >
                        <FaPlus className="mr-2" />
                        Adicionar
                    </button>

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
                                disabled={contaParaDeletar === null}
                                className={`${contaParaDeletar === null ? 'bg-gray-400' : 'bg-vermelho hover:bg-red-500'
                                    } text-black p-3 rounded-xl flex items-center justify-center transition flex-1 font-zalando`}
                            >
                                Confirmar Deleção
                            </button>
                            <button
                                onClick={cancelarDelecao}
                                className="bg-gray-500 text-white font-zalando p-3 rounded-xl flex items-center justify-center hover:bg-gray-600 transition flex-1"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>

                {/* Mensagem de confirmação */}
                {modoDeletar && (
                    <div className="mt-4 p-3 bg-terciaria rounded-xl font-zalando text-center">
                        <p className="text-white font-zalando">
                            {contaParaDeletar !== null
                                ? `Você tem certeza que quer apagar a conta "${contas[contaParaDeletar]?.nome}"?`
                                : "Modo deletar ativado! Clique na linha que deseja apagar."
                            }
                        </p>
                    </div>
                )}
            </div>
  
        </div>

        
    );
};

export default MinhasContas;