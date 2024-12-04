import React from "react";
import {
  MdOutlineDone,
  MdOutlineFiberManualRecord,
  MdOutlineDataSaverOff,
} from "react-icons/md";

interface Step {
  id: number;
  label: string;
  sublabel: string;
}

interface WizardHeaderProps {
  currentStep: number;
}

const WizardHeader: React.FC<WizardHeaderProps> = ({ currentStep }) => {
  const steps: Step[] = [
    { id: 1, label: "1. Detalhes da empresa", sublabel: "Informações e dados sobre a empresa." },
    {
      id: 2,
      label: "2. Usuários",
      sublabel: "Pessoas do time do cliente que irão acessar o sistema",
    },
    { id: 3, label: "3. Relatórios", sublabel: "Gerencie/cadastre relatórios" },
    {
      id: 4,
      label: "4. Outras configurações",
      sublabel: "Defina quais serão as pessoas do time do cliente no geral",
    },
  ];
  
  const getIcon = (stepId: number) => {
    if (stepId < currentStep)
      return <MdOutlineDone className="text-[#25A249]" size={22} />;
    if (stepId === currentStep)
      return <MdOutlineDataSaverOff className="text-[#F57B00]" size={22} />;
    return <MdOutlineFiberManualRecord className="text-[#697077]" size={22} />;
  };

  return (
    <div className="flex justify-between pb-2 md:flex-row flex-col">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`relative flex justify-between items-start text-center px-4 flex-1 h-22 bg-transparent
         
          ${step.id <= currentStep ? "text-black" : "text-gray-500"}`}
        >
          <div
            className={`absolute top-0 left-0 right-0 h-1 transition-width duration-500 ease-in-out ${
              step.id <= currentStep ? "bg-[#F57B00]" : "bg-transparent"
            }`}
            style={{ width: step.id <= currentStep ? "100%" : "0%" }}
          />
          <div
            className={`absolute top-0 left-0 right-0 h-1 transition-width duration-500 ease-in-out`}
            style={{ width: step.id > currentStep ? "100%" : "0%" }}
          />
          <div className="flex flex-row justify-center items-start gap-3 my-3">
            <span className={`text-lg`}>{getIcon(step.id)}</span>

            <div className="flex flex-col">
              <div className="text-sm font-bold text-black dark:text-white">{step.label}</div>
              <div className="text-xs text-black dark:text-white ">{step.sublabel}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WizardHeader;
