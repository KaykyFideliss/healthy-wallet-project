import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";

import StepAge from "../components/StepAge";
import StepSalary from "../components/StepSalary";
import StepWelcome from "../components/StepWelcome";

const UserSetup = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    age: "",
    salary: "",
  });

  const handleNext = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const progress = ((step - 1) / 3) * 100;

  // 🔥 Aqui será onde você vai enviar pro backend
  const finishSetup = async () => {
    try {
      console.log("Dados finais:", formData);

      // quando tiver backend:
      // await fetch("https://SEU_BACKEND/api/usersetup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // redirecionar depois
      // navigate("/dashboard");

    } catch (error) {
      console.error("Erro ao salvar setup:", error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-white p-6 mt-20">

      <p className="font-zalando text-sm pt-3 text-primaria">Etapas</p>

      <ProgressBar progress={progress} currentStep={step} />

      <div className="mt-10 w-full flex justify-center">
        {step === 1 && <StepWelcome onNext={handleNext} />}
        
        {step === 2 && (
          <StepAge onNext={handleNext} onPrev={handlePrev} data={formData} />
        )}
        {step === 3 && (
          <StepSalary
            onNext={finishSetup}
            onPrev={handlePrev}
            data={formData}
          />
        )}
      </div>
    </section>
  );
};

export default UserSetup;
