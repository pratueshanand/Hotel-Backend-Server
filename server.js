const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require('./db');

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');

app.get('/', function (req, res) {
  res.send('Welcome to our Hotel');
})

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, ()=>{
  console.log('listening to port 3000');
})