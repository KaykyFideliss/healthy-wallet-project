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
      

      
      {/* Checkbox */}
      <label className="flex items-center gap-2 text-primaria font-zalando mb-8">
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
        className="bg-[#FFCC28] text-black px-10 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
      >
        PROSSEGUIR
      </button>
    </div>
  );
}
