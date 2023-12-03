function estaAutenticado() {
  try {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    return Boolean(cliente?.codigo_cliente);
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

  const res = await fetch("http://localhost:3000/item-pedido", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codigo_produto, codigo_cliente }),
  });

  return res;
}

async function removerDoCarrinho(codigo_produto) {
  const res = await fetch("http://localhost:3000/carrinho/remover-produto", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codigo_produto }),
  });

  return res;
}
