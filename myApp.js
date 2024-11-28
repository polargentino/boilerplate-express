require('dotenv').config(); // Cargar variables de entorno

var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // Importa body-parser

// Middleware de body-parser para analizar datos codificados por URL
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware de body-parser para analizar datos en formato JSON (opcional)
app.use(bodyParser.json());


// Middleware de registro
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next(); // Pasa al siguiente middleware o manejador
  });


// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
  });

  // Montar el middleware para servir recursos estáticos desde /public
app.use('/public', express.static(__dirname + '/public'));


// Nueva ruta que sirve JSON
/*app.get('/json', (req, res) => {
    res.json({ message: "Hello json" });
  });*/


  // Ruta que responde con JSON, ajustada para usar MESSAGE_STYLE
app.get('/json', (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
      message = message.toUpperCase();
    }
    res.json({ message });
  });

// Ruta `/now` con middleware encadenado
app.get('/now', (req, res, next) => {
    req.time = new Date().toString(); // Agrega la hora al objeto de solicitud
    next(); // Pasa al manejador final
  }, (req, res) => {
    res.json({ time: req.time }); // Responde con un objeto JSON
  });


  // Ruta de eco con parámetro de ruta
app.get('/:word/echo', (req, res) => {
    const word = req.params.word; // Captura el parámetro de ruta
    res.json({ echo: word }); // Responde con un objeto JSON
  });


  // Ruta con parámetros de consulta
app.get('/name', (req, res) => {
    const firstName = req.query.first; // Obtiene el valor de 'first' de la consulta
    const lastName = req.query.last;  // Obtiene el valor de 'last' de la consulta
    res.json({ name: `${firstName} ${lastName}` }); // Responde con un objeto JSON
  });


  app.post('/name', (req, res) => {
    const firstName = req.body.first; // Obtiene el campo 'first' del cuerpo
    const lastName = req.body.last;  // Obtiene el campo 'last' del cuerpo
    res.json({ name: `${firstName} ${lastName}` }); // Responde con un objeto JSON
  });
  
  



module.exports = app;



































 module.exports = app;
