import { client } from "../db/client.js";

export const registroController = async (req, res) => {
  const { body } = req;

  const usuarioQuery = await client.query(
    "SELECT * FROM login WHERE usuario = $1",
    [body["usuario"]]
  );

  if (usuarioQuery.rowCount) {
    return res.status(409).json({
      mensagem: "Usuário já existente, escolha outro nome de usuário.",
    });
  }

  const cliente = await client.query(
    `
        INSERT INTO cliente (nome, rua, numero, complemento, bairro, cidade, uf, cep)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `,
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

  await client.query(
    `
        INSERT INTO login (usuario, senha, codigo_cliente)
        VALUES ($1, $2, $3)
      `,
    [body["usuario"], body["senha"], cliente.rows[0].codigo_cliente]
  );

  return res.status(200).json({ cliente: cliente.rows[0] });
};
