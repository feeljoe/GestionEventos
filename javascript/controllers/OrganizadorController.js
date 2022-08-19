// variables a utilizar
const Organizador = require('../models/Organizador')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

// metodo para registrar a un organizador
const register = (req, res, next) => {
    bcrypt.hash(req.body.contrasenna, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let organizador = new Organizador({
            id : req.body.id,
            areaCoordinacion: req.body.areaCoordinacion,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            contrasenna: hashedPass,
        })
        organizador.save(((err) => {
            if (err) {
              res.status(400).json({
                status: "error",
                message: `error al crear al organizador: ${err}`,
                error: err,
              });
            } else
              res.status(201).json({
                status: "success",
                message: `organizador creado con éxito`,
              });
          }));
    })
}

// metodo para loguearse
const login = async (req, res, next) =>{
    console.log(req.body);

    var id = req.body.id
    var contrasenna = req.body.contrasenna

    Organizador.findOne({id:id})
    .then(orga => {
        console.log(orga)
        if(orga){
            bcrypt.compare(contrasenna, orga.contrasenna, function(err, result){
                if(err){
                    console.log(ERROR);
                    res.status(400).json({
                        error: err
                    });
                }
                console.log(result)
                if(result){
                    console.log("RESULT TRUE");

                    let token = jwt.sign({name: orga.nombre}, 'verySecretValue', {expiresIn:'1h'})
                    res.status(200).json({
                        message: 'Inicio de sesión correcto',
                        token
                    });
                }else{
                    console.log("RESULT FALSE");

                    res.status(404).json({
                        message: 'la contraseña no es corecta'
                    });
                }
            })
        }else{
            res.status(404).json({
                message: 'No se pudo encontrar al organizador'
            })
        }
    })
}
module.exports ={
    register,
    login
}