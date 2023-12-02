function redirecionaParaProdutosSeAutenticado() {
  try {
    const cliente = JSON.parse(localStorage.getItem("cliente"));

    if (cliente?.codigo_cliente) {
      window.location.href = "/frontend/index.html";
    }
  } catch (e) {
    console.log(e);
  }
}

function redirecionaParaLoginSeNaoAutenticado() {
  try {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    
    if (!cliente?.codigo_cliente && !cliente.admin) {
      window.location.href = "/frontend/login.html";
    }
  } catch (e) {
    console.log(e);
  }
}

function logout() {
  localStorage.removeItem("cliente");
  location.href = "/frontend/login.html";
}

const logoutBtn = document.querySelector(".logout");
logoutBtn?.addEventListener("click", logout);
