var mongoose = require('mongoose');
//La creación del documento dentro de la colleción en mongo
var Schema = mongoose.Schema;
var modeloEvento = new Schema({
    _id: String,
    titulo: String,
    fecha: Date,
    lugar: String,
    descripcion: String
    
});

var modelo = mongoose.model('eventos', modeloEvento);
module.exports = modelo;