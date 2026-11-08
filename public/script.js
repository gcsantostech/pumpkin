const links = document.querySelectorAll("ul a");

links.forEach((link) =>
  link.addEventListener("click", () => linkClicked(link)),
);

const linkClicked = (link) => {
  links.forEach((link) => link.classList.remove("active"));
  link.classList.add("active");
};
