import React, { useState } from "react";

export default function StepName({ onNext, data }) {
  const [name, setName] = useState(data.name || "");

  const handleSubmit = () => {
    if (!name) return alert("Digite seu nome!");
    onNext({ name });
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mb-2 text-gray-300">NOME</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-[#FFCC28] text-black px-4 py-3 rounded-xl w-80 mb-6 font-semibold text-center"
        placeholder="Digite seu nome"
      />
      <button
        onClick={handleSubmit}
        className="bg-[#FFCC28] text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
      >
        PROSSEGUIR
      </button>
    </div>
  );
}
