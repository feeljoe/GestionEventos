var mongoose = require('mongoose')
//La creación del documento dentro de la colleción en mongo
var Schema = mongoose.Schema;
var modeloAlumno = new Schema({
    _id: String,
    carrera: String,
    nombre: String,
    apellido: String,
    contrasenna: String,
    asistencia: Boolean
});
var modelo = mongoose.model('alumno', modeloAlumno);
module.exports = modelo;