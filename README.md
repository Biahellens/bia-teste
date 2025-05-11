# Teste de Busca Semântica

### Objetivo

Desenvolver um sistema onde usuários podem interagir com um assistente de IA para realizar buscas semânticas em seus documentos. O sistema permite que os usuários façam login, criem espaços de trabalho, realizem upload de documentos (PDF/TXT) para treinar a IA e interajam com ela em dois modos distintos: chat contextual (baseado nos documentos do workspace) e chat pessoal (histórico global sem contexto).

- [Teste de Busca Semântica](#TestedeBuscaSemântica)
  - [Tecnologias](#tecnologias)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Inicializando](#inicializando)
    - [Frontend](#frontend)
    - [Backend](#backend)

## Tecnologias

Para o desenvolvimento deste projeto, foi utilizado as seguintes tecnologias:

- [Docker](https://www.docker.com/);

#### Frontend

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React-Router-dom](https://reactrouter.com/en/main)
- [Tailwind](https://tailwindcss.com/);

#### Backend

- [Typeorm](https://typeorm.io/)
- [Nestjs](https://nestjs.com/)
    - Multer
    - passport-jwt
    - bcryptjs
- [openai]([https://nodejs.org/en/](https://platform.openai.com/api-keys))
- [TypeScript](https://www.typescriptlang.org/);

#### Banco de dados

- [PostgreSQL](https://www.postgresql.org/);

### Execução Local com Docker-compose

Para executar o projeto localmente, siga os seguintes passos:

1.  **Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.** Você pode encontrar as instruções de instalação em [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/) e [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).

2.  **Clone o repositório do projeto:**

3.  **Configure as variáveis de ambiente:** Crie um arquivo `.env` na raiz do seu backend e defina as variáveis de ambiente necessárias como a URL do banco de dados PostgreSQL, a chave da API da OpenAI ou do HuggingFace, a chave secreta do JWT, etc. Exemplo de `.env` para o backend:

    ```
    DATABASE_URL=postgres://user:password@host:port/database
    JWT_SECRET=sua_chave_secreta_jwt
    OPENAI_API_KEY=sua_chave_api_openai
    OPENAI_EMBEDDING_MODEL=text-embedding-ada-002
    ```

4.  **Execute o Docker Compose:** Na raiz do seu projeto (onde o arquivo `docker-compose.yml` está localizado), execute o seguinte comando para construir e iniciar os containers definidos:

    ```bash
    docker-compose up -d --build
    ```

    A flag `-d` executa os containers em segundo plano, e a flag `--build` garante que as imagens sejam construídas novamente caso haja alterações no `Dockerfile` ou no `docker-compose.yml`.

5.  **Acesse a aplicação:** Após os containers serem iniciados com sucesso, você poderá acessar o frontend da aplicação através do seu navegador, geralmente em `http://localhost:5173/` (a porta pode ser definida no seu `docker-compose.yml` ou nas configurações do Next.js). O backend estará rodando em `http://localhost:3000` (também definido no `docker-compose.yml`).

### Frontend:

Iniciando o frontend

```bash
  $ cd frontend
  $ pnpm install
  $ pnpm start
```

### Contribuição

Se você deseja contribuir para este projeto, por favor, siga os seguintes passos:

1.  Faça um fork do repositório.
2.  Crie uma branch para sua feature (`git checkout -b feature/sua-feature`).
3.  Faça commit de suas mudanças (`git commit -am 'Add some feature'`).
4.  Faça push para a branch (`git push origin feature/sua-feature`).
5.  Abra um pull request.
