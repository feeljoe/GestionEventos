// Funcion para validar el ID y Password dado al form de Login desde la base de datos
function submitData(e) {
  e.preventDefault();
  const id = e.target.id.value;
  const pass = e.target.contrasenna.value;

  const data = {
    id: id,
    contrasenna: pass
  }

  // Si el id y password proporcionados es correcto, da acceso a la plataforma, en caso contrario se dara una alerta en el navegador dando 
  // el mensaje de "Autorizacion denegada"
  fetch('/api/loginA', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      const msg = response.message;
      if (msg === 'Inicio de sesión correcto') {
        const token = response.token;
        const sesion = response.sesion;

        window.location.href = '/html/event.html';
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('sesion', JSON.stringify(sesion));
      } else {
        alert("Autorización denegada");
      }
    })
}