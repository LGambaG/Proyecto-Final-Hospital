var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

/* Seleccionar pacientes*/
router.get('/', function (req, res) {
  connection.query('SELECT * FROM pacientes', function (error, results) {
    if (error) {
      console.log("Error en la consulta. ", error)
      res.status(500).send("Error en la consulta. ");
    } else {
      res.render('pacientes', {pacientes: results, opcion: 'disabled', estado: true});
    }
  });
});


// Agregar pacientes

router.get('/agregar-paciente', (req, res) => {
  res.sendFile('registro-pacientes.html', { root: 'public' });
})

router.post('/agregar', (req, res) => {
  const cedula = req.body.cedula;
  const nombre = req.body.nombre_paciente;
  const apellido = req.body.apellido_paciente;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  
  if (cedula )
  connection.query(`INSERT INTO pacientes (cedula, nombre, apellido, edad, telefono) VALUES (${cedula},'${nombre}', '${apellido}', ${edad}, ${telefono})`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})

// Actualizar pacientes

router.get('/activar', function (req, res) {
  connection.query('SELECT * FROM pacientes', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('pacientes', { pacientes: results, opcion: ''});
    }
  });
});

router.post('/actualizar/:cedula', (req, res) => {
  // console.log(req.params)
  const cedula = req.params.cedula;
  const nombre = req.body.nombre_paciente;
  const apellido = req.body.apellido_paciente;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  connection.query(`UPDATE pacientes SET nombre='${nombre}', apellido='${apellido}', edad=${edad}, telefono=${telefono} WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})

// Eliminar pacientes

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  connection.query(`DELETE FROM pacientes WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})


module.exports = router;
