

const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');

const PORT = process.env.PORT || 4000
const MYSQLHOST = process.env.MYSQLHOST || 'localhost'
const MYSQLUSER = process.env.MYSQLUSER || 'root'
const MYSQLPASSWORD = process.env.MYSQLPASSWORD || ''
const MYSQLPORT = process.env.MYSQLPORT || '3306'
const DATABASE = process.env.MYSQLDATABASE || 'pacientesdb'
const app = express();
app.set('port',PORT);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
  MYSQLHOST: MYSQLHOST,
  MYSQLUSER: MYSQLUSER,
  MYSQLPASSWORD: MYSQLPASSWORD,
  MYSQLPORT: MYSQLPORT,
  MYSQLDATABASE: MYSQLDATABASE
},));

app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});

app.use('/', tasksRoutes);

app.get('/', (req, res) => {
  res.render('home');
});