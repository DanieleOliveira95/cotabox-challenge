# Cotabox Challenge — Fullstack (Next.js)


## Como rodar
1. `npm install`
2. `npm run dev`
3. Abra `http://localhost:3000`


## Stack
- Next.js (pages + API routes)
- TailwindCSS para UI
- Recharts para gráfico donut
- Zod para validação (front/back)


## Endpoints
- `GET /api/participants` — lista todos
- `POST /api/participants` — cria um participante
- body: `{ firstName, lastName, participation }`
- erros de validação retornam `400` com `{ error: "..." }`


## Testes (opcional)
- `npm test`


## Observações
- Dados ficam em memória para simplificar o d