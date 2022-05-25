const Alumno = require('../models/Alumno')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.contrasenna, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let alumno = new Alumno({
            _id: req.body.id,
            carrera: req.body.carrera,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            contrasenna: hashedPass
        })
        alumno.save()
        .then(alumno => {
            res.json({
                message: "Alumno guardado con éxito"
            })
        })
        .catch(error=>{
            res.json({
                message: "Hubo un problema al guardar al alumno"
            })
        })
    })
}

const login = (req, res, next) =>{
    var id = req.body._id
    var contrasenna = req.body.contrasenna
    Alumno.findOne({$or: [{_id:id}]})
    .then(alumno => {
        if(alumno){
            bcrypt.compare(contrasenna, alumno.contrasenna, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: alumno.nombre}, 'verySecretValue', {expiresIn:'1h'})
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