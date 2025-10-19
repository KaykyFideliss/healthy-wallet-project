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
