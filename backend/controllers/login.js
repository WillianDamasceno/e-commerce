import { DB } from "../db/client.js";

function isAdmin(body) {
  return (
    body["usuario"].toLowerCase() === "admin" &&
    body["senha"].toLowerCase() === "admin"
  );
}

export const loginController = async (req, res) => {
  const { body } = req;

  if (isAdmin(body)) {
    return res.status(200).json({ admin: true });
  }

  const loginQuery = await DB.query(
    "SELECT * FROM login WHERE usuario = $1 AND senha = $2 LIMIT 1",
    [body["usuario"], body["senha"]]
  );

  if (!loginQuery.rowCount) {
    return res.status(401).json({
      mensagem:
        "Os dados de login estão incorretos, verifique suas credenciais.",
    });
  }

  const login = loginQuery.rows[0];

  const clienteQuery = await DB.query(
    "SELECT * FROM cliente WHERE codigo_cliente = $1",
    [login.codigo_cliente]
  );

  return res.status(200).json({
    cliente: clienteQuery.rows[0],
    login,
  });
};
