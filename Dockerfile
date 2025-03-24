# Usando a imagem oficial do Node.js
FROM node:18

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiando o package.json e o package-lock.json (caso exista)
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando todos os arquivos do projeto
COPY . .

# Compilando o TypeScript
RUN npm run build

# Expondo a porta que o servidor vai rodar
EXPOSE 3000

# Comando para iniciar o servidor em produção
CMD ["npm", "start"]
