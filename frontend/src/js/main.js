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

const logoutBtn = document.querySelector(".logout");

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("cliente");
  location.href = "/frontend/login/index.html";
});
