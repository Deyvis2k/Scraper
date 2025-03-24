# Node.js Project

Este é um projeto Node.js com TypeScript, utilizando as dependências `axios`, `cors`, `express` e `jsdom`.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter o Docker instalado no seu sistema. Você pode seguir os guias de instalação abaixo, dependendo do seu sistema operacional:

- [Instalação do Docker no Linux](https://docs.docker.com/engine/install/)
- [Instalação do Docker no Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Instalação do Docker no macOS](https://docs.docker.com/desktop/install/mac-install/)

## Instalação das Dependências

### Usando Docker

1. Clone este repositório em seu diretório local:

    ```bash
    git clone <URL-do-repositório>
    cd <diretório-do-repositório>
    ```

2. Construa e inicie o contêiner Docker:

    ```bash
    docker build -t nodeproject .
    docker run -p 3000:3000 nodeproject
    ```

Isso vai criar e rodar o contêiner, expondo o servidor na porta 3000.

### Usando NPM (opcional)

Se você preferir rodar o projeto fora do Docker, siga os passos abaixo:

1. Instale as dependências:

    ```bash
    npm install
    ```

2. Para rodar o servidor em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

3. Para rodar o servidor em modo de produção:

    ```bash
    npm start
    ```

## Scripts

- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com `ts-node`.
- `npm start`: Inicia o servidor em modo de produção.

## Estrutura do Projeto

- `src/`: Contém os arquivos TypeScript fontes.
- `dist/`: Contém os arquivos JavaScript compilados.

