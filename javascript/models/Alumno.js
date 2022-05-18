var mongoose = require('mongoose');
//La creación del documento dentro de la colleción en mongo
var Schema = mongoose.Schema;
var modeloAlumno = new Schema({
    id: String,
    carrera: String,
    nombre: String,
    apellido: String,
    evento: Evento,
    asistencia: Boolean
});
var modelo = moongose.model('Alumno', modeloAlumno);
module.exports = modelo;