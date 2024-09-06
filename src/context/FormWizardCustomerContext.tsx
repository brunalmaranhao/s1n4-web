"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

type FormWizardCustomerContextType = {
  newCustomer?: INewCustomer;
  reports: INewReport[]
  responsibles: INewResponsible[]
  setResponsibles: React.Dispatch<
  React.SetStateAction<INewResponsible[]>>
  setReports: React.Dispatch<
  React.SetStateAction<INewReport[]>>
  setNewCustomer: React.Dispatch<
    React.SetStateAction<INewCustomer | undefined>
  >;
  step: number;
  handleNext: () => void;
  handleBack: () => void;
  users: INewUserCustomer[];
  setUsers: React.Dispatch<
  React.SetStateAction<INewUserCustomer[]>
>;
  handleAddUser: (user: INewUserCustomer) => void;
  handleAddReport: (report: INewReport) => void
  handleAddResponsible: (responsible: INewResponsible) => void
  reset: () => void
};

const FormWizardCustomerContext = createContext<
  FormWizardCustomerContextType | undefined
>(undefined);

export const FormWizardCustomerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [newCustomer, setNewCustomer] = useState<INewCustomer>();
  const [users, setUsers] = useState<INewUserCustomer[]>([]);
  const [step, setStep] = useState<number>(1);
  const [reports, setReports] = useState<INewReport[]>([]);
  const [responsibles, setResponsibles] = useState<INewResponsible[]>([]);

  function reset(){
    setStep(1)
  }

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAddUser = (user: INewUserCustomer) => {
    setUsers((prevState) => [...prevState, user]);
  };

  const handleAddReport = (report: INewReport) => {
    setReports((prevState) => [...prevState, report]);
  };

  const handleAddResponsible = (responsible: INewResponsible) => {
    setResponsibles((prevState) => [...prevState, responsible]);
  };


  const contextValue: FormWizardCustomerContextType = {
    newCustomer,
    setNewCustomer,
    step,
    handleNext,
    handleBack,
    users,
    handleAddUser,
    setUsers,
    reports,
    setReports,
    handleAddReport,
    responsibles,
    setResponsibles,
    handleAddResponsible,
    reset
  };

  return (
    <FormWizardCustomerContext.Provider value={contextValue}>
      {children}
    </FormWizardCustomerContext.Provider>
  );
};

export const useFormWizardContext = () => {
  const context = useContext(FormWizardCustomerContext);
  if (!context) {
    throw new Error(
      "useFormWizardContextContext deve ser usado dentro de um FormWizardCustomerProvider"
    );
  }
  return context;
};
