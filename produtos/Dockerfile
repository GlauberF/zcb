## Use a imagem Node.js como base
#FROM node:16-alpine
#
## Crie o diretório de trabalho
#WORKDIR /usr/src/api
#
## Copie os arquivos de aplicativo
#COPY . .
#
## Instale as dependências
#RUN npm install
#
## Instale o PM2 globalmente
#RUN npm install pm2 -g
#
## Comando padrão para iniciar o aplicativo usando PM2
#CMD ["pm2-runtime", "pm2.config.js"]

# Use a imagem Node.js como base
FROM node:16-alpine

# Crie o diretório de trabalho
WORKDIR /usr/src/apiprodutos

# Copie os arquivos de aplicativo
COPY . .

# Instale as dependências
RUN npm install

# Instale o PM2 globalmente
RUN npm install pm2 -g

# Transpile TypeScript
RUN npm run build

# Comando padrão para iniciar o aplicativo usando PM2
CMD ["pm2-runtime", "start", "build/server.js"]
