
# A11y_Inspector 🕵️‍♀️♿

**A11y_Inspector** é uma ferramenta web para análise de acessibilidade digital em sites. Com foco na **Lei Brasileira de Inclusão (LBI)** e nas boas práticas da **Web Content Accessibility Guidelines (WCAG)**, este projeto ajuda desenvolvedores, designers e empresas a identificarem barreiras de navegação para pessoas com deficiência.

---

## 🔍 Funcionalidades

- ✅ Validação de imagens sem descrição (atributo `alt`)
- ✅ Verificação de campos de formulário sem rótulo (`<label>`)
- ✅ Análise da hierarquia de títulos (`<h1>`...`<h6>`)
- ✅ Detecção de links com texto vago
- ✅ Verificação de botões sem rótulo acessível
- ✅ Checagem de landmarks semânticos (ex: `<main>`, `<nav>`)
- ✅ Teste de contraste entre texto e fundo
- ✅ Geração de **relatório PDF profissional e estilizado**

---

## 🧪 Tecnologias Utilizadas

- **React.js** + **TypeScript**
- **Tailwind CSS** (UI moderna e responsiva)
- **@react-pdf/renderer** (geração de PDFs)
- **Node.js + Express (API de verificação)**
- **Axios** (requisições HTTP)
- **HTMLParser + Puppeteer** (no backend)

---

## 🚀 Como Usar

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/a11y_inspector.git
cd a11y_inspector
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn
```

3. **Execute o projeto:**

```bash
npm run dev
# ou
yarn dev
```

4. **Acesse:**
Abra `http://localhost:5173` no navegador.

---

## 🖨️ Relatório PDF

O botão **"Baixar Relatório em PDF"** permite gerar um arquivo acessível com:

- URL analisada
- Data da inspeção
- Lista dos problemas encontrados
- Estilo limpo, estruturado e personalizado

---

## 📂 Estrutura de Pastas (Frontend)

```
src/
│
├── components/
│   ├── UrlForm.tsx
│   ├── ResultCard.tsx
│   └── ReportPDF.tsx
│
├── interfaces/
│   ├── AccessibilityResults.ts
│   └── ResultContrast.ts
│
├── services/
│   └── api.ts
│
└── App.tsx
```

---

## 📚 Inspiração e Propósito

Este projeto nasceu da vontade de **tornar a web mais inclusiva**, oferecendo uma ferramenta gratuita e aberta para análise de acessibilidade — algo essencial, mas muitas vezes negligenciado nos ciclos de desenvolvimento.

---

## 👩‍💻 Autor(a)

Desenvolvido com ❤️ por **Elisiane Quadros**  
[@seu-linkedin](https://www.linkedin.com/in/seu-usuario) • [© 2025]

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
