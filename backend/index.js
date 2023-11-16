// Importação das dependências

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { client } from "./db/client.js";

// Configuração inicial
const app = express();

app.use(express.json());
app.use(cors());

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


app.listen(process.env.PORT, () => {
  console.log("App rodando no link http://localhost:3000");
});
