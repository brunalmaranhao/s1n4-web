import { useState } from 'react';

const Step2 = ({ onNext, onBack }: any) => {
  const [userDetails, setUserDetails] = useState({
    name: 'Jane Doe',
    email: 'loremipsum@email.com',
  });

  const handleInputChange = (e: any) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>2. Usuários</h2>
      <input
        type="text"
        name="name"
        value={userDetails.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        value={userDetails.email}
        onChange={handleInputChange}
      />
      <button onClick={onBack}>Voltar</button>
      <button onClick={() => onNext(userDetails)}>Avançar</button>
    </div>
  );
};

export default Step2;
