var mongoose = require('mongoose');
//La creación del documento dentro de la colleción en mongo
var Schema = mongoose.Schema;
var modeloOrganizador = new Schema({
    id: String,
    areaCoordinacion: String,
    nombre: String,
    apellido: String,
    contrasenna: String
});

var modelo = mongoose.model('organizadores', modeloOrganizador);
module.exports = modelo;