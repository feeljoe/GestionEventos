var mongoose = require('mongoose');
//La creación del documento dentro de la colleción en mongo
var Schema = mongoose.Schema;
var modeloEvento = new Schema({
    titulo: String,
    fecha: Date,
    lugar: String,
    descripcion: String,
    alumnos: [{type: Schema.Types.ObjectId, ref: 'alumnos'}],
    organizador: Array
});

var modelo = mongoose.model('eventos', modeloEvento);
module.exports = modelo;