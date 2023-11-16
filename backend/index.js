// Importação das dependências

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { client } from "./db/client.js";
import { login as registroController } from "./controllers/registro.js";
import { loginController } from "./controllers/login.js";

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

  response.json({
    message: "E-commerce melhor que a Amazon!",
  });
});

app.post("/registro", registroController);
app.post("/login", loginController);

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
