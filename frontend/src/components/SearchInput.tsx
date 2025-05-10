import type React from 'react';
import { useState } from 'react';
import { searchDocuments } from '../services/service';

interface SearchInputProps {
  onSearch: (results: { chunk: string; filename: string }[]) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const results = await searchDocuments(query);
        onSearch(results);
        setQuery('');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro na busca:', error.message);
        }
        console.error('Erro na busca: erro desconhecido');
      }

    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Buscar Documentos</h2>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Digite sua busca..."
          value={query}
          onChange={handleInputChange}
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
        />
        <button
          type='button'
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchInput;