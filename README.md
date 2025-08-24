# Cotabox Challenge — versão amigável

Bem-vindo(a)! Este repositório é uma implementação do desafio Fullstack da Cotabox. A ideia aqui é um app simples para gerenciar participantes, mostrar estatísticas e servir como demo técnico com frontend em Next.js e uma API leve que persiste dados em SQLite.

## O que tem aqui 
- Framework: Next.js (React) — páginas e rotas API em `pages/`.
- Estilo: TailwindCSS (config compatível com PostCSS7).
- Gráficos: Recharts (Donut chart para visualizações).
- Validação: Zod (front + backend, mesma fonte de verdade).
- Testes: Jest (unitários para validação / regras de negócio).
- Banco: SQLite (arquivo local, ótimo para demos e Docker volumes).

## Por que essas escolhas? 
- Next.js: facilita montar interface React e endpoints API no mesmo projeto. Prático para protótipos e testes do desafio.
- Tailwind: acelera desenvolvimento com utilitários CSS; a compatibilidade com PostCSS7 evita dores em alguns ambientes e CI.
- Recharts: biblioteca leve e fácil pra gráficos simples — suficiente para um donut/percentuais.
- Zod: schemas pequenos, tipos seguros e validação consistente entre cliente e servidor.
- Jest: padrão comum para testes JS; já cobre os schemas e regras principais aqui.
- SQLite: zero-config, funciona bem em um container com volume — ideal para demonstração e testes locais.

## Organização do projeto
- `pages/` — rotas de tela e `pages/api/participants` (endpoints REST simples).
- `components/` — componentes React reutilizáveis (HeaderBar, Table, DonutChart, Form).
- `lib/` — helpers (ex.: `sqlite.js`, `validation.js`).
- `styles/` — `globals.css` com Tailwind e ajustes.
- `server/` — código auxiliar para rodar fora do Next (se presente).

## Como rodar (dev)
1. Instale dependências:

```powershell
npm install
```

2. Rode em modo desenvolvimento:

```powershell
npm run dev
```

3. Abra http://localhost:3000


## Como rodar com Docker 
1. Build + up com compose (persiste o arquivo SQLite em volume):

```powershell
docker-compose up --build
```

2. Acesse: http://localhost:3000

O volume `data` guarda o arquivo SQLite (por padrão o contêiner usa `/data/database.sqlite`). Você pode sobrescrever o caminho com a variável `DATABASE_FILE` se necessário.

Comandos úteis (opcionais):
- Build manual: `docker build -t cotabox-challenge .`
- Rodar container: `docker run -p 3000:3000 -v cotabox_data:/data cotabox-challenge`

## Arquitetura e fluxo 
1. Usuário abre a UI (Next.js). Páginas consomem a API interna em `pages/api/participants`.
2. A API valida entradas com Zod e persiste em SQLite via um helper em `lib/sqlite.js`.
3. Componentes exibem dados (Table, DonutChart). Recharts cuida do gráfico.

Essa abordagem mantém tudo num único projeto: fácil de entender, testar e deployar como uma imagem Docker.

