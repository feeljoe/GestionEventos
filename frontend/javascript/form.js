// This script requires jQuery and jquery-form plugin
// You can use these ones from Cloudflare CDN:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js" integrity="sha256-2Pjr1OlpZMY6qesJM68t2v39t+lMLvxwpa8QlRjJroA=" crossorigin="anonymous"></script>
//

function crearEvento(){
  var titulo = document.getElementById("titulo").value
  var descripcion = document.getElementById("descripcion").value
  var lugar = document.getElementById("ubicacion").value
  var fecha1 = document.getElementById("fecha").value
  var tiempo = document.getElementById("tiempo").value
  var fecha= new Date(`${fecha1} ${tiempo}`)
  var sesion = window.localStorage.getItem('sesion');
  var body = {titulo, fecha, lugar, descripcion, sesion}
  if(body!=null){
    let jsonbody = JSON.stringify(body)
    console.log(jsonbody)

    fetch('/api/evento', {
      method: 'POST', // or 'PUT'
      body: jsonbody, // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        const msg = response.message;
        if (msg === 'evento creado con éxito') {
          
          window.location.href = '/html/index.html';

          alert("evento creado con exito.")
        }else{
          alert("no se pudo crear el evento, revise los campos.")
        }
    })
  }
}
  
// $("#bootstrapForm").submit(function (event) {
//   event.preventDefault();
//   var extraData = {};
//   $("#bootstrapForm").ajaxSubmit({
//     data: extraData,
//     dataType: "jsonp", // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
//     error: function () {
//       // Submit of form should be successful but JSONP callback will fail because Google Forms
//       // does not support it, so this is handled as a failure.
//       alert("Form Submitted. Thanks.");
//       // You can also redirect the user to a custom thank-you page:
//       // window.location = 'http://www.mydomain.com/thankyoupage.html'
//     },
//   });
// });
