# Portal Nitro de Implantação Microsoft 365

Portal completo com front-end em HTML + Tailwind CDN + JavaScript puro e API Node.js/Express com Prisma e PostgreSQL para gestão de projetos de migração Microsoft 365.

## Pré-requisitos
- Node.js 20+
- npm
- PostgreSQL 14+ com banco criado (ex: `portal_nitro`)

## Configuração
1. Instale dependências do backend:
   ```bash
   cd backend
   npm install
   ```
2. Copie `.env.example` para `.env` e ajuste `DATABASE_URL` e `PORT` se necessário.
3. Gere o client Prisma e crie a base:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Popule dados de exemplo:
   ```bash
   npm run seed
   ```
5. Inicie a API:
   ```bash
   npm run dev
   ```
6. Abra o front-end estático apontando para `public/` (ex.: `http://localhost:4000/public/index.html` se servir via Express estático ou `file://` para pré-visualização). Este repositório mantém front-end desacoplado de bundlers.

## Estrutura
```
portal-nitro-m365/
├── public/                  # Front-end estático
│   ├── index.html           # Login analista/cliente
│   ├── dashboard.html       # Dashboard principal
│   ├── levantamento.html    # Seleção de funcionalidades
│   ├── usuarios.html        # Cadastro de usuários
│   ├── email.html           # Planejamento de e-mail
│   ├── sharepoint.html      # Sites e governança
│   ├── teams.html           # Equipes e boas práticas
│   ├── cronograma.html      # Etapas do projeto
│   ├── relatorios.html      # Relatórios e exportação
│   ├── orientacoes.html     # Conteúdo estático Nitro
│   ├── css/styles.css       # Tema Nitro
│   ├── js/*.js              # Lógica de cada página + auth + API helper
│   └── libs/                # Dependências estáticas (placeholders offline)
└── backend/
    ├── src/server.js        # Express + rotas JSON REST
    ├── src/routes/*.js      # Endpoints por módulo
    ├── src/controllers/data.js # Mock de dados para prototipação
    └── src/prisma/          # schema.prisma e seed.js
```

## Fluxo de uso
1. Acesse `public/index.html`, entre como `analista@nitro.com` / `analista` ou `cliente@empresa.com` / `cliente`.
2. O login grava o papel em `localStorage`; todas as páginas usam `auth.js` para proteger acesso.
3. `ui.js` carrega o cabeçalho Nitro com progresso do projeto e o menu superior.
4. Cada página consulta a API REST (`/api/...`) via `api.js` para popular cards, tabelas e relatórios.
5. O papel `cliente` permite apenas visualização; o papel `analista` habilita formulários e alterações rápidas em memória (ou no banco quando Prisma estiver configurado).

## API REST (resumo)
- `POST /api/auth/login` – login simulado (analista/cliente).
- `GET /api/projeto` – resumo do projeto e progresso.
- `GET/PUT /api/levantamento/:id` – serviços mapeados.
- `GET/POST /api/usuarios` – cadastro de usuários.
- `GET/PUT /api/email` – planejamento de e-mail.
- `GET/POST /api/sharepoint` – sites e volumes.
- `GET/POST /api/teams` – equipes e boas práticas.
- `GET/POST /api/cronograma` – etapas do projeto.
- `GET /api/relatorios` – blocos consolidados de relatórios.

> As rotas atuais usam mocks em memória para prototipação rápida; o schema Prisma já contempla todos os modelos necessários para persistência PostgreSQL.

## Modelos Prisma
- `Projeto`, `Funcionalidade`, `Usuario`, `EmailConfig`, `SharePointSite`, `TeamsConfig`, `TeamsCriada`, `CronogramaEtapa`, `Licenciamento`, `MapaAcesso`, `Orientacao` – com timestamps e relacionamentos.

## Área do Cliente
- Login próprio (`cliente@empresa.com`).
- Visualização de dashboard, cronograma, relatórios e orientações em tempo real.
- Restrições de edição aplicadas no front (inputs desabilitados) e previstas para o back.

## Dicas de operação
- Ajuste o `PORT` do backend se quiser servir os arquivos estáticos pela própria API (`app.use('/public', express.static('../public'))`).
- Troque os placeholders de `public/libs/*.js` por versões completas se o ambiente permitir download.
- Atualize o seed em `backend/src/prisma/seed.js` para refletir dados reais do cliente.
