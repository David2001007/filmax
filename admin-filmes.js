const db = new PouchDB('filmes');

async function atualizarLista() {
  const res = await db.allDocs({ include_docs: true });
  console.log(res.rows);
}

const form = document.getElementById('formFilme');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const filme = {
    _id: new Date().toISOString(),
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    trailer: document.getElementById('trailer').value,
    imagem: document.getElementById('imagem').value,
    categoria: document.getElementById('categoria').value
  };

  try {
    await db.put(filme);
    alert('Filme cadastrado com sucesso!');
    form.reset();
  } catch (err) {
    alert('Erro ao salvar filme.');
    console.error(err);
  }
});
