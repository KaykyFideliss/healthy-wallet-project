import React, { useState } from "react";


export default function StepAge({ onNext, onPrev, data }) {
  const [age, setAge] = useState(data.age || "");

  const handleSubmit = () => {
    if (!age) return alert("Digite sua idade!");
    onNext({ age });
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mb-2 text-primaria font-zalando text-lg">Idade</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
              className=" text-black px-4 py-3 rounded-xl font-zalando  w-80 mb-6 font-semibold text-center"
        placeholder="Digite sua idade"
      />
      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="bg-gray-500 font-zalando text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
        >
          Voltar
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#FFCC28] text-black font-zalando px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
        >
          Prosseguir
        </button>
      </div>
    </div>
  );
}
