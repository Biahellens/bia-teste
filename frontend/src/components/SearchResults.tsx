import type React from 'react';

interface SearchResultsProps {
  results: { chunk: string; filename: string }[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Resultados da Busca</h2>
      {results.length > 0 ? (
        <div className="list-disc pl-5">
          {results.map((result) => (
            <div key={result.filename} className="mb-2">
              <p className="text-gray-800">{result.chunk}</p>
              <p className="text-gray-500 text-sm">Fonte: {result.filename}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default SearchResults;