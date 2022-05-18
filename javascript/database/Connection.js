//Aquí se conecta a la base de datos en mongoDB
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://feel_joe:<StdP3875>@cluster0.uhfd5.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection Error: '));