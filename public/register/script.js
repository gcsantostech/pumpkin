const fullName = document.querySelector("#iptFullName");
const email = document.querySelector("#iptEmail");
const username = document.querySelector("#iptUsername");
const password = document.querySelector("#iptPassword");
const passwordConfirmation = document.querySelector("#iptPasswordConfirmation");
const form = document.querySelector("form");

const iconError = "<i class='ph ph-warning-circle'></i>";
const iconCheck = "<i class='ph ph-check'></i>";

form.addEventListener("submit", (e) => {
  e.preventDefault();
});


const validateName = () => {
  const regex = /^[a-zA-ZÀ-ÿ ]+$/;
  inputErrorName.innerHTML = "";
  const isValid = regex.test(fullName.value);
  if (fullName.value.length < 3) {
    inputErrorName.innerHTML = `${iconError} Seu nome precisa ter no mínimo 3 caracteres`;
  }

  if (!isValid) {
    inputErrorName.innerHTML = `${iconError} Seu nome só pode conter letras`;
  }
};

const validateEmail = () => {
  const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
  const isValid = regex.test(email.value);
  inputErrorEmail.innerHTML = "";

  if (!isValid) {
    inputErrorEmail.innerHTML = `${iconError} E-mail inválido`;
  }
};

const validateUsername = () => {
  const regex = /^[a-z0-9._-]+$/;
  inputErrorUsername.innerHTML = "";
  const isValid = regex.test(username.value);

  if (!isValid) {
    inputErrorUsername.innerHTML = `${iconError} O apelido não pode conter caracteres especiais, letras maiúsculas ou espaços`;
  }
  if (username < 3) {
    inputErrorUsername.innerHTML = `${iconError} O apelido precisa ter no mínimo 3 caracteres`;
  }
};

const validatePassword = () => {
  const password1 = String(password.value).toLowerCase();
  const password2 = String(passwordConfirmation.value).toLowerCase();
  inputErrorConfirmation.innerHTML = "";
  inputErrorPassword.innerHTML = "";

  if (password1.length < 6) {
    inputErrorPassword.innerHTML = `${iconError} A precisa ter no mínimo 6 caracteres`;
  }
  if (password1 != password2) {
    inputErrorConfirmation.innerHTML = `As senhas estão diferentes`;
  }
};

const isEmpty = () => {
  inputErrorName.innerHTML = "";
  inputErrorEmail.innerHTML = "";
  inputErrorUsername.innerHTML = "";
  inputErrorPassword.innerHTML = "";
  inputErrorConfirmation.innerHTML = "";
  let empty = false;

  if (fullName.value === "") {
    inputErrorName.innerHTML = `${iconError} O campo é obrigatório`;
    empty = true;
  }
  if (email.value === "") {
    inputErrorEmail.innerHTML = `${iconError} O campo é obrigatório`;
    empty = true;
  }
  if (username.value === "") {
    inputErrorUsername.innerHTML = `${iconError} O campo é obrigatório`;
    empty = true;
  }
  if (password.value === "") {
    inputErrorPassword.innerHTML = `${iconError} O campo é obrigatório`;
    empty = true;
  }
  if (passwordConfirmation.value === "") {
    inputErrorConfirmation.innerHTML = `${iconError} O campo é obrigatório`;
    empty = true;
  }
  return empty;
};

