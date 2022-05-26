// Variables a utilizar
const Evento = require("../models/Evento.js");
const { getAlumno } = require("./AlumnoController.js");

//Guarda un evento nuevo en la base de datos
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

//Obtiene los eventos registrados en la base de datos
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

//Obtiene el evento registrado dependiendo del id que se ingrese
const getEvento = (req, res) => {
  Evento.findById(req.body._id, (err, evento) => {
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

//Elimina el evento de la base de datos
const eliminarEvento = (req, res) => {
  Evento.findByIdAndDelete({ _id: req.body._id }, (err, evento) => {
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

//Actualiza el evento en la base de datos, ya sea cambio de nombre, lugar, fecha, etc 
const actualizarEvento = (req, res) => {
  Evento.findByIdAndUpdate(
    { _id: req.body._id },
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

//Obtiene los alumnos registrados en el evento
const getAlumnosPorEvento = (req, res) => {
  const idEvento = req.body.idEvento;
  
  Evento.findById(idEvento, (err, evento) => {
      if (err) {
      res.status(400).json({
        status: "error",
        message: `Error al obtener los alumnos: ${err}`,
      });
    }
 
    res.status(200).json({alumnosRegistrados:evento.alumnos});
  }).populate("alumnos");
};

const addAlumnoAEvento = (req, res) =>{
  const idEvento = req.body.idEvento;
  const idAlumno = req.body.idAlumno;

    Evento.updateOne({_id:idEvento},{$addToSet:{alumnos:idAlumno}},(err, evento)=>{
      if(err){
        res.status(400).json({message: `Error al agregar el alumno al evento: ${err}`});
      }
      res.status(200).json({message: `Alumno agregado al evento con éxito`});
    });
}; 

module.exports = {
  guardarEvento,
  getEvento,
  getEventos,
  eliminarEvento,
  actualizarEvento,
  getAlumnosPorEvento,
  addAlumnoAEvento
};