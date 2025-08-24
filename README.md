# Cotabox Challenge — Projeto adaptado

Este repositório é uma implementação do desafio Fullstack da Cotabox usando Next.js (React) no frontend e rotas API em `pages/api` no backend.

Resumo rápido
- Framework: Next.js 15 (React 19)
- Estilização: TailwindCSS (build compatível com PostCSS7)
- Gráficos: Recharts
- Validação: Zod
- Testes: Jest
- Persistência: SQLite (arquivo local) — suportado via volume Docker

Objetivo deste README
- Explicar a arquitetura e escolhas.
- Mostrar como rodar em desenvolvimento e em containers Docker.
- Documentar o papel de cada tecnologia.

Arquitetura e organização
- `pages/` — rotas da aplicação e endpoints API (`pages/api/participants`).
- `components/` — componentes React (HeaderBar, Table, DonutChart).
- `lib/` — utilitários (validação, DB helper quando aplicável).
- `styles/` — `globals.css` com Tailwind e estilos auxiliares.

Como rodar localmente (desenvolvimento)
1. Instale dependências:

```powershell
npm install
```

2. Inicie em modo desenvolvimento (Next.js):

```powershell
npm run dev
```

3. Abra http://localhost:3000

Observações importantes
- Se você alterou dependências (Tailwind/PostCSS) pode ser necessário remover `node_modules` e rodar `npm ci`.
- O projeto usa uma versão compatível do Tailwind com PostCSS7 (configurada no `package.json` e `postcss.config.js`).

Executando em Docker (produção)
1. Build e run com Docker Compose (recomendado — persiste o arquivo SQLite em volume):

```powershell
docker-compose up --build
```

2. A aplicação ficará disponível em http://localhost:3000

3. O arquivo SQLite será persistido no volume nomeado `data` (mapeado internamente para `/data` no container). Variáveis importantes:

- `DATABASE_FILE` — caminho do arquivo SQLite; por padrão ` /data/database.sqlite`.

Comandos Docker úteis
- Build manual: `docker build -t cotabox-challenge .`
- Run (produção): `docker run -p 3000:3000 -v cotabox_data:/data cotabox-challenge`
- Para inspecionar o volume local: `docker run --rm -v cotabox_data:/data busybox ls -la /data`

Tecnologias e responsabilidades
- Next.js: roteamento, SSR e API routes. Usamos as rotas em `pages/api/participants` para criar/consultar participantes.
- TailwindCSS: utilitário de estilo. Foi usada a build compatível com PostCSS7 para evitar conflitos com tooling existente.
- Recharts: componente de visualização Donut chart.
- Zod: validação de payloads tanto no front quanto no backend.
- Jest: testes unitários (ex.: validação schema em `__tests__/validation.test.js`).
- SQLite: escolha leve para persistência em arquivo local, ideal para demos e para uso com Docker volumes.

Arquitetura do container
- Multi-stage Dockerfile (build + runner) para reduzir imagem final.
- `docker-compose.yml` cria serviço `web` e o volume `data` para persistir o DB.

Problemas conhecidos e dicas de troubleshooting
- PostCSS / Tailwind: o repositório usa a build `postcss7-compat` do Tailwind; se você atualizar pacotes, verifique `postcss` e `autoprefixer` para manter compatibilidade.
- Se vir erro relacionado a `browserslist` com Turbopack, rode o dev server com o webpack (remova `--turbopack` do script `dev`) ou use a imagem de produção (Docker) para build.

Contribuindo / próximos passos
- Melhorar acessibilidade e testes UI (React Testing Library).
- Mudar para um DB em servidor (Postgres / MongoDB) quando for necessário multi-instance.

---
README atualizado automaticamente para refletir a configuração Docker e instruções de uso.
