const express = require('express');
const cors = require('cors');
const path = require('path');

const router = require('./javascript/server/routes.js');
const {mongoose} = require('./javascript/database/Connection.js');
// const ErrorHandler = require('../errorHandler/errorHandler.js');


const app = express();
app.set('port', 3000);
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/api', router);


// obtiene la ruta del directorio publico donde se encuentran los elementos estaticos (css, js).
var publicPath = path.resolve(__dirname, '../public'); //path.join(__dirname, 'public'); también puede ser una opción

// Para que los archivos estaticos queden disponibles.
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/html/index.html");
});

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto " + 3000);
});

module.exports = app;