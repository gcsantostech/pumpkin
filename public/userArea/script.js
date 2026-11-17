const navsBtn = document.querySelectorAll(".btnNav");
const pages = document.querySelectorAll(".page");

// Recupera a última página selecionada
const savePage = localStorage.getItem("pageSelected");

// Verifica se existe uma página salva
if (savePage) {
    navsBtn.forEach(btn => btn.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // Ativa o botão e a página salvos
    const saveBtn = document.querySelector(`[data-page="${savePage}"]`);
    const savePageElement = document.getElementById(savePage);

    if (saveBtn && savePageElement) {
        saveBtn.classList.add("active");
        savePageElement.classList.add("active");
    }
}

navsBtn.forEach((btn) => btn.addEventListener("click", () => {

    navsBtn.forEach(btn => btn.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach(page => page.classList.remove("active"));

    const page = document.getElementById(btn.dataset.page);
    page.classList.add("active");

    localStorage.setItem("pageSelected", btn.dataset.page);

}));

setTimeout(() => {
  validateSession()
},);