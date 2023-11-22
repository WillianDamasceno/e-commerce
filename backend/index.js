// Importação das dependências

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { client } from "./db/client.js";
import { registroController } from "./controllers/registro.js";
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

app.get("/", async (req, res, next) => {
  const { rows } = await client.query("SELECT * FROM login");
  console.log(rows);

  res.json({
    message: "E-commerce melhor que a Amazon!",
  });
});

app.post("/registro", registroController);
app.post("/login", loginController);

app.get("/clientes", async (req, res) => {});
app.get("/cliente/:id", async (req, res) => {});
app.post("/cliente/:id", async (req, res) => {});
app.patch("/cliente/:id", async (req, res) => {});
app.delete("/cliente/:id", async (req, res) => {});

app.get("/produtos", async (req, res) => {});
app.get("/produto/:id", async (req, res) => {});
app.post("/produto/:id", async (req, res) => {});
app.patch("/produto/:id", async (req, res) => {});
app.delete("/produto/:id", async (req, res) => {});

app.get("/pedido/:id", async (req, res) => {});
app.post("/pedido/:id", async (req, res) => {});
app.patch("/pedido/:id", async (req, res) => {});
app.delete("/pedido/:id", async (req, res) => {});

app.get("/item-pedido/:id", async (req, res) => {});
app.post("/item-pedido/:id", async (req, res) => {});
app.patch("/item-pedido/:id", async (req, res) => {});
app.delete("/item-pedido/:id", async (req, res) => {});

app.listen(process.env.PORT, () => {
  console.log(`App rodando no link http://localhost:${process.env.PORT}`);
});
