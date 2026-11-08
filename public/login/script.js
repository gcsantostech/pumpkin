const email = document.querySelector("#iptEmail");
const password = document.querySelector("#iptPassword");
const form = document.querySelector("form");
const iconError = "<i class='ph ph-warning-circle'></i>";

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const isEmpty = () => {
  inputErrorEmail.innerHTML = "";
  inputErrorPassword.innerHTML = "";
  let empty = false;

  if (email.value === "") {
    inputErrorEmail.innerHTML = `${iconError} O campo é obrigatório`;
    empty = true;
  }

  if (password.value === "") {
    inputErrorPassword.innerHTML = `${iconError} O campo é obrigatório`;
    empty = true;
  }
  return empty;
};
