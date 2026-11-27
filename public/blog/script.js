async function loadPosts() {
  const container = document.querySelector(".blogCards");

  try {
    const res = await fetch("/posts/");
    const posts = await res.json();

    if (posts.length === 0) {
      container.innerHTML = "<p>Em breve, novas notícias.</p>";
      return;
    }

    if (!res.ok) 
      return res.json();

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      container.innerHTML += `
          <div class="blogCard">
            <img src="${post.image}" alt="${post.title}" />
            <div class="blogCardBody">
              <h2>${post.title}</h2>
              <p>${post.sumary}</p>
              <a href="${post.url}" class="blogLink">Saiba mais →</a>
            </div>
          </div>`;
    }
  } catch (erro) {
    container.innerHTML = "<p>Não foi possível carregar as notícias.</p>";
  }
}
