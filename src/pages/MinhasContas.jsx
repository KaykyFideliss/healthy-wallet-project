import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const MinhasContas = () => {
    const [showTable, setShowTable] = useState(false);
    const [contas, setContas] = useState([]);
    const [novaConta, setNovaConta] = useState({
        nome: "",
        vencimento: "",
        parcelas: "",
        valor: ""
    });

    const handleCreateTable = () => {
        setShowTable(true);
    };

    const handleAddConta = () => {
        if (!novaConta.nome || !novaConta.vencimento || !novaConta.valor) return;
        setContas([...contas, novaConta]);
        setNovaConta({ nome: "", vencimento: "", parcelas: "", valor: "" });
    };

    const handleDelete = (index) => {
        const novas = contas.filter((_, i) => i !== index);
        setContas(novas);
    };

    return (

        <div className="  min-h-screen text-white flex flex-col items-center ">
            {!showTable ? (

                <div className="flex items-center justify-center min-h-screen">
                    <button
                        onClick={handleCreateTable}
                        className="bg-primaria font-zalando text-black font-semibold py-3 px-6 rounded-xl hover:bg-yellow-300 transition"
                    >
                        CRIAR TABELA
                    </button>
                </div>


            )

                : (
                    <div className="w-full max-w-5xl mt-10">
                        {/* Cabeçalho */}
                        <div className="bg-primaria gap-1 font-zalando mx-1 text-black font-semibold rounded-xl flex justify-between pl-1 pr-1 py-3">
                            <span className="  text-xs ">NOME</span>
                            <span className="  text-xs ">VENCIMENTO</span>
                            <span className=" text-xs ">PARCELAS</span>
                            <span className="  text-xs ">VALOR</span>
                        </div>

                        {/* Linhas da tabela */}
                        {contas.map((conta, index) => (
                            <div
                                key={index}
                                className="bg-primaria font-zalando text-black flex justify-between px-1 py-1 mt-2 rounded-xl mx-1 items-center"
                            >
                                <span className="text-base ">{conta.nome}</span>
                                <span className="text-base ">{conta.vencimento}</span>
                                <span className="text-base ">{conta.parcelas}</span>
                                <span className="text-base ">{conta.valor}</span>
                               
                            </div>
                        ))}

                        {/* Inputs para adicionar nova conta */}
                        <div className="flex gap-3 mt-6">
                            <input
                                type="text"
                                placeholder="Nome"
                                value={novaConta.nome}
                                onChange={(e) => setNovaConta({ ...novaConta, nome: e.target.value })}
                                className="p-2 rounded-xl text-black w-1/4"
                            />
                            <input
                                type="date"
                                value={novaConta.vencimento}
                                onChange={(e) => setNovaConta({ ...novaConta, vencimento: e.target.value })}
                                className="p-2 rounded-xl text-black w-1/4"
                            />
                            <input
                                type="number"
                                placeholder="Parcelas"
                                value={novaConta.parcelas}
                                onChange={(e) => setNovaConta({ ...novaConta, parcelas: e.target.value })}
                                className="p-2 rounded-xl text-black w-1/4"
                            />
                            <input
                                type="number"
                                placeholder="Valor"
                                value={novaConta.valor}
                                onChange={(e) => setNovaConta({ ...novaConta, valor: e.target.value })}
                                className="p-2 rounded-xl text-black w-1/4"
                            />
                            

                        </div>
                        <button
                                onClick={handleAddConta}
                                className="bg-primaria mt-5 ml-1 w-1/5 text-black p-3 rounded-xl flex items-center justify-center hover:bg-yellow-300 transition"
                            >
                                <FaPlus />
                            </button>
                    </div>
                )}
        </div>
    );
};

export default MinhasContas;
