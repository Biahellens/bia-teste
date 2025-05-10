import type React from 'react';
import { useState } from 'react';
import { uploadDocument } from '../services/service';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleWorkspaceIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceId(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !workspaceId) {
      setUploadStatus('Por favor, selecione um arquivo e forneça um ID de workspace.');
      return;
    }

    try {
      setUploadStatus('Enviando...');
      await uploadDocument(selectedFile, workspaceId);
      setUploadStatus('Arquivo enviado com sucesso!');
      setSelectedFile(null);
      setWorkspaceId('');
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        setUploadStatus(`Erro no envio: ${error.message}`);
      }
      setUploadStatus("Erro no envio: erro desconhecido");
    }

  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Upload de Documento</h2>
      <div className="flex items-center space-x-4">
        <input type="file" onChange={handleFileChange} className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <input
          type="text"
          placeholder="ID do Workspace"
          value={workspaceId}
          onChange={handleWorkspaceIdChange}
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type='submit'
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enviar
        </button>
      </div>
      {uploadStatus && <p className="mt-2 text-sm">{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;