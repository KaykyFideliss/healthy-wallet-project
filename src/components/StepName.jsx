import React, { useState } from "react";

export default function StepName({ onNext, data }) {
  const [name, setName] = useState(data.name || "");

  const handleSubmit = () => {
    if (!name) return alert("Digite seu nome!");
    onNext({ name });
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mb-2 text-primaria font-zalando">NOME</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className=" text-black px-4 py-3 rounded-xl font-zalando  w-86 mb-6 font-semibold text-center"
        placeholder="Digite seu nome"
      />
      <button
        onClick={handleSubmit}
        className="bg-primaria font-zalando text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
      >
        PROSSEGUIR
      </button>
    </div>
  );
}
