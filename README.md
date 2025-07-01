# A11y_Inspector 🕵️‍♀️♿

A11y_Inspector é uma solução web full stack para **análise automatizada de acessibilidade digital** em sites, alinhada à [Lei Brasileira de Inclusão (LBI)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) e às diretrizes internacionais da [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/).

---

## Funcionalidades

- **Validação de imagens** sem descrição (`alt` ausente ou vazio)
- **Verificação de campos de formulário** sem `<label>`
- **Análise da hierarquia de títulos** (`<h1>` a `<h6>`)
- **Detecção de links** com texto genérico ou pouco descritivo
- **Verificação de botões** sem rótulo acessível
- **Checagem de landmarks semânticos** (`<main>`, `<nav>`, etc.)
- **Teste automático de contraste** entre texto e fundo
- **Geração de relatórios em PDF** acessíveis e estilizados

## Tecnologias

### Frontend

- [React.js](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) para estilização responsiva
- [Axios](https://axios-http.com/) para comunicação com a API
- [@react-pdf/renderer](https://react-pdf.org/) para geração de PDFs

### Backend

- [Python 3.11+](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/) para API REST
- [Playwright](https://playwright.dev/python/) para navegação automatizada headless
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) e [lxml](https://lxml.de/) para parsing de HTML
- [wcag-contrast-ratio](https://pypi.org/project/wcag-contrast-ratio/) para análise de contraste
- [Requests](https://docs.python-requests.org/) para requisições HTTP

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/a11y_inspector.git
cd a11y_inspector
```

#### Backend

### 2.Crie e ative o ambiente virtual

````bash
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
playwright install  # Necessário para o Playwright funcionar

## Execute o projeto

```bash
cd backend
uvicorn main:app --reload
````

O backend estará disponível em [http://localhost:8000](http://localhost:8000)  
A documentação interativa da API (Swagger UI) estará em [http://localhost:8000/docs](http://localhost:8000/docs)

#### Frontend

```bash
cd frontend
npm install
# ou
yarn
```

## Execute o projeto

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

## Relatório PDF

O botão **"Baixar Relatório em PDF"** gera um arquivo acessível contendo:

- URL analisada
- Data da inspeção
- Lista dos problemas encontrados
- Layout limpo, estruturado e personalizado

## Estrutura de Pastas (Frontend)

```
src/
│
├── components/
│ ├── UrlForm.tsx
│ ├── ResultCard.tsx
│ └── ReportPDF.tsx
│
├── interfaces/
│ ├── AccessibilityResults.ts
│ ├── ResultContrast.ts
│ ├── ResultItem.ts
│ └── CheckRequest.ts
│
├── services/
│ └── api.ts
│
└── App.tsx

---

## Inspiração e Propósito

Este projeto foi desenvolvido como um desafio pessoal para aprimorar minhas habilidades técnicas, com foco em resolver problemas reais do mercado de trabalho. Escolhi o tema acessibilidade digital por ser uma área de interesse e relevância, criando uma ferramenta prática para inspecionar e analisar a acessibilidade de sites de forma automatizada.

---

## Autor(a)

Desenvolvido por **Elisiane Quadros**
[LinkedIn](https://www.linkedin.com/in/elisiane-quadros/) • © 2025

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
```
