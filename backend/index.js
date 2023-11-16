// Importação das dependências

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { client } from "./db/client.js";

// Configuração inicial
const app = express();

// Permite enviar dados no body da requisição POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura o cors
app.use(cors());

// Criar uma conexão com o bando de dados
await client.connect();

// Rotas

app.get("/", async (request, response, next) => {
  const { rows } = await client.query("SELECT * FROM login");
  console.log(rows);

  await client.end();

  response.json({
    message: "E-commerce melhor que a Amazon!",
  });
});

app.post("/registro", async (req, res) => {
  const { body } = req;

  const usuarioQuery = await client.query(
    "SELECT * FROM login WHERE usuario = $1",
    [body["usuario"]]
  );

  if (usuarioQuery.rowCount) {
    return res.status(403).json({ mensagem: "Usuário já existente" });
  }

  try {
    await client.query(
      "INSERT INTO cliente (nome, rua, numero, complemento, bairro, cidade, uf, cep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        body["nome"],
        body["rua"],
        body["numero"],
        body["complemento"],
        body["bairro"],
        body["cidade"],
        body["uf"],
        body["cep"],
      ]
    );
  } catch (e) {
    console.log(e);

    await client.end();
    return res
      .status(400)
      .json({ mensagem: "Algo deu errado ao tentar cadastrar o usuário" });
  }

  const codigoUltimoClienteQuery = await client.query(
    "SELECT codigo_cliente FROM cliente ORDER BY codigo_cliente DESC LIMIT 1"
  );
  const codigoUltimoCliente = codigoUltimoClienteQuery.rows[0].codigo_cliente;

  try {
    await client.query(
      "INSERT INTO login (usuario, senha, codigo_cliente) VALUES ($1, $2, $3)",
      [body["usuario"], body["senha"], codigoUltimoCliente]
    );
  } catch (e) {
    console.log(e);

    await client.end();
    return res
      .status(400)
      .json({ mensagem: "Algo deu errado ao tentar cadastrar o usuário" });
  }

  await client.end();
  return res.status(200);
});

app.post("/login", async (req, res) => {
  const { body } = req;

  let loginQuery;
  try {
    loginQuery = await client.query(
      "SELECT * FROM login WHERE usuario = $1 AND senha = $2",
      [body["usuario"], body["senha"]]
    );
  } catch (e) {
    console.log(e);

    await client.end();
    res
      .status(400)
      .json({ mensagem: "Algo deu errado ao tentar realizar o login" });
  }

  if (!loginQuery.rowCount) {
    await client.end();
    return res
      .status(400)
      .json({ mensagem: "Os dados de login estão incorretos" });
  }

  const login = loginQuery.rows[0];

  try {
    const clienteQuery = await client.query(
      "SELECT * FROM cliente WHERE codigo_cliente = $1",
      [login.codigo_cliente]
    );

    await client.end();
    return res.status(200).json({
      cliente: clienteQuery.rows[0],
      login,
    });
  } catch (e) {
    console.log(e);

    await client.end();
    return res
      .status(400)
      .json({ mensagem: "Algo deu errado ao tentar realizar o login" });
  }
});

app.get("/clientes", async () => {});
app.get("/cliente/:id", async () => {});
app.post("/cliente/:id", async () => {});
app.patch("/cliente/:id", async () => {});
app.delete("/cliente/:id", async () => {});

app.get("/produtos", async () => {});
app.get("/produto/:id", async () => {});
app.post("/produto/:id", async () => {});
app.patch("/produto/:id", async () => {});
app.delete("/produto/:id", async () => {});

app.get("/pedido/:id", async () => {});
app.post("/pedido/:id", async () => {});
app.patch("/pedido/:id", async () => {});
app.delete("/pedido/:id", async () => {});

app.get("/item-pedido/:id", async () => {});
app.post("/item-pedido/:id", async () => {});
app.patch("/item-pedido/:id", async () => {});
app.delete("/item-pedido/:id", async () => {});

app.listen(process.env.PORT, () => {
  console.log(`App rodando no link http://localhost:${process.env.PORT}`);
});
