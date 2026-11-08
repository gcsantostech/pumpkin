// sessão
function validateSession() {
  const email = sessionStorage.EMAIL_USER;
  const username = sessionStorage.USERNAME_USER;

  if (email != undefined && username != undefined) {
    const usernamePerfil = document.querySelector("#username");
    usernamePerfil.textContent = `@${username}`;
  } else {
    window.location = "../login/index.html";
  }
}

function logoutSession() {
  sessionStorage.clear();
  window.location = "../login/index.html";
}