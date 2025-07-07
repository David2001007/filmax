const dbUsuarios = new PouchDB('usuarios');

const formLogin = document.getElementById('formLogin');
const mensagemErro = document.getElementById('mensagemErro');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const resultado = await dbUsuarios.allDocs({ include_docs: true });
  const usuario = resultado.rows.find(row => row.doc.email === email && row.doc.senha === senha);

  if (usuario) {
    alert('Login realizado com sucesso!');
    if (usuario.doc.tipo === 'admin') {
      window.location.href = '../../projeto/cadastroFilme/index.html';
    } else {
      window.location.href = '../../projeto/dashboard/index.html';
    }
  } else {
    mensagemErro.textContent = 'Email ou senha inválidos';
  }
});
