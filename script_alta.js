// Aqui lo de la página de alta_usuarios, solo lo indispensable y acorde al pdf
const API = 'http://localhost:8080/api/v1/usuarios';
const form = document.getElementById('formRegistro');
const mensaje = document.getElementById('mensaje');

// El backend exige una fecha pasada: el máximo seleccionable es ayer
const ayer = new Date();
ayer.setDate(ayer.getDate() - 1);
form.fechaNacimiento.max = ayer.toLocaleDateString('en-CA'); // formato yyyy-mm-dd

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    const d = await res.json().catch(() => ({ mensaje: 'Error ' + res.status + ' del servidor' }));
    if (!res.ok) throw new Error(d.mensaje);
    mostrar(d.mensaje, 'ok');
    form.reset();
  } catch (err) {
    mostrar(err.message === 'Failed to fetch' ? 'No se pudo conectar con el servidor.' : err.message, 'error');
  }
});

function mostrar(texto, clase) {
  mensaje.textContent = texto;
  mensaje.className = 'mensaje ' + clase;
}
