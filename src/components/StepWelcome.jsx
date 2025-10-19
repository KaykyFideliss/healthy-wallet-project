import React, { useState } from "react";

export default function StepWelcome({ onNext }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    if (!isChecked) {
      alert("Você precisa confirmar que está ciente antes de prosseguir.");
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center text-center">
      
      <div className="items-center flex justify-center lg:w-[1200px] mx-7 md:mx-20 lg:mx-40">
      {/* Texto principal */}
      <p className="text-gray-200 font-zalando text-lg text-justify leading-relaxed tracking-tighter pt-8 mb-5">
        Para começarmos a gerenciar e controlar seus gastos de forma eficiente, precisaremos coletar algumas informações importantes sobre você. Esses dados serão essenciais para entendermos melhor seus hábitos financeiros, organizar seu orçamento e ajudá-lo a tomar decisões mais conscientes e estratégicas em relação ao seu dinheiro. Com essas informações em mãos, poderemos criar um acompanhamento personalizado, oferecendo sugestões e insights que realmente façam a diferença no seu dia a dia financeiro.
      </p>
</div>

      
      {/* Checkbox */}
      <label className="flex items-center gap-2 text-primaria font-zalando mb-8 mt-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="accent-[#FFCC28] w-5 h-5 rounded-full"
        />
        Estou ciente
      </label>

      {/* Botão */}
      <button
        onClick={handleNext}
        className="bg-[#FFCC28] font-zalando text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
       
      >
        PROSSEGUIR
      </button>
    </div>
  );
}
