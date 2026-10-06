# Multi-stage production build for PhysioPMR
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json tsconfig*.json vite.config.ts index.html ./
RUN npm ci

# Copy source code and build client
COPY src/ ./src/
RUN npm run build

# Runner stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --omit=dev

# Copy server, built client assets, and initial database
COPY server/ ./server/
COPY data/ ./data/
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "server/server.js"]
