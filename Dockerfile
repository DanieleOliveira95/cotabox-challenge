# Multi-stage Dockerfile para Next.js (produção)
# Stage 1: instalar dependências e construir
FROM node:18-alpine AS builder
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: imagem de produção menor
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# runtime deps
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# copiar build e arquivos necessários
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/components ./components
COPY --from=builder /app/lib ./lib

# diretório para persistência (SQLite)
VOLUME ["/data"]
ENV DATABASE_FILE=/data/database.sqlite

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["npm","start"]
