const express = require('express');

const alumno = require('../controllers/AlumnoController.js');
const organizador = require('../controllers/OrganizadorController.js');
const evento = require('../controllers/EventoController.js')

const router = express.Router();

//Evento
router.put('/evento', evento.guardarEvento);
router.get('/evento/:id', evento.getEvento);
router.get('/eventos', evento.getEventos);
router.get('/registrosEvento/:id', evento.getAlumnosPorEvento);
router.delete('/evento/:id', evento.eliminarEvento);
router.post('/evento/:id', evento.actualizarEvento);

//Alumno
router.post('/alumno/:_id', alumno.actualizarAlumno);
router.get('/alumnos', alumno.getAlumnos);
router.get('/alumno/:_id', alumno.getAlumno);

//Organizador
router.post('/organizador/:_id', organizador.actualizarOrganizador);
router.get('/organizador', organizador.getOrganizadores);
router.get('/organizador/:_id', organizador.getOrganizador);


module.exports = router;