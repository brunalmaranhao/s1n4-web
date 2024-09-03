import { useState } from 'react';

const Step1 = ({ onNext }: any) => {
  const [companyDetails, setCompanyDetails] = useState({});

  const handleInputChange = (e: any) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>1. Detalhes da empresa</h2>
      <input
        type="text"
        name="companyName"
        placeholder="Nome da empresa"
        onChange={handleInputChange}
      />
      <button onClick={() => onNext(companyDetails)}>Avançar</button>
    </div>
  );
};

export default Step1;