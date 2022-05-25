
function submitData(e) {
  e.preventDefault();
  const id= e.target.id.value;
  const pass = e.target.contrasenna.value;

  const data = {
    id: id,
    contrasenna: pass
  }

  fetch('/api/loginA', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => {
    const msg = response.message;
    if (msg === 'Inicio de sesión correcto') {
      const token = response.token;

      //TODO: HACE ALGO CON EL TOKEN (CREO)
    }else{
      alert("Autorizacion denegada");
    }

  })
  
  
}