import { client } from "../db/client.js";

export const loginController = async (req, res) => {
  const { body } = req;

  let loginQuery;
  try {
    loginQuery = await client.query(
      "SELECT * FROM login WHERE usuario = $1 AND senha = $2",
      [body["usuario"], body["senha"]]
    );
  } catch (e) {
    console.log(e);

    res
      .status(400)
      .json({ mensagem: "Algo deu errado ao tentar realizar o login" });
  }

  if (!loginQuery.rowCount) {
    return res
      .status(400)
      .json({ mensagem: "Os dados de login estão incorretos" });
  }

  const login = loginQuery.rows[0];

  try {
    const clienteQuery = await client.query(
      "SELECT * FROM cliente WHERE codigo_cliente = $1",
      [login.codigo_cliente]
    );

    return res.status(200).json({
      cliente: clienteQuery.rows[0],
      login,
    });
  } catch (e) {
    console.log(e);

    return res
      .status(400)
      .json({ mensagem: "Algo deu errado ao tentar realizar o login" });
  }
};
