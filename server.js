const express = require('express');
const app = express();

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require('./db');
const Passport = require('./auth');

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleDateString()}] Request Made to: ${req.originalUrl}`)
  next();
}

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');

app.use(logRequest);

app.use(Passport.initialize());
const localAuthorization = Passport.authenticate('local', {session: false});

app.get('/', function (req, res) {
  res.send('Welcome to our Hotel');
})

app.use('/person', localAuthorization, personRoutes);
app.use('/menu', menuRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
  console.log('listening to port 3000');
})