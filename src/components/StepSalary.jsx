import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function StepSalary({ onPrev, data }) {
  const navigate = useNavigate();
  const [salary, setSalary] = useState(data.salary || "");

  const handleSubmit = async () => {
    if (!salary) return alert("Digite seu salário!");

    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
      alert("Usuário não encontrado!");
      return;
    }

    const payload = {
      id: user.id, // 👈 Aqui é o certo!
      nome: data.nome,
      sobrenome: data.sobrenome,
      email: user.email,
      telefone: data.telefone || null,
      idade: Number(data.age),
      salario: Number(salary)
    };

    const { error } = await supabase
      .from("profiles")
      .upsert(payload);

    if (error) {
      console.error(error);
      alert("Erro ao salvar os dados!");
      return;
    }

    navigate("/MinhasContas");
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mb-2 text-primaria font-zalando text-lg">Salário</label>

      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="text-black px-4 py-3 rounded-xl font-zalando w-80 mb-6 font-semibold text-center"
        placeholder="Digite seu salário"
      />

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="bg-gray-500 text-white font-zalando px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
        >
          Voltar
        </button>

        <button
          onClick={handleSubmit}
          className="bg-[#FFCC28] text-black font-zalando px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}
