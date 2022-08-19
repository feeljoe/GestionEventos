var mongoose = require('mongoose')
//La creación del documento dentro de la colleción en mongo
var Schema = mongoose.Schema;
var modeloAlumno = new Schema({
    id: String,
    carrera: String,
    nombre: String,
    apellido: String,
    contrasenna: String,
    rol:String,
    asistencia: Boolean
});
var modelo = mongoose.model('alumnos', modeloAlumno);
module.exports = modelo;