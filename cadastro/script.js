const dbUsuarios = new PouchDB('usuarios');

const formUsuario = document.getElementById('formUsuario');
const listaUsuarios = document.getElementById('listaUsuarios');

async function listarUsuarios() {
  const res = await dbUsuarios.allDocs({ include_docs: true });
  listaUsuarios.innerHTML = '';
  res.rows.forEach(row => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.innerHTML = `
      ${row.doc.nome} (${row.doc.tipo})
      <button class="btn btn-sm btn-danger" onclick="excluirUsuario('${row.id}')">Excluir</button>
    `;
    listaUsuarios.appendChild(li);
  });
}

formUsuario.addEventListener('submit', async e => {
  e.preventDefault();
  const usuario = {
    _id: new Date().toISOString(),
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    senha: document.getElementById('senha').value,
    tipo: document.getElementById('tipo').value
  };

  try {
    await dbUsuarios.put(usuario);
    alert('Usuário salvo com sucesso!');
    formUsuario.reset();
    listarUsuarios();
  } catch (err) {
    alert('Erro ao salvar usuário.');
    console.error(err);
  }
});

async function excluirUsuario(id) {
  try {
    const doc = await dbUsuarios.get(id);
    await dbUsuarios.remove(doc);
    listarUsuarios();
  } catch (err) {
    alert('Erro ao excluir.');
    console.error(err);
  }
}

listarUsuarios();
