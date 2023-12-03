import {
  DB,
  createPedido,
  getPedido,
  getProduto,
  getTodosItemPedidoDoCliente,
  insertItemPedido,
} from "../db/client.js";

export async function getTodosPedidos(req, res) {
  const pedidos = await DB.query(
    "SELECT * FROM item_pedido ORDER BY codigo_produto DESC"
  );

  res.status(200).json(pedidos.rows);
}

export async function getItemDoClienteController(req, res) {
  const { params } = req;

  const itensPedidos = await getTodosItemPedidoDoCliente(params.codigo_cliente);

  res.status(200).json(itensPedidos);
}

export async function createItemController(req, res) {
  const { body } = req;

  let pedido = await getPedido(body.codigo_cliente);

  if (!pedido) {
    pedido = await createPedido(body.codigo_cliente, body.total);
  }

  const produto = await getProduto(body.codigo_produto);

  const itemPedido = await insertItemPedido(
    pedido.codigo_pedido,
    produto.codigo_produto,
    1,
    produto.preco
  );

  res.status(201).json(itemPedido ?? null);
}

export async function updateItemQuantidadeController(req, res) {
  const { body } = req;

  const produto = await getProduto(body.codigo_produto);

  const pedido = await DB.query(
    `
      UPDATE item_pedido
      SET quantidade = $1, total_item = $2
      WHERE codigo_pedido IN (
        SELECT codigo_pedido FROM pedidos WHERE codigo_cliente = $3
      ) AND codigo_produto = $4
        AND sequencial = $5
        RETURNING *;
    `,
    [
      body.quantidade,
      produto.preco * body.quantidade,
      body.codigo_cliente,
      body.codigo_produto,
      body.sequencial,
    ]
  );

  res.status(200).json(pedido.rows[0] ?? null);
}

export async function deleteItemController(req, res) {
  const { body } = req;

  const pedido = await DB.query(
    `
      DELETE FROM item_pedido
      WHERE codigo_pedido IN (
          SELECT codigo_pedido FROM pedidos WHERE codigo_cliente = $1
      ) AND codigo_produto = $2
        RETURNING *;
    `,
    [body.codigo_cliente, body.codigo_produto]
  );

  res.status(204).json(pedido.rows[0] ?? null);
}

export async function finalizarPedidoController(req, res) {
  const { body } = req;

  const itemPedidoDeletado = await DB.query(
    `
      DELETE FROM item_pedido WHERE codigo_pedido IN (
        SELECT codigo_pedido FROM pedidos WHERE codigo_cliente = $1
      );
    `,
    [body.codigo_cliente]
  );

  const pedidoDeletado = await DB.query(
    "DELETE FROM pedidos WHERE codigo_cliente = $1;",
    [body.codigo_cliente]
  );

  res.status(204).json(pedidoDeletado.rows[0] ?? null);
}
