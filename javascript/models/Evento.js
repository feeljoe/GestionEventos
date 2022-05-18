var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modeloEvento = new Schema({
    id: String,
    titulo: String,
    fecha: Date,
    lugar: String,
    descripcion: String
});

var modelo = moongose.model('Evento', modeloEvento);
module.exports = modelo;