<div align="center">
  <img src="https://github.com/vagnerwentz/customerx/blob/master/.github/logo-customer.png" alt="Logo da CustomerX" />

  <h1> Teste técnico Fullstack Júnior </h1>
</div>


## Como rodar o projeto
```bash
> Primeiramente precisamos instalar o postgres, será instalado via docker
$ docker run --name customer_x -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

> Após rodar o comando, provável que apareça um número enorme no terminal, se sim, 100% que instalou correto. 
Para verificar, digite.
$ docker container ps
ou
$ docker container start customer_x

> Se estiver tudo okay, bacana, vamos agora clonar o projeto na nossa máquina rodando o comando no terminal.
$ git clone https://github.com/vagnerwentz/customerx.git

> Após a instalação, devemos acessar a pasta server e rodar o comando abaixo para instalar as dependências.
$ yarn

> Acessar a pasta para instalar as dependências.
$ yarn

> Logo as instalações devemos ter uma GUI para o banco de dados, no meu caso foi usado o DBeaver.
Para você configurar do seu jeito, basta acessar o arquivo ormconfig.json no server.

> Logo após o banco configurado também, vamos entrar na pasta server e digitar, parar gerar todas as migrations.
$ yarn typeorm migration:run

> Criar um seed na tabela de administrador para termos acesso no front-end, ou back-end via Insomnia ou Postman.
$ yarn typeorm seed:run

> Caso queira verificar no banco de dados se tudo ocorreu bem!

> Entrar na pasta server e rodar, para iniciar o servidor na porta 3333.
$ yarn dev:server

> Entrar na pasta web e rodar, para inicar o front-end na porta 3000.
$ yarn start

> Acessando o front-end, para acessar o front-end, usar
$ email: admin@customer.com.br
$ password: admincustomer

> Após isto, brincar conforme você queira, enjoy :smiley:
```

## Anotações
[Anotações no Notion](https://www.notion.so/Teste-CustomerX-Fullstack-Junior-7094b8e7c8dc43d4b5de932ccaad7df3)
