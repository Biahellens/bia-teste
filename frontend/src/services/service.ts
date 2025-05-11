/* eslint-disable @typescript-eslint/no-explicit-any */
export const API_BASE_URL = 'http://localhost:3000';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const registerUser = async (username: string, password: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao registrar usuário.');
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erro ao registrar: ${error.message}`);
    }
    throw new Error('Erro ao registrar: erro desconhecido');
  }

};

export const loginUser = async (username: string, password: string): Promise<{ accessToken: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Credenciais inválidas.');
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
    throw new Error('Erro ao fazer login: erro desconhecido');
  }
};


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getWorkspaces = async (token: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workspaces`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Faça login novamente.');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao carregar workspaces.');
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erro ao obter workspaces: ${error.message}`);
    }
    throw new Error('Erro ao obter workspaces: erro desconhecido');
  }

};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const createWorkspace = async (token: string, name: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workspaces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Faça login novamente.');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar workspace.');
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erro ao criar workspace: ${error.message}`);
    }
    throw new Error('Erro ao criar workspaces: erro desconhecido');
  }
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const uploadDocument = async (file: File, workspaceId: string): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('workspaceId', workspaceId);

  try {
    const response = await fetch(`${API_BASE_URL}/documents/upload?workspaceId=${workspaceId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erro ao enviar o arquivo: ${error.message}`);
    }
    throw new Error('Erro ao enviar o arquivo: erro desconhecido');
  }
}

export const searchDocuments = async (query: string): Promise<{ chunk: string; filename: string }[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erro ao buscar documentos: ${error.message}`);
    }
    throw new Error('Erro ao buscar documentos: erro desconhecido');
  }

};