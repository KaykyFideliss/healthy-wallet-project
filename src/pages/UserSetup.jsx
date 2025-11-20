import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import StepAge from "../components/StepAge";
import StepSalary from "../components/StepSalary";
import StepWelcome from "../components/StepWelcome";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const UserSetup = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    age: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleNext = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const progress = ((step - 1) / 3) * 100;

  // 🔥 FINALIZA E SALVA NO SUPABASE
  const finishSetup = async () => {
    try {
      // pega usuário logado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Erro: usuário não autenticado.");
        return;
      }

      // salva idade + salário no Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          idade: formData.age,
          salario: formData.salary,
        })
        .eq("id", user.id);

      if (error) {
        console.error(error);
        alert("Erro ao salvar setup no banco.");
        return;
      }

      navigate("/MinhasContas");

    } catch (error) {
      console.error(error);
      alert("Erro ao finalizar setup.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-white p-6 mt-20">
      <p className="font-zalando text-sm pt-3 text-primaria">Etapas</p>

      <ProgressBar progress={progress} currentStep={step} />

      <div className="mt-10 w-full flex justify-center">
        {step === 1 && <StepWelcome onNext={handleNext} />}
        {step === 2 && <StepAge onNext={handleNext} onPrev={handlePrev} data={formData} />}
        {step === 3 && <StepSalary onNext={finishSetup} onPrev={handlePrev} data={formData} />}
      </div>
    </section>
  );
};

export default UserSetup;
