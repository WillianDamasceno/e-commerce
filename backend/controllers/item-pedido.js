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
  console.log(params.codigo_cliente);

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

export async function updateItemController(req, res) {
  const { body } = req;

  const pedido = await DB.query(
    `
      UPDATE pedidos
      SET quantidade = $2, total = $3
      WHERE codigo_cliente = $1
      RETURNING *;
    `,
    [body.codigo_cliente, body.quantidade, body.total]
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
      ) AND codigo_produto = $2;
    `,
    [body.codigo_cliente, body.codigo_produto]
  );

  res.status(204).json(pedido.rows[0] ?? null);
}
