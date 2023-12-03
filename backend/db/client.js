import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
const { Client } = pg;

export const DB = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Produtos

export async function getProduto(codigo_produto) {
  const produto = await DB.query(
    `
      SELECT *
      FROM produtos
      WHERE codigo_produto = $1
      LIMIT 1;
    `,
    [Number(codigo_produto)]
  );

  return produto.rows[0] ?? null;
}

// Pedidos

export async function getPedido(codigo_cliente) {
  const pedido = await DB.query(
    `
      SELECT *
      FROM pedidos
      WHERE codigo_cliente = $1
      LIMIT 1;
    `,
    [codigo_cliente]
  );

  return pedido.rows[0] ?? null;
}

export async function createPedido(codigo_cliente, total = 0) {
  const pedido = await DB.query(
    `
      INSERT INTO pedidos (codigo_cliente, total)
      VALUES ($1, $2)
      RETURNING *;
    `,
    [codigo_cliente, total]
  );

  return pedido.rows[0];
}

export async function getTodosItemPedidoDoCliente(codigo_cliente) {
  const pedido = await DB.query(
    `
      SELECT
        ip.*,
        p.nome AS nome_produto,
        p.descricao AS descricao_produto
      FROM
        item_pedido ip
      JOIN
        pedidos pe ON ip.codigo_pedido = pe.codigo_pedido
      JOIN
        produtos p ON ip.codigo_produto = p.codigo_produto
      WHERE
        pe.codigo_cliente = $1
      ORDER BY ip.sequencial
    `,
    [codigo_cliente]
  );

  return pedido.rows ?? [];
}

export async function insertItemPedido(
  codigo_pedido,
  codigo_produto,
  quantidade,
  preco
) {
  const itemPedido = await DB.query(
    `
      INSERT INTO item_pedido (codigo_pedido, codigo_produto, quantidade, total_item)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    [codigo_pedido, codigo_produto, quantidade, preco]
  );

  return itemPedido.rows[0] ?? [];
}
