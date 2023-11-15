# e-commerce

## Criar o Banco de dados

- Instalar o Postgres

- Alterar o modo de criptografia da senha do Postgres para não precisa de senha nunca
  - Entrar na pasta **C:\Program Files\PostgreSQL\15\data**
  - Encontre o arquivo **pg_hba.conf** faça uma cópia dele
  - Abra o arquivo original com o VSCode
  - No final do arquivo haverá uma lista de configurações
  - Procure pela coluna **METHOD**
  - Substituir todas as linhas com o valor **scram-sha-256** ou **md5** para **trust**
  - Dessa forma o Postgres não vai pedir senha quando for usar o `psql` no terminal

---

- Entrar na pasta **backend** pelo terminal

```bash
cd backend
```

- Para Criar o banco de dados execute o seguinte comando

```bash
psql -U postgres -f db/tables.sql
```

- o psql é uma ferramenta que permite a verificação dos bancos de dados

- Para se conectar ao bando criado anteriormente

```bash
psql -U postgres -d ecommerce
```

- Listar bancos existente

```bash
\l
```

- Listar tabelas do banco conectado atualmente

```bash
\dt
```

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

## Inicializar o projeto

- Requisitos

  - Node: 18.18.2
  - Extensão Live Server para o VSCode
