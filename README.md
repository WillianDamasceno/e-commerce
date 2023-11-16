# e-commerce

## Criar o Banco de dados

- Instalar o Postgres 15
- Instalar o pgAdmin 7.8

- Registrar um server
  - name: Postgres 15
  - Host: localhost
  - password: 123123123
  - Ativar o botão 'Save Password'
- Criar um banco
  - database: ecommerce
  - template: template0
  - tablespace: pg_default
- Criar tabelas

  - Entrar na Query Toll
  - Colar o SQL do arquivo `tables.sql

- Código para teste

```sql
INSERT INTO login (usuario, senha) VALUES ('lucas', '123');

SELECT * FROM login
```

## Inicializar o projeto

- Requisitos

  - Node: 18.18.2
  - Extensão Live Server para o VSCode
