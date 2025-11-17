export default function ProgressBar({ currentStep }) {
  const steps = [1, 2, 3]; // Número total de etapas

  return (
    <div className="flex items-center justify-center gap-1 mb-1 pt-2">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          {/* Círculo */}
          <div
            className={` z-10 w-12 h-12 flex font-space items-center justify-center rounded-full font-bold text-sm
              ${
                step <= currentStep
                  ? "bg-[#FFCC28] text-[#151515]"
                  : "bg-white text-[#151515]"
              }`}
          >
            {step}
          </div>

          {/* Linha — só aparece entre os círculos */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-8 -m-1 z-0 md:w-52 lg:w-80 ${
                currentStep > step ? "bg-[#FFCC28]" : "bg-white"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}