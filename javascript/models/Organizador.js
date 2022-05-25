var mongoose = require('mongoose');
//La creación del documento dentro de la colleción en mongo
var Schema = mongoose.Schema;
var modeloOrganizador = new Schema({
    _id: String,
    areaCoordinacion: String,
    nombre: String,
    apellido: String,
    contrasenna: String,
    evento: Evento,
});

var modelo = moongose.model('Organizador', modeloOrganizador);
module.exports = modelo;