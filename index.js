const dbFilmes = new PouchDB('filmes');

function carregarFilmes() {
  dbFilmes.allDocs({ include_docs: true }).then(result => {
    const container = document.getElementById('filmesDestaque');
    container.innerHTML = '';

    const filmes = result.rows.map(row => row.doc);
    const filmesAleatorios = filmes.sort(() => 0.5 - Math.random()).slice(0, 6);

    filmesAleatorios.forEach(filme => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
          <div class="card-body">
            <h5 class="card-title">${filme.titulo}</h5>
            <p class="card-text">${filme.descricao.slice(0, 100)}...</p>
            <a href="obra.html?id=${filme._id}" class="btn btn-primary">Ver mais</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  });
}

function filtrarPorCategoria(categoria) {
  const titulo = document.getElementById('titulo-categoria');
  titulo.innerText = `Filmes de ${categoria} em Destaque`;

  dbFilmes.allDocs({ include_docs: true }).then(result => {
    const container = document.getElementById('filmesDestaque');
    container.innerHTML = '';
    const filmes = result.rows.map(row => row.doc).filter(f => f.categoria === categoria);

    filmes.forEach(filme => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
          <div class="card-body">
            <h5 class="card-title">${filme.titulo}</h5>
            <p class="card-text">${filme.descricao.slice(0, 100)}...</p>
            <a href="obra.html?id=${filme._id}" class="btn btn-primary">Ver mais</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  });
}


document.querySelectorAll('.categoria').forEach(item => {
  item.addEventListener('click', e => {
    const categoria = e.target.dataset.categoria;
    filtrarPorCategoria(categoria);
  });
});

carregarFilmes();
