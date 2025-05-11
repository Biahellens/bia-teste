import type React from 'react';

interface SearchResultsProps {
  results: { chunk: string; filename: string }[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      <h4 className="text-[1.2rem] font-bold text-neutral-700">Resultados da Busca</h4>
      {results.length > 0 ? (
        <table className="w-full divide-y divide-neutral-300 border border-neutral-300">
          <thead className="bg-gray-100">

            <tr>
              <th className="px-[1rem] py-[0.5rem] text-left text-[0.875rem] font-semibold text-neutral-700">Parte do file</th>
              <th className="px-[1rem] py-[0.5rem] text-left text-[0.875rem] font-semibold text-neutral-700">Nome do arquivo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-300">

          </tbody>
          {results.map((result) => (
            <tr key={result.filename} className="cursor-pointer hover:bg-neutral-200 transition-colors">
              <td className="px-[1rem] py-[0.5rem] text-[0.875rem] text-neutral-800">
                {result.chunk}
              </td>
              <td className="px-[1rem] py-[0.5rem] text-[0.875rem] text-neutral-800">Fonte: {result.filename}</td>
            </tr>
          ))}
        </table >
      ) : (
        <p className="text-gray-600">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default SearchResults;
