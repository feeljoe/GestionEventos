const sesion = JSON.parse(localStorage.getItem('sesion'));
async function cargarEventos() {
    const eventos = await fetchEventos();
    const lista = document.getElementById('lista');
    eventos.data.forEach(evento => {
        lista.innerHTML += `
    <div class="evento">
        <div class="info">
          <h2 class="info1" style="font-weight: bold;">${evento.titulo}</h2>
          <h3 class="info1">Fecha: ${formatDate(new Date(evento.fecha))}</h3>
          <h3 class="info1">Ubicación: ${evento.lugar}</h3>
          <p class="info1">Descripción: ${evento.descripcion}</p>
        </div>
        <div class="botones">
          <button onclick='UnirseEvento("${evento._id}");' class="btnUnirse">Unirse a evento</button>
          <a style="padding-left: 10%; margin-bottom: 5%;" tabindex="0" role="button" class="btn btn-success" data-toggle="popover" data-trigger="focus"
          data-placement="bottom" title="QR Code" data-url="${sesion._id}">Popover QR Code</a>
          <div id="qrcode" style="width:auto; height:auto;padding:15px;"></div>
        </div>        
      </div>      
    `
    })

}
function generarQr(){
    var qrcode = new QRCode(document.getElementById("qrcode"),
      {
        width: 120,
        height: 120
      }
    );
    function makeQrcode(e) {
      qrcode.makeCode(e.attr("data-url"));
    }
    jQuery(document).ready(function () {
      jQuery("[data-toggle='popover']").popover(
        options = {
          content: jQuery("#qrcode"),
          html: true // important! popover html content (tag: "#qrcode") which contains an image
        }
      );

      jQuery("[data-toggle='popover']").on("show.bs.popover", function (e) {
        makeQrcode(jQuery(this));
        jQuery("#qrcode").show();
      });
    });
}

function formatDate(Date) {
    const date = Date;
    const year = date.getFullYear();
    const month = getMonthOfYear(date.getMonth());
    const day = date.getDate();
    const dayName = getDayOfWeek(date.getDay());
    const fecha = dayName + ", " + day + " de " + month + " del " + year
    return fecha;
}
function getMonthOfYear(month) {

    var mes = ""

    switch (month) {
        case 0: mes = "enero";
            break;
        case 1: mes = "febrero"
            break;
        case 2: mes = "marzo"
            break;
        case 3: mes = "abril"
            break;
        case 4: mes = "mayo"
            break;
        case 5: mes = "junio"
            break;
        case 6: mes = "julio"
            break;
        case 7: mes = "agosto"
            break;
        case 8: mes = "septiembre"
            break;
        case 9: mes = "octubre"
            break;
        case 10: mes = "noviembre"
            break;
        case 11: mes = "diciembre"
            break;
        default: mes = "No se encontró el mes"
            break;
    }
    return mes;
}
function getDayOfWeek(day) {
    var dia = ""
    switch (day) {
        case 1: dia = "Lunes"
            break;
        case 2: dia = "Martes"
            break;
        case 3: dia = "Miércoles"
            break;
        case 4: dia = "Jueves"
            break;
        case 5: dia = "Viernes"
            break;
        case 6: dia = "Sábado"
            break;
        case 7: dia = "Domingo"
            break;
        default: dia = "No se encontró el día"
            break;
    }
    return dia;
}
async function UnirseEvento(id) {
    const result = await fetchAddEventoAlumno(id);
    console.log(result);
    generarQr();
    // location.reload();
}

async function fetchAddEventoAlumno(id) {
    const data = {
        idEvento: id,
        idAlumno: sesion._id
    }
    const response = await fetch('http://localhost:3000/api/eventoAlumno', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json();
}

async function fetchEventos() {
    const url = 'http://localhost:3000/api/eventos';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}