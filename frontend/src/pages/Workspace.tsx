import type React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkspace, getWorkspaces } from '../services/service';
import { AuthContext } from '../contexts/AuthContext';

interface Workspace {
  id: number;
  name: string;
  description?: string;
}

const Workspaces: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (token) {
        try {
          const data = await getWorkspaces(token);
          setWorkspaces(data);
        }
        catch (error: unknown) {
          if (error instanceof Error) {
            setErrorMessage(error.message);
            if (error.message.includes('Sessão expirada')) {
              logout();
            }
          }
        }
      } else {
        navigate('/login');
      }
    };

    fetchWorkspaces();
  }, [token, navigate, logout]);

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (token && newWorkspaceName.trim()) {
      try {
        const newWorkspace = await createWorkspace(token, newWorkspaceName);
        setWorkspaces([...workspaces, newWorkspace]);
        setNewWorkspaceName('');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          if (error.message.includes('Sessão expirada')) {
            logout();
          }
        }
      }
    }
  };

  const navigateToDashboard = (workspaceId: number) => {
    navigate(`/dashboard/${workspaceId}`);
  };

  return (
    <div className="container h-screen px-[2.5rem] max-md:px-[1.5rem] py-[5rem] flex flex-col gap-[1.5rem]">
      <h1 className="text-[2rem] font-bold text-neutral-700">Seus Workspaces</h1>

      <form onSubmit={handleCreateWorkspace} className="w-full flex flex-row max-md:flex-col gap-[1.5rem]">
        <input
          type="text"
          placeholder="Nome do novo workspace"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
          className="shadow appearance-none border border-neutral-300 rounded-[0.5rem] w-[80%] max-md:w-full h-[2.5rem] px-[0.5rem] text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <button
          type="submit"
          className="w-[12rem] max-md:w-full bg-primary-700 hover:bg-primary-700 text-white-0 font-semibold py-[0.5rem] px-[1rem] rounded focus:outline-none focus:shadow-outline"
        >
          + Criar Workspace
        </button>
      </form>

      {errorMessage && <p className="text-red-500 text-[0.875rem] mb-2">{errorMessage}</p>}

      {workspaces.length > 0 ? (
        <table className="w-full divide-y divide-neutral-300 border border-neutral-300">
          <thead className="bg-gray-100">

            <tr>
              <th className="px-[1rem] py-[0.5rem] text-left text-[0.875rem] font-semibold text-neutral-700">Nome</th>
              <th className="px-[1rem] py-[0.5rem] text-left text-[0.875rem] font-semibold text-neutral-700">Descrição</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-300">
            {workspaces.map((workspace) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <tr key={workspace.id} className="cursor-pointer hover:bg-neutral-200 transition-colors" onClick={() => navigateToDashboard(workspace.id)}>
                <td className="px-[1rem] py-[0.5rem] text-[0.875rem] text-neutral-800">
                  {workspace.name}
                </td>
                <td className="px-[1rem] py-[0.5rem] text-[0.875rem] text-neutral-800">{workspace.description && `- ${workspace.description}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-neutral-500">Você ainda não tem nenhum workspace. Crie um!</p>
      )
      }
    </div >
  );
};

export default Workspaces;