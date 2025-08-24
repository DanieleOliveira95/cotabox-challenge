# Cotabox Challenge — Fullstack (Next.js)


## Como rodar
1. `npm install`
2. `npm run dev`
3. Abra `http://localhost:3000`


# Projeto - Cotabox Challenge (adaptado)

Este repositório é uma implementação do desafio Fullstack da Cotabox usando Next.js.

Principais pontos implementados:
- Front-end com formulário, tabela e gráfico de distribuição;
- API em `pages/api/participants` guardando dados em memória no servidor;
- Validações com Zod no front e backend;
- Testes unitários para validação e para o endpoint API (Jest);
- Dockerfile e docker-compose para subir a aplicação em produção.

Como rodar (desenvolvimento)
1. npm install
2. npm run dev
3. Abra http://localhost:3000

Testes
- npm test  (executa testes Jest em `__tests__`)

Docker
- docker build -t cotabox-challenge .
- docker run -p 3000:3000 cotabox-challenge
- ou use `docker-compose up --build`

Notas de compatibilidade com o desafio Cotabox
- Todos os campos do formulário são obrigatórios;
- A API retorna 400 em validações inválidas e impede que a soma das participações ultrapasse 100%.
- Código simples, legível e com testes básicos para API.

Próximos passos sugeridos (opcionais):
- Persistência com MongoDB / mongoose;
- Testes adicionais de front-end (React Testing Library);
- Implementar remoção via API e autenticação se necessário.
