import type React from 'react';
import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

const Dashboard: React.FC = () => {
  const [searchResults, setSearchResults] = useState<{ chunk: string; filename: string }[]>([]);

  const handleSearchResults = (results: { chunk: string; filename: string }[]) => {
    setSearchResults(results);
  };

  return (
    <div className="container h-screen px-[2.5rem] max-md:px-[1.5rem] py-[5rem] flex flex-col gap-[2rem]">
      <h1 className="text-[2rem] font-bold text-neutral-700">Teste de Busca Semântica Global</h1>
      <FileUpload />
      <SearchInput onSearch={handleSearchResults} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default Dashboard;