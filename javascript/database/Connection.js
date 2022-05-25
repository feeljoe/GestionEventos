//Aquí se conecta a la base de datos en mongoDB
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/Eventos';

mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() => {console.log("conexion exitosa")})
.catch(err => {console.log(err)});

module.exports = {mongoose};
