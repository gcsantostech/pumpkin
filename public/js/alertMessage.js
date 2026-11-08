const alertMessage = (type, message) => {
  const alertMessageCard = document.querySelector(".alertMessage");
  const iconErrorMessage = "<i class='ph ph-warning-circle'></i>";
  const iconCheckMessage = "<i class='ph ph-check'></i>";

  alertMessageCard.style.display = "block";
  alertMessageCard.classList.add(`${type}`);

  if (type === "error") {
    alertMessageCard.innerHTML = `${iconErrorMessage} ${message}`;
  } else {
    alertMessageCard.innerHTML = `${iconCheckMessage} ${message}`;
  }
  setTimeout(() => {
    alertMessageCard.style.display = "none";
  }, 2000);
};
