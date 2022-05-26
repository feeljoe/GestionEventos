// variables a utilizar
var qrcode = require("qrcode");
const Alumno = require('../models/Alumno')
const Evento = require('../models/Evento')
const { default: mongoose } = require('mongoose')

// Funcion para crear el codigo qr
function makeCode (req,res) {      
    var id = req.body.id
    var alumnos = Evento.find(
        {alumnos: {"$in":[id]}});

    console.log(alumnos);

    Alumno.findOne({id:id})
    .then(alu => {
        if(alu) {
            const id = alu._id.toString()
            const registro = id + "," + evento
        }
    })
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