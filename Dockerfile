FROM node:current-alpine3.21 AS build

# Diretório de trabalho para o projeto
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código fonte do Angular para a imagem
COPY . .

# Faz o build da aplicação Angular para produção
RUN npm run build --configuration=${NODE_ENV}

# 2. Etapa para servir a aplicação usando Nginx
FROM nginx:1.25

# Remove o conteúdo padrão do Nginx e copia o build do Angular
COPY --from=build /app/dist/* /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
