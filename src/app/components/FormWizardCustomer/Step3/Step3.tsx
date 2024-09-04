const Step3 = ({ onNext, onBack }: any) => {
    return (
      <div>
        <h2>3. Relatórios</h2>
        <button onClick={onBack}>Voltar</button>
        <button onClick={onNext}>Avançar</button>
      </div>
    );
  };
  
  export default Step3;
  