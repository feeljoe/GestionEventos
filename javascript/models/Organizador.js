var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var modeloOrganizador = new Schema({
    id: String,
    areaCoordinacion: String,
    nombre: String,
    apellido: String,
    evento: Evento,
});

var modelo = moongose.model('Organizador', modeloOrganizador);
module.exports = modelo;