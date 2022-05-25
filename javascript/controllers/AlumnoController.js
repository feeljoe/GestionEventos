const Alumno = require('../models/Alumno')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

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
                message: `error al crear el evento: ${err}`,
                error: err,
              });
            } else
              res.status(201).json({
                status: "success",
                message: `evento creado con éxito`,
              });
          }));
    })
}

const login = (req, res, next) =>{
    console.log(req.body);

    var id = req.body.id
    var contrasenna = req.body.contrasenna
    Alumno.findOne({id:id})
    .then(alu => {
        console.log(alu)
        if(alu){
            bcrypt.compare(contrasenna, alu.contrasenna, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: alu.nombre}, 'verySecretValue', {expiresIn:'1h'})
                    res.json({
                        message: 'Inicio de sesión correcto',
                        token
                    })
                }else{
                    res.json({
                        message: 'la contraseña no es corecta'
                    })
                }
            })
        }else{
            res.json({
                message: 'No se pudo encontrar al alumno'
            })
        }
    })
}
module.exports ={
    register,
    login
}