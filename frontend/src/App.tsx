import { useState } from "react";
import UrlForm from "./components/UrlForm";
import type { AccessibilityResults } from "./interfaces/AccessibilityResults";
import ResultCard from "./components/ResultCard";
import api from "./services/api";

import type { ContrastItem } from "./interfaces/ResultContrast";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./components/ReportPDF";

function App() {
  const [result, setResult] = useState<AccessibilityResults | null>(null);
  const [contrastResult, setContrastResult] = useState<ContrastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [errorContrast, setErrorContrast] = useState<string>("");
  const [contrastLoading, setContrastLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const requestCheck = async (url: string) => {
    if (!isValidUrl(url)) {
      setError(
        "URL inválida. Por favor, insira uma URL válida (ex: https://www.site.com)."
      );
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/check", { url });
      setResult(data.results);
    } catch {
      setError("Erro ao processar a verificação principal.");
      return;
    } finally {
      setLoading(false);
    }
  };

  const requestContrast = async (url: string) => {
    setContrastLoading(true);
    try {
      const response = await api.post<{ contrast_issues: any[] }>("/contrast", {
        url,
      });
      setContrastResult(response.data.contrast_issues);
    } catch {
      setErrorContrast("Erro ao processar a verificação de contraste.");
      return;
    } finally {
      setContrastLoading(false);
    }
  };

  const handleCheck = (url: string) => {
    setResult(null);
    setContrastResult([]);
    setError("");
    setErrorContrast("");
    requestCheck(url);
    requestContrast(url);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4">
      <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 shadow-lg">
        <div className="max-w-6xl mx-auto flex p-4">
          <div className=" flex items-center gap-4">
            <div className="bg-white rounded-full p-2 shadow-md">
              <svg
                className="w-10 h-10 text-blue-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow">
                A11y_Inspector
              </h1>
              <p className="text-white text-opacity-90 mt-1 font-medium">
                Acessibilidade. Inclusão. Transforme a web para todos.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4  rounded">
          <p className="text-blue-900 font-semibold">
            Acessibilidade digital é fundamental para garantir que todas as
            pessoas possam navegar na web. No Brasil, a{" "}
            <span className="font-bold">Lei Brasileira de Inclusão (LBI)</span>{" "}
            exige que sites sejam acessíveis. Utilize esta ferramenta para
            identificar e corrigir barreiras no seu site!
          </p>
        </div>

        <UrlForm
          url={currentUrl}
          onUrl={setCurrentUrl}
          onResult={handleCheck}
          loading={loading || contrastLoading}
        />

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        {errorContrast && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {errorContrast}
          </div>
        )}

        {result || contrastResult.length ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl text-blue-900 font-semibold mb-6 text-center">
              Resultados da Inspeção
            </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {loading ? (
                <span>Carregando...</span>
              ) : (
                result && (
                  <>
                    <ResultCard
                      title="Imagens sem descrição (alt)"
                      description="Todas as imagens devem ter texto alternativo para leitores de tela."
                      sucessDescription="Todas as imagens possuem texto alternativo."
                      items={result.images.length ? result.images : []}
                    />

                    <ResultCard
                      title="Campos de formulário sem rótulo"
                      description="Cada campo deve ter um <label>(rótulo) associado."
                      sucessDescription="Todos os campos de formulário possuem rótulo."
                      items={result.forms?.length ? result.forms : []}
                    />

                    <ResultCard
                      title="Problemas na hierarquia de títulos"
                      description="Use apenas um <h1>(título) e evite pular níveis."
                      sucessDescription="Todos os títulos estão em conformidade."
                      items={result.headings?.length ? result.headings : []}
                    />

                    <ResultCard
                      title="Links com texto vago"
                      description="Evite usar textos genéricos como “clique aqui” em links. Prefira descrições que indiquem o destino ou a ação."
                      sucessDescription="Todos os links possuem textos claros."
                      items={result.links?.length ? result.links : []}
                    />

                    <ResultCard
                      title="Botões sem rótulo acessível"
                      description="Todos os botões devem ter texto visível ou atributos como aria-label."
                      sucessDescription="Todos os botões possuem rótulos acessíveis."
                      items={result.buttons?.length ? result.buttons : []}
                    />

                    <ResultCard
                      title="Landmarks semânticos ausentes"
                      description="É necessário usar as tags semânticas: <main>, <nav>, <header>, <footer>, para organizar a estrutura da página."
                      sucessDescription="Todos os landmarks estão presentes e corretos."
                      items={result.landmarks?.length ? result.landmarks : []}
                    />
                  </>
                )
              )}

              {contrastLoading ? (
                <div className="flex items-center justify-center md:col-span-1">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-600 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  <span>Carregando resultados de contraste...</span>
                </div>
              ) : (
                <ResultCard
                  title="Problemas de contraste"
                  description="Todos os textos devem ter contraste suficiente com o fundo para garantir legibilidade."
                  sucessDescription="Todos os textos possuem contraste adequado."
                  items={contrastResult}
                />
              )}
              {!loading && !contrastLoading && (
                <div className="flex items-start justify-center md:col-span-1">
                  <PDFDownloadLink
                    document={
                      <ReportPDF
                        result={result}
                        contrastResult={contrastResult}
                        url={currentUrl}
                      />
                    }
                    fileName="relatorio-acessibilidade.pdf"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full h-full text-center items-center flex justify-center hover:bg-blue-700 transition-colors"
                  >
                    {({ loading }) =>
                      loading ? (
                        "Gerando PDF..."
                      ) : (
                        <span>Baixar Relatório em PDF</span>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <footer className="mt-auto w-full py-4 bg-blue-700 text-white text-center text-sm rounded-t shadow">
        © 2025 por Elisiane Quadros — Desenvolvido com{" "}
        <span className="font-bold">A11y_Inspector</span>
      </footer>
    </div>
  );
}

export default App;
