const Evento = require("../models/Evento.js");
const Alumno = require("./AlumnoController.js");

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
    } else {
        response.status(201).json({
          status: "success",
          message: `evento creado con éxito`,
          evento,
        });
    }
  });
};

//Obtiene los eventos registrados en la base de datos
/* este lo pensé para que muestre todos los eventos si
   eres un alumno, para poder registrarte a uno que te 
   llame la atención, pero si eres un organizador que
   aparezcan como editables los que sean propios.*/
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
/*Este se me ocurrió para buscar un evento en específico, solo que
  sería enfocado para los organizadores por si estos tienen más de 
  un evento y quieren hacer algo con alguno en específico.*/
const getEvento = (req, res) => {
  Evento.findById(req.params._id, (err, evento) => {
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
  Evento.findByIdAndDelete({ _id: req.params._id }, (err, evento) => {
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
    { _id: req.params._id },
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
/*Este lo pensé para hacer un tipo de comparación 
  al momento de hacer el reporte en el que se muestre
  el total de alumnos registrados frente al total de
  alumnos que asistieron.*/
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

const generarReporte = async (req, res) => {
  const idEvento = req.body.idEvento
  const evento =  await Evento.findOne({_id:idEvento})
  
  let csv_contenido = "ID, NOMBRE, APELLIDO, CARRERA\n"
  for (let i = 0; i < evento.alumnos.length; i++) {
    const id_alumno = evento.alumnos[i];
    const alumno = await Alumno.getAlumnoObject(id_alumno)
    if(!alumno)
      continue
    csv_contenido+=`${alumno.id}, ${alumno.nombre}, ${alumno.apellido}, ${alumno.carrera}\n`
  }

  res.send(csv_contenido);
}

module.exports = {
  guardarEvento,
  getEvento,
  getEventos,
  eliminarEvento,
  actualizarEvento,
  getAlumnosPorEvento,
  generarReporte
};