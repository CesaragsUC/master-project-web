# 1. Etapa de build do Angular
FROM node:current-alpine3.21 AS build

# Diretório de trabalho para o projeto
WORKDIR /app

# Copia apenas os arquivos essenciais primeiro (melhor aproveitamento de cache)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Agora copia o restante do código-fonte
COPY . .

# Define um argumento para controlar o ambiente
ARG BUILD_ENV=docker

# Define a variável de ambiente dentro do contêiner
ENV NODE_ENV=$BUILD_ENV

# Faz o build da aplicação Angular para o ambiente definido
RUN npx ng build --configuration=$NODE_ENV

# Remove a pasta node_modules para reduzir o tamanho da imagem
RUN rm -rf node_modules

# 2. Etapa para servir a aplicação usando Nginx
FROM nginx:1.25

# Copia a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove o conteúdo padrão do Nginx e copia o build do Angular
COPY --from=build /app/dist/example-app /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
