const expres = require('express')
const fileupload = require('express-fileupload');
const rutas = require('./routes/index.js')

const server = expres()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const FileController = require('./routes/FileController.js');
const fileController = new FileController();
const FileController1 = require("./routes/FileController-imagen.js");
const fileController1 = new FileController1();
const path = require('path');

server.use(expres.urlencoded({ extended: true, limit: '100mb' }));
server.use(expres.json({ limit: '100mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(fileupload());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://tablinum-sj.herokuapp.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(expres.static(path.join(__dirname, './build')))

server.use('/api/', rutas),

server.use('/',(req,res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})



server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });


module.exports = server;