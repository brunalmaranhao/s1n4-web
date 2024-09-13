const Step4 = ({ onBack }: any) => {
  return (
    <div>
      <h2>4. Outras configurações</h2>
      <button onClick={onBack}>Voltar</button>
      <button onClick={() => alert("Form Submitted!")}>Finalizar</button>
    </div>
  );
};

export default Step4;
