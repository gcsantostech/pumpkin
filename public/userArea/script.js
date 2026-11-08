const navsBtn = document.querySelectorAll(".btnNav");

navsBtn.forEach((btn) => btn.addEventListener("click", () => {
  navsBtn.forEach(btn => btn.classList.remove("active"));
  btn.classList.add("active")
}));

setTimeout(() => {
  validateSession()
},);

// alertMessage("success", `Bem vindo de volta ${sessionStorage.USERNAME}`)