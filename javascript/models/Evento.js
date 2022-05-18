var mongoose = require('mongoose');
//La creación del documento dentro de la colleción en mongo
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