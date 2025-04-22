# 📈 Tickerfy

Aplicação front-end feita com React + TypeScript para exibir cotações de moedas e índices de ações em tempo real. Os dados são atualizados a cada 2 segundos com base na API da [HG Brasil](https://hgbrasil.com/status/finance/), com histórico em gráfico para cada item.

Este projeto foi desenvolvido como resposta a um desafio técnico para vaga front-end.

---

## 🚀 Tecnologias e Ferramentas

- **React 19**
- **TypeScript**
- **Vite** (build ultra rápido)
- **Tailwind CSS** (estilização)
- **React Router Dom** (navegação entre páginas)
- **Recharts** (gráficos)
- **Axios** (requisições HTTP)
- **Node.js + Express** (proxy local para evitar CORS)
- **ESLint** (padronização de código)
- **Concurrently** (executar Vite + Node juntos no dev)

---

## 📁 Estrutura de Pastas

A estrutura foi organizada de forma modular para escalabilidade e manutenção:

```
src/
├── components/          # Componentes reaproveitáveis
├── hooks/               # Hooks customizados (ex: auth)
├── lib/                 # Integração com API (axios instance)
├── pages/               # Páginas principais (Login, Dashboard)
├── routes/              # Definições de rotas privadas
├── types/               # Tipagens centralizadas (ex: Currency, Stock)
├── utils/               # Funções auxiliares (formatação, auth)
├── App.tsx              # Componente principal da aplicação
├── main.tsx             # Ponto de entrada
```

---

## 🧪 Executando Localmente

Clone o projeto e instale as dependências:

```bash
git clone https://github.com/brenocuper/tickerfy.git
cd tickerfy
npm install
```

### 💡 Teste com mock

Para rodar localmente:

```bash
npm run mock-dev
```

Isso iniciará **simultaneamente**:

- o servidor local (`vite`) na porta 5173
- o servidor backend mockado (`./mock-server/server.js`) na porta 3001

> ⚠️ **Por que ./mock-server/server.js?**  
> A API da HG Brasil leva tempo para atualizar os dados, então esta é uma alternativa para ver o funcionamento dinâmico da tabela e do gráfico em tempo real, sem a necessidade de aguardar um retorno atualizado da API oficial.


### ▶️ Teste com dados reais

Para rodar localmente:

```bash
npm run dev
```

Isso iniciará **simultaneamente**:

- o servidor local (`vite`) na porta 5173
- o proxy backend (`proxy.js`) na porta 3001

> ⚠️ **Por que ./proxy.js?**  
> A API da HG Brasil não permite requisições diretas do front-end por causa do **CORS**. Para contornar, criamos um servidor local com Express (`./proxy.js`) que redireciona as requisições para a API.
---

## 🌐 Deploy

O projeto está hospedado no **[Netlify](https://www.netlify.com/)** com deploy contínuo via GitHub.

🔗 URL: [https://tickerfy.netlify.app/](https://tickerfy.netlify.app/)

---

## 📦 Variáveis de Ambiente

O Vite fará a seleção automática das variáveis de ambiente em `dev` e `prod`.

`.env.local`:
```env
VITE_API_BASE_URL=http://localhost:3001
```

`.env.production`:
```env
VITE_API_BASE_URL=https://api.hgbrasil.com
```

---

## ✅ Boas Práticas Aplicadas

- Organização clara em camadas (`pages`, `components`, `utils`, `types`)
- Uso de `type` e `interface` para garantir tipagem segura
- Separação de responsabilidades entre lógica de negócio e apresentação
- Atualização de dados em tempo real com `setInterval` + `useRef`
- Proxy backend para bypass de CORS
- Hooks customizados (`useAuthRedirect`)
- Linting com ESLint e regras atualizadas

---

## 📌 Requisitos Atendidos

✔ Tela de login com persistência de sessão  
✔ Autenticação e redirecionamento com `localStorage`  
✔ Listagem de moedas e índices  
✔ Atualização automática a cada 2 segundos  
✔ Gráfico de histórico ao clicar em um item  
✔ Responsividade  
❌ Deploy em produção _(buscando solução para CORS entre Netlify e HG Brasil)_

---

## 🧠 Autor

Feito com dedicação por [Breno Cupertino](https://www.linkedin.com/in/brenocupertino).  
Quer feedbacks ou colaborações? Mande um pull request ou entre em contato 🙌

---

## 📝 Licença

Este projeto é apenas para fins educacionais e demonstração técnica. Sem fins comerciais.