import React, { useState } from "react";
import WizardHeader from "./WizardHeader/WizardHeader";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import ProcessingScreen from "./ProcessingScreen/ProcessingScreen";

const Wizard: React.FC = () => {
  const { step } = useFormWizardContext();

  return (
    <div className="max-w-[1200px] mx-auto border-l-1 border-r-1 border-b-1 border-gray-500 pb-3">
      <WizardHeader currentStep={step} />
      <div className="p-5">
        <Step1 />
        <Step2  />
        <Step3/>
        <Step4 />
        <ProcessingScreen />
      </div>
    </div>
  );
};

export default Wizard;
