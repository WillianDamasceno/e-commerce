import { DB } from "../db/client.js";

export async function getTodosClienteController(req, res) {
  const produtos = await DB.query("SELECT * FROM clientes");

  res.status(200).json({ produtos: produtos.rows });
}

export async function getClienteController(req, res) {
  const { params } = req;

  const produto = await DB.query(
    "SELECT * FROM clientes WHERE codigo_cliente = $1",
    [params.codigo_cliente]
  );

  res.status(200).json({ produto: produto.rows[0] ?? null });
}

export async function updateClienteController(req, res) {
  const { body } = req;

  const produto = await DB.query(
    `
      UPDATE clientes
      SET nome = $2, descricao = $3, preco = $4, imagem = $5
      WHERE codigo_cliente = $1
      RETURNING *;
    `,
    [body.codigo_cliente, body.nome, body.descricao, body.preco, body.imagem]
  );

  res.status(200).json({ produto: produto.rows[0] ?? null });
}

export async function deleteClienteController(req, res) {
  const { body } = req;

  const produto = await DB.query(
    `
      DELETE FROM clientes
      WHERE codigo_cliente = $1
      RETURNING *;
    `,
    [body.codigo_cliente]
  );

  res.status(204).json({ produto: produto.rows[0] ?? null });
}
