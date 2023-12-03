// Importação das dependências

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { DB } from "./db/client.js";
import { registroController } from "./controllers/registro.js";
import { loginController } from "./controllers/login.js";
import {
  createProduto,
  deleteProduto,
  getProdutoController,
  getTodosProdutos,
  updateProduto,
} from "./controllers/produtos.js";
import {
  deleteCliente,
  getCliente,
  getTodosCliente,
  updateCliente,
} from "./controllers/clientes.js";
import {
  createItemController,
  deleteItemController,
  getItemDoClienteController,
} from "./controllers/item-pedido.js";

// Configuração inicial
const app = express();

// Permite enviar dados no body da requisição POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura o cors
app.use(cors());

// Criar uma conexão com o bando de dados
await DB.connect();

// Rotas

app.get("/", async (req, res, next) => {
  const { rows } = await DB.query("SELECT * FROM login");
  console.log(rows);

  res.json({
    message: "E-commerce melhor que a Amazon!",
  });
});

app.post("/registro", registroController);
app.post("/login", loginController);

app.get("/clientes", getTodosCliente);
app.get("/cliente/:codigo_cliente", getCliente);
app.patch("/cliente", updateCliente);
app.delete("/cliente", deleteCliente);

app.get("/produtos", getTodosProdutos);
app.get("/produto/:codigo_produto", getProdutoController);
app.post("/produto", createProduto);
app.patch("/produto", updateProduto);
app.delete("/produto/:codigo_produto", deleteProduto);

// app.get("/pedido/:codigo_cliente", getPedido);
// app.post("/pedido", createPedido);
// app.patch("/pedido", updatePedido);
// app.delete("/pedido/:codigo_cliente", deletePedido);

app.get("/item-pedido/:codigo_cliente", getItemDoClienteController);
app.post("/item-pedido", createItemController);
// app.patch("/item-pedido/:id", );
app.delete("/item-pedido", deleteItemController);

app.listen(process.env.PORT, () => {
  console.log(`App rodando no link http://localhost:${process.env.PORT}`);
});
