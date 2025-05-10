const API_BASE_URL = 'http://localhost:3000';

export const uploadDocument = async (file: File, workspaceId: string): Promise<unknown> => {
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