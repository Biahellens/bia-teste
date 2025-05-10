import { useState } from 'react';
import FileUpload from './components/FileUpload';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';

function App() {
  const [searchResults, setSearchResults] = useState<{ chunk: string; filename: string }[]>([]);

  const handleSearch = (results: { chunk: string; filename: string }[]) => {
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Teste de Busca Semântica</h1>
      <FileUpload />
      <SearchInput onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
}

export default App;