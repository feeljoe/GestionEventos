var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var modeloAlumno = new Schema({
    id: String,
    carrera: String,
    nombre: String,
    apellido: String,
    evento: Evento,
});
var modelo = moongose.model('Alumno', modeloAlumno);
module.exports = modelo;