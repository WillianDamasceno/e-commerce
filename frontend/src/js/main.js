const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("cliente");
  location.href = "/frontend/login/index.html";
});
