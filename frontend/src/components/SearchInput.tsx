import type React from 'react';
import { useState } from 'react';
import { searchDocuments } from '../services/service';

interface SearchInputProps {
  onSearch: (results: { chunk: string; filename: string }[]) => void
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
    <div className='flex flex-col gap-[0.5rem]'>
      <h3 className="text-[1.2rem] font-bold text-neutral-700">Buscar Documentos</h3>
      <div className="w-full flex flex-row max-md:flex-col items-center gap-[1.5rem max-md:gap-[0.5rem]">
        <input
          type="text"
          placeholder="Digite sua busca..."
          value={query}
          onChange={handleInputChange}
          className="shadow appearance-none border border-neutral-300 rounded-[0.5rem] w-[46.25rem] max-md:w-full h-[2.5rem] px-[0.5rem] text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type='button'
          onClick={handleSearch}
          className="w-[8rem] max-md:w-full bg-primary-700 hover:bg-primary-700 text-white-0 font-semibold py-[0.5rem] px-[1rem] rounded focus:outline-none focus:shadow-outline"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchInput;