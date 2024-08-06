FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:latest AS fronten
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d
ENTRYPOINT ["nginx", "-g", "daemon off;"]