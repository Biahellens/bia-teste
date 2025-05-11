import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/service';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await registerUser(username, password);
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary-200">
      <div className="w-[20rem] h-[30rem] bg-white-0 shadow-md rounded-[0.5rem] px-[2rem] p-[2rem] flex flex-col gap-[4rem]">
        <h2 className="text-neutral-700 font-bold text-[1.5rem] text-center">Registrar</h2>
        <form onSubmit={handleRegister} className='flex flex-col gap-[1.5rem]'>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="text-[0.875rem] text-neutral-800 font-semibold" htmlFor="username">
              Nome de Usuário:
            </label>
            <input
              className="shadow appearance-none border border-neutral-300 rounded-[0.5rem] w-full h-[2.5rem] px-[0.5rem] text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="text-[0.875rem] text-neutral-800 font-semibold" htmlFor="password">
              Senha:
            </label>
            <input
              className="shadow appearance-none border border-neutral-300 rounded-[0.5rem] w-full h-[2.5rem] px-[0.5rem] text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-[1rem]">
            <button
              className="w-[10rem] bg-primary-700 hover:bg-primary-700 text-white-0 font-semibold py-[0.5rem] px-[1rem] rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registrar
            </button>
            <a className="inline-block align-baseline text-[0.875rem] text-primary-700" href="/login">
              Já tem uma conta? Login
            </a>
          </div>
          {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;