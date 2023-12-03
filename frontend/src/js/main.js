function estaAutenticado() {
  try {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    return Boolean(cliente?.codigo_cliente || cliente?.admin);
  } catch (e) {
    console.log(e);
  }
}

function redirecionaParaProdutosSeAutenticado() {
  const autenticado = estaAutenticado();
  if (autenticado) {
    window.location.href = "/frontend/index.html";
  }

  return autenticado;
}

function redirecionaParaLoginSeNaoAutenticado() {
  const autenticado = !estaAutenticado();
  if (autenticado) {
    window.location.href = "/frontend/login.html";
  }

  return autenticado;
}

function logout() {
  localStorage.removeItem("cliente");
  location.href = "/frontend/login.html";
}

const logoutBtn = document.querySelector(".logout");
logoutBtn?.addEventListener("click", logout);

async function adicionarAoCarrinho(codigo_produto) {
  const cliente = JSON.parse(localStorage.getItem("cliente"));
  const codigo_cliente = cliente.codigo_cliente;

  const res = await fetch("http://localhost:3000/adiciona-item-carrinho", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codigo_produto, codigo_cliente }),
  });

  return res;
}

async function removerDoCarrinho(codigo_produto) {
  const cliente = JSON.parse(localStorage.getItem("cliente"));
  const codigo_cliente = cliente.codigo_cliente;

  const res = await fetch("http://localhost:3000/remove-item-carrinho", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codigo_produto, codigo_cliente }),
  });

  return res;
}

async function mudarQuantidade(codigo_produto, sequencial, quantidade) {
  const cliente = JSON.parse(localStorage.getItem("cliente"));
  const codigo_cliente = cliente.codigo_cliente;

  const res = await fetch("http://localhost:3000/item-pedido-quantidade", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codigo_produto,
      codigo_cliente,
      sequencial,
      quantidade,
    }),
  });

  return res;
}

async function getProdutos() {
  let produtos = [];
  if (estaAutenticado()) {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    const resItemPedido = await fetch(
      `http://localhost:3000/item-pedido/${cliente.codigo_cliente}`
    );
    produtos = await resItemPedido.json();
  }

  return produtos;
}
