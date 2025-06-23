const db = new PouchDB('filmes');

async function carregarDetalhes() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) return;

  try {
    const filme = await db.get(id);
    document.getElementById('detalhesFilme').innerHTML = `
      <h1>${filme.titulo}</h1>
      <p>${filme.descricao}</p>
      <p><strong>Categoria:</strong> ${filme.categoria}</p>
      <img src="${filme.imagem}" class="img-fluid mb-3" alt="${filme.titulo}">
      <div class="ratio ratio-16x9">
        <iframe width="560" height="315"
        src="${filme.trailer}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
      </div>
    `;
  } catch (err) {
    document.getElementById('detalhesFilme').innerHTML = '<p>Filme não encontrado.</p>';
  }
}

carregarDetalhes();
