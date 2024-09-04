import React, { useState } from "react";
import WizardHeader from "./WizardHeader/WizardHeader";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";

const Wizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-[1200px] mx-auto border-l-1 border-r-1 border-b-1 border-gray-500 pb-3">
      <WizardHeader currentStep={step} />
      <div className="p-5">
        {step === 1 && <div className="mt-5">Conteúdo do Passo 1</div>}
        {step === 2 && <div className="mt-5">Conteúdo do Passo 2</div>}
        {step === 3 && <div className="mt-5">Conteúdo do Passo 3</div>}
        {step === 4 && <div className="mt-5">Conteúdo do Passo 4</div>}

        <div className="mt-10 flex justify-between">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Voltar
            </button>
          )}
          {step < 4 && (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Avançar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wizard;
