# ── Etapa 1: build ──────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2 servidor nginx 
FROM nginx:alpine

# copia el build al servidor nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# config nginx para que react router funcione
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]