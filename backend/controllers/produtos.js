import { DB } from "../db/client.js";

export async function getTodosProdutosController(req, res) {
  const produtos = await DB.query(
    "SELECT * FROM produtos ORDER BY codigo_produto DESC"
  );

  res.status(200).json(produtos.rows);
}

export async function getProdutoController(req, res) {
  const { params } = req;

  const produto = await DB.query(
    "SELECT * FROM produtos WHERE codigo_produto = $1",
    [params.codigo_produto]
  );

  res.status(200).json(produto.rows[0] ?? null);
}

export async function createProdutoController(req, res) {
  const { body } = req;

  const produto = await DB.query(
    `
      INSERT INTO produtos (nome, descricao, preco, imagem)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    [body.nome, body.descricao, body.preco, body.imagem]
  );

  res.status(201).json({ produto: produto.rows[0] ?? null });
}

export async function updateProdutoController(req, res) {
  const { body } = req;

  const produto = await DB.query(
    `
      UPDATE produtos
      SET nome = $2, descricao = $3, preco = $4, imagem = $5
      WHERE codigo_produto = $1
      RETURNING *;
    `,
    [body.codigo_produto, body.nome, body.descricao, body.preco, body.imagem]
  );

  res.status(200).json({ produto: produto.rows[0] ?? null });
}

export async function deleteProdutoController(req, res) {
  const { params } = req;

  // Deleta os todos os itens de pedido de um certo produto
  await DB.query("DELETE FROM item_pedido WHERE codigo_produto = $1;", [
    params.codigo_produto,
  ]);

  // Deleta o produto em si
  const produto = await DB.query(
    `
      DELETE FROM produtos
      WHERE codigo_produto = $1
      RETURNING *;
    `,
    [params.codigo_produto]
  );

  res.status(204).json(produto.rows[0] ?? null);
}
