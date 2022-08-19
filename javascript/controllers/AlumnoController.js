// Variables a utilizar
const Alumno = require('../models/Alumno')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

// Metodo para registrar un nuevo alumno en un evento
const register = (req, res, next) => {
    bcrypt.hash(req.body.contrasenna, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let alumno = new Alumno({
            _id: req.body._id,
            carrera: req.body.carrera,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            contrasenna: hashedPass,
            asistencia: req.body.asistencia
        })
        alumno.save(((err) => {
            if (err) {
              res.status(400).json({
                status: "error",
                message: `error al crear el alumno: ${err}`,
                error: err,
              });
            } else
              res.status(201).json({
                status: "success",
                message: `alumno creado con éxito`,
              });
          }));
    })
}

// Metodo para iniciar sesión
const login = async (req, res, next) =>{
    console.log(req.body);

    var id = req.body.id
    var contrasenna = req.body.contrasenna

    Alumno.findOne({id:id})
    .then(alu => {
        console.log(alu)
        if(alu){
            bcrypt.compare(contrasenna, alu.contrasenna, function(err, result){
                if(err){
                    console.log(ERROR);
                    res.status(400).json({
                        error: err
                    });
                }
                if(result){
                    console.log("RESULT TRUE");

                    let token = jwt.sign({name: alu.nombre}, 'verySecretValue', {expiresIn:'1h'})
                    res.status(200).json({
                        message: 'Inicio de sesión correcto',
                        token,
                        sesion:alu
                    });
                }else{
                    console.log("RESULT FALSE");

                    res.status(404).json({
                        message: 'la contraseña no es correcta'
                    });
                }
            })
        }else{
            res.status(404).json({
                message: 'No se pudo encontrar al alumno'
            })
        }
    })
}
module.exports ={
    register,
    login
}