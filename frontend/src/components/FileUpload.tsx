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
        setUploadStatus(`${error.message}`);
      }
      setUploadStatus("Erro no envio: erro desconhecido");
    }

  };

  return (
    <div className='flex flex-col gap-[0.5rem]'>
      <h2 className="text-[1.2rem] font-bold text-neutral-700">Upload de Documento</h2>
      <div className="w-full flex flex-row max-md:flex-col items-center gap-[1.5rem max-md:gap-[0.5rem]">
        <input type="file" onChange={handleFileChange} className="shadow appearance-none border border-neutral-300 rounded-[0.5rem] w-[30rem] max-md:w-full h-[3rem] py-[0.5rem] px-[0.5rem] text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          placeholder="ID do Workspace"
          value={workspaceId}
          onChange={handleWorkspaceIdChange}
          className="shadow appearance-none border border-neutral-300 rounded-[0.5rem] w-[15rem] max-md:w-full h-[2.5rem] px-[0.5rem] text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type='submit'
          onClick={handleUpload}
          className="w-[8rem] max-md:w-full bg-primary-700 hover:bg-primary-700 text-white-0 font-semibold py-[0.5rem] px-[1rem] rounded focus:outline-none focus:shadow-outline"
        >
          Enviar
        </button>
      </div>
      {uploadStatus && <p className="text-[0.875rem]">{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;