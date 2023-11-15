# e-commerce

## Criar o Banco de dados

- Instalar o Postgres

- Entrar na pasta **backend** pelo terminal

```bash
cd backend
```

- Para Criar o banco de dados execute o seguinte comando

```bash
psql -U postgres -d ecommerce -f db/tables.sql
```

- Para verificar se o banco existe execute o seguinte comando

```bash
psql -U postgres
```

- Digite a senha do Postgres e em seguida execute

```bash
\l
```

- Você verá a lista de banco de dados existentes

## Deletar o Banco de dados

- Desconectar totalmente do Postgres rodando os seguintes comandos

```bash
psql -U postgres

\q
```

Em seguida você deve rodar a query que deleta o banco

```bash
psql -U postgres -f db/delete-db.sql
```
