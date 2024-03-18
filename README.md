## 💻 Sobre o projeto

O projeto consiste em desenvolver uma API RESTful utilizando Node.js (na última versão estável) para oferecer um serviço de encurtamento de URLs. O sistema será projetado para escalar verticalmente e atender a diversos usuários.



### 📋 Pré-requisitos obrigatórios

- **[Node.JS](https://nodejs.org/en)**
- **[Docker](https://docs.docker.com/desktop/)** e **[Docker Compose](https://docs.docker.com/compose/)**
- **[Git](https://git-scm.com/)**
- **[NVM](https://github.com/nvm-sh/nvm)**

## ⚙️ Features

- [x] Cadastro e autenticação de usuários
- [x] Encurtamento de URLs
- [x] Endpoint único para encurtar URLs
- [x] Associação de URLs encurtadas a usuários autenticados
- [x] Listagem de URLs encurtadas por usuário
- [x] Edição do endereço de destino de URLs encurtadas
- [x] Exclusão lógica de URLs encurtadas
- [x] Contabilização de acessos
- [x] Registro de data de atualização para todos os registros

OBS: Para simplificar os testes, estou fornecendo diretamente as variáveis de ambiente utilizadas na criação do projeto. Normalmente, em um projeto completo, eu disponibilizaria apenas o arquivo env.example para quem fizesse a clonagem do projeto.

Crie um arquivo .env na raiz do projeto, com as seguintes credenciais:

### Variáveis ambiente
```bash
JWT_SECRET=90af78e089d0cf4c2bce70b3bea5600b
PORT=4000
URL_BASE='http://localhost'
DATABASE_URL="postgresql://docker:short_url_db@localhost:5432/short_url_db?schema=public"
```

### Rodando o projeto
```bash
# Clone esse repositório
$ git clone https://github.com/gabriel-github/url-short.git

#Instalando dependencias
$ yarn install

# Subindo o banco no docker
$ docker-compose up -d

# Rodando as migrations do prisma
$ yarn prisma migrate dev

# Rodando a aplicação em modo de desenvolvimento
$ yarn start:dev

```

### Rodando os testes unitários

```bash
# Comando para rodar os testes
$ yarn test

```

### Acessando a documentação do swagger

OBS: A url vai depender das suas variáveis ambiente, como as variáveis acima estão definidas como PORT=4000 e URL_BASE='http://localhost' a url para o swagger ficará

```bash
  http://localhost:4000/api/doc
```
