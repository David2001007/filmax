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
      <div>
        ${row.doc.nome} (${row.doc.tipo})
      </div>
      <div>
        <button class="btn btn-sm btn-primary me-2" onclick="editarUsuario('${row.id}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirUsuario('${row.id}')">Excluir</button>
      </div>
    `;
    listaUsuarios.appendChild(li);
  });
}

formUsuario.addEventListener('submit', async e => {
  e.preventDefault();

  const idEdicao = document.getElementById('idEdicao').value;
  const rev = document.getElementById('idEdicao').getAttribute('data-rev');

  const usuario = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    senha: document.getElementById('senha').value,
    tipo: document.getElementById('tipo').value
  };

  try {
    if (idEdicao) {
      await dbUsuarios.put({
        _id: idEdicao,
        _rev: rev,
        ...usuario
      });
      alert('Usuário atualizado com sucesso!');
    } else {
      await dbUsuarios.put({
        _id: new Date().toISOString(),
        ...usuario
      });
      alert('Usuário salvo com sucesso!');
    }

    formUsuario.reset();
    document.getElementById('idEdicao').value = '';
    document.getElementById('idEdicao').removeAttribute('data-rev');
    listarUsuarios();
  } catch (err) {
    alert('Erro ao salvar/editar usuário.');
    console.error(err);
  }
});

async function editarUsuario(id) {
  try {
    const doc = await dbUsuarios.get(id);

    document.getElementById('nome').value = doc.nome;
    document.getElementById('email').value = doc.email;
    document.getElementById('senha').value = doc.senha;
    document.getElementById('tipo').value = doc.tipo;
    document.getElementById('idEdicao').value = doc._id;
    document.getElementById('idEdicao').setAttribute('data-rev', doc._rev);
  } catch (err) {
    alert('Erro ao carregar dados para edição.');
    console.error(err);
  }
}

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
