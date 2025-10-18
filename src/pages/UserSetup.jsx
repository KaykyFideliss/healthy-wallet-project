import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import StepName from "../components/StepName";
import StepAge from "../components/StepAge";
import StepSalary from "../components/StepSalary";
import StepWelcome from "../components/StepWelcome";

const UserSetup = () => {
  // controla qual passo está ativo
  const [step, setStep] = useState(1);

  // guarda as informações preenchidas
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    salary: "",
  });

  // vai para o próximo passo e salva dados
  const handleNext = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };

  // volta um passo
  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  // progresso da barra (de 1 a 3)
  const progress = ((step -1) / 3) *100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-6">
      

      <p className="font-zalando text-sm pt-3 text-primaria">Etapas</p>
      {/* barra de progresso */}
      <ProgressBar progress={progress} currentStep={step} />

<div className="items-center flex justify-center mx-7 md:mx-20 lg:mx-40">
      {/* Texto principal */}
      <p className="text-gray-200 font-zalando text-xs text-center leading-relaxed pt-8">
        Para começarmos a gerenciar e controlar seus gastos de forma eficiente, precisaremos coletar algumas informações importantes sobre você. Esses dados serão essenciais para entendermos melhor seus hábitos financeiros, organizar seu orçamento e ajudá-lo a tomar decisões mais conscientes e estratégicas em relação ao seu dinheiro. Com essas informações em mãos, poderemos criar um acompanhamento personalizado, oferecendo sugestões e insights que realmente façam a diferença no seu dia a dia financeiro.
      </p>
</div>

      
      {/* conteúdo dinâmico */}
      <div className="mt-10 w-full flex justify-center">
        {step === 1 && <StepWelcome onNext={handleNext} />}
        {step === 2 && <StepName onNext={handleNext} data={formData} />}
        {step === 3 && (
          <StepAge onNext={handleNext} onPrev={handlePrev} data={formData} />
        )}
        {step === 4 && (
          <StepSalary
            onNext={() => alert(JSON.stringify(formData, null, 2))}
            onPrev={handlePrev}
            data={formData}
          />
        )}
      </div>
    </div>
  );
};

export default UserSetup;
