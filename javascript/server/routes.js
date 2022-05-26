// Este archivo contiene todas las rutas necesarias para obtener, eliminar o introducir informacion de la base de datos al proyecto

// Variables a utilizar
const express = require("express");
const alumno = require("../controllers/AlumnoController");
const organizador = require("../controllers/OrganizadorController");
const evento = require("../controllers/EventoController");
const router = express.Router();
 
//Evento
router.put("/evento", evento.actualizarEvento);
router.get("/evento", evento.getEvento);
router.get("/eventos", evento.getEventos);
router.get("/registrosEvento", evento.getAlumnosPorEvento);
router.delete("/evento", evento.eliminarEvento);
router.post("/evento", evento.guardarEvento);
router.put("/eventoAlumno", evento.addAlumnoAEvento);

//Alumno
router.post('/registroA', alumno.register);
router.post('/loginA', alumno.login);
// router.get('/alumnos', alumno.getAlumnos);
// router.get('/alumno/:_id', alumno.getAlumno);

// //Organizador
// router.post('/organizador/:_id', organizador.actualizarOrganizador);
// router.get('/organizador', organizador.getOrganizadores);
// router.get('/organizador/:_id', organizador.getOrganizador);

module.exports = router;
