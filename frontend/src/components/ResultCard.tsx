import { useState } from "react";
import type { ResultItem } from "../interfaces/ResultItem";

interface ResultCardProps {
  title: string;
  description: string;
  sucessDescription: string;
  items: ResultItem[] | string[];
}

export default function ResultCard({
  title,
  description,
  items,
}: ResultCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm ">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {items.length ? (
          <button
            onClick={() => setModalOpen(true)}
            className="text-sm whitespace-nowrap w-14 text-blue-600 hover:underline"
          >
            Ver mais
          </button>
        ) : null}
      </div>
      {items.length ? (
        <span className="text-sm text-red-600 mt-1">
          {items.length} Problemas encontrados
        </span>
      ) : (
        <span className="text-sm text-green-500 ">
          Nenhum problema encontrado
        </span>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-2xl w-full">
            <h4 className="font-bold mb-4">Todos os resultados</h4>
            <p className="text-sm text-red-700">
              {items.length} Problemas encontrados
            </p>
            <ul className="list-disc pl-5 space-y-1 max-h-80 overflow-y-auto text-sm text-gray-700">
              {items.map((item, idx) => {
                return (
                  <li key={idx} className="break-all">
                    {typeof item === "string"
                      ? item
                      : item.message ||
                        item.text ||
                        item.src ||
                        item.href ||
                        item.name ||
                        item.tag ||
                        "[Item indisponível]"}
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
