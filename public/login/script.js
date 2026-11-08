const email = document.querySelector("#iptEmail");
const password = document.querySelector("#iptPassword");
const form = document.querySelector("form");
const iconError = "<i class='ph ph-warning-circle'></i>";

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function authenticateUser() {
  if (isEmpty()) 
    return;

  fetch("/user/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
      .then(json => {

        sessionStorage.EMAIL_USER = json.email;
        sessionStorage.USERNAME_USER = json.username;
        sessionStorage.ID_USER = json.id;
        
        alertMessage("success", `Bem vindo ${json.username}!`);
        setTimeout(() => {
          window.location = "/userArea/feed.html";
        }, 1000);
      });
    } else {
      return res.json().then(json => {
        alertMessage("error", json.message);
      })
    }
  })
  .catch(error => {
    console.log(error);
    alertMessage("error", "Erro ao tentar realizar o login.")
  });
}

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
