// Aqui lo de la página de busqueda_usuarios, solo lo indispensable y acorde al pdf
const API = 'http://localhost:8080/api/v1/usuarios/buscar';
const form = document.getElementById('formBusqueda');
const texto = document.getElementById('texto');
const mensaje = document.getElementById('mensaje');
const lista = document.getElementById('resultados');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  lista.innerHTML = '';
  const q = texto.value.trim();

  if (q.length < 3) {
    mostrar('La búsqueda debe contener al menos 3 caracteres.', 'error');
    return;
  }

  try {
    const res = await fetch(API + '?texto=' + encodeURIComponent(q));
    const usuarios = await res.json().catch(() => ({ mensaje: 'Error ' + res.status + ' del servidor' }));
    if (!res.ok) throw new Error(usuarios.mensaje);

    if (usuarios.length === 0) {
      mostrar('No se encontraron usuarios.', 'error');
      return;
    }
    mostrar('Resultados encontrados: ' + usuarios.length, 'ok');
    usuarios.forEach(u => {
      const li = document.createElement('li');
      li.innerHTML = '<strong></strong><br><small></small>';
      li.querySelector('strong').textContent = `${u.nombre} ${u.apellidoPaterno} ${u.apellidoMaterno}`;
      li.querySelector('small').textContent = '@' + u.usuario;
      lista.appendChild(li);
    });
  } catch (err) {
    mostrar(err.message === 'Failed to fetch' ? 'No se pudo conectar con el servidor.' : err.message, 'error');
  }
});

function mostrar(t, clase) {
  mensaje.textContent = t;
  mensaje.className = 'mensaje ' + clase;
}
