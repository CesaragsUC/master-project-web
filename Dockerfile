# 1. Angular build stage
FROM node:current-alpine3.21 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG BUILD_ENV=docker
ENV NODE_ENV=$BUILD_ENV

# Copie o modelo de ambiente para os ativos (certifique-se de que este arquivo exista no seu projeto Angular)
COPY public/assets/env.template.js /usr/share/nginx/html/assets/env.template.js

RUN npx ng build --configuration=$NODE_ENV
RUN rm -rf node_modules

# 2. Nginx stage
FROM nginx:1.25

# Instalar envsubst (necessário para substituição de variável de ambiente)
RUN apt-get update && apt-get install -y gettext-base

# Copie a configuração do nginx e os ativos compilados
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/example-app /usr/share/nginx/html

# Gere env.js a partir do modelo em tempo de execução e inicie o nginx
CMD ["sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
