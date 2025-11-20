import React, { useState } from "react";

export default function StepSalary({ onNext, onPrev, data }) {
  const [salary, setSalary] = useState(data.salary || "");

  const handleSubmit = () => {
    if (!salary) return alert("Digite seu salário!");
    onNext({ salary });
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
