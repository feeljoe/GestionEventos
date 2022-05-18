var qrcode = require("qrcode");

function makeCode () {      
    var id = document.getElementById("id");
    var carrera = document.getElementById("carrera");
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var evento = document.getElementById("evento");
    var registro = id + ", " + carrera + ", " + nombre + ", " + apellido + ", " + evento
    if (!registro.value) {
        registro.focus();
        return;
    }
    
    qrcode.makeCode(registro.value);
}

makeCode();

$("#text").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
        }
    });