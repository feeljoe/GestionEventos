const Evento = require("../models/Evento.js");
const { getAlumno } = require("./AlumnoController.js");

const guardarEvento = (request, response) => {
  const evento = new Evento({
    ...request.body,
  });

  evento.save((err) => {
    if (err) {
      response.status(400).json({
        status: "error",
        message: `error al crear el evento: ${err}`,
        error: err,
      });
    } else
      response.status(201).json({
        status: "success",
        message: `evento creado con éxito`,
        evento,
      });
  });
};

const getEventos = (req, res) => {
  Evento.find((err, evento) => {
    if (err) {
      res.status(400).json({
        status: "error",
        message: `Error al obtener los eventos: ${err}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: evento,
      });
    }
  });
};

const getEvento = (req, res) => {
  Evento.findById(req.params.id, (err, evento) => {
    if (err) {
      res.status(400).json({
        status: "error",
        message: `Error al obtener el evento: ${err}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: evento,
      });
    }
  });
};

const eliminarEvento = (req, res) => {
  Evento.findByIdAndDelete({ _id: req.params.id }, (err, evento) => {
    if (err) {
      res.status(400).json({
        status: "error",
        message: `Error al eliminar el evento: ${err}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: evento,
      });
    }
  });
};

const actualizarEvento = (req, res) => {
  Evento.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, evento) => {
      if (err) {
        res.status(400).json({
          status: "error",
          message: `Error al actualizar el evento: ${err}`,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: evento,
        });
      }
    }
  );
};

const getAlumnosPorEvento = (req, res) => {
  Evento.findById(req.params.id, (err, evento) => {
    let alumnos = [];
    console.log(evento);
    for (i = 0; i < evento.alumnos.length; i++) {
      alumnos.push(getAlumno(evento.alumnos[i].toString()));
      console.log(typeofevento.alumnos[i].toString());
      console.log(alumnos);
    }

    if (err) {
      res.status(400).json({
        status: "error",
        message: `Error al obtener los alumnos del evento: ${err}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: alumnos,
      });
    }
  });
};

module.exports = {
  guardarEvento,
  getEvento,
  getEventos,
  eliminarEvento,
  actualizarEvento,
  getAlumnosPorEvento
};