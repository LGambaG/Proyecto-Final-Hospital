// Configuración de la base de datos
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'hospital'
});

// Conexión a la base de datos
connection.connect(function(error){
  if (error){
      console.log('Ocurrio un error al conectar con la base de datos.');
      return;
      // return: devuelve un valor vacio para que no se quede cargando
  } else {
      console.log('¡Conexión exitosa!')
  }
})

// Ahora se exporta la connection a todos los modulos donde se necesite la info de la bd
module.exports= {connection}
