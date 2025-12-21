<h1>Documentação do projeto <i>Tarefaz</i></h1>

<h2>Resumo</h2>
<i>Tarefaz</i> é um software de gestão de tarefas do usuário.

<h2>Estrutura do projeto</h2>

- **Frontend:** React + Vite
- **Backend:** Node + Express.js

<h2>Requisitos para execução do projeto</h2>

- Git
- Node
- Docker

<h2>Dependências do projeto</h2>
Esta categoria aborda os módulos utilizados no projeto.

**Recomenda-se** a execução do projeto por meio do <i><b>Docker</b></i> para instalação automática dos módulos por meio dos containers.

~~~ javascript
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "nodemon": "^3.1.10"
    "react": "^19.1.1",
~~~

<h2>Scripts</h2>
Scripts disponíveis para utilização durante o desenvolvimento.

- Backend
~~~ javascript
{
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon servidor.js",
    "start": "node servidor.js"
}
~~~
- Frontend
~~~ javascript
{
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
}
~~~
<h2><i>Endpoints</i> (rotas)</h2>

Tipo de requisição | URL | Funcionalidade | Exemplo de uso
---|---| --- | ---
`GET`|http://localhost:3000 | Rota de teste (Retorna) uma mensagem `Olá Mundo!` | http://localhost:3000
`GET`| http://localhost:3000`/tarefas` | Retorna a lista de tarefas cadastradas no arquivo JSON. | http://localhost:3000`/tarefas`
`POST`| http://localhost:3000`/tarefas` | Cria uma tarefa no arquivo JSON. | http://localhost:3000`/tarefas`
`PUT` | http://localhost:3000`/tarefas/id` | Atualiza <i>status</i> de uma tarefa. | http://localhost:3000`/tarefas/1762648889848`
`DELETE` | http:localhost:3000`/tarefas/id` | Deleta um tarefa registrada no arquivo JSON pelo **ID**.| http://localhost:3000`/tarefas/1762648889848`

<h3><i>Body</i> (Corpo) das requisições</h3>
As requisições para criar (POST) e atualizar (PUT) uma tarefa devem possuir um <i>body</i>(corpo).

- **Criar tarefa (POST)**
~~~ javascript
"titulo" : "string",
"descricao" : "string"
~~~

**Exemplo:**
~~~javascript
{
    "titulo" : "Comprar mantimentos",
    "descricao" : "Comprar frios para fazer lanches."
}
~~~

- **Atualizar tarefa (PUT)**
~~~ javascript
"id": "string",
"concluida": boolean
~~~
**Exemplo:**
~~~
{
	"id": "1766102344856",
	"concluida":false
}
~~~
