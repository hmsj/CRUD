const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const uriDB = process.env.URI_DB; //process.env.USER_DB + process.env.PASS_DB + process.env.HOST_DB;

const app = express();


// Connecting to DB
mongoose.connect(uriDB, {useNewUrlParser: true})
    .then(db => console.log('DB connected'))
    .catch(error => console.log('Not connected ' + error));

// Importing routes
const index = require('./server/routes/index.route');
const pruebas = require('./server/routes/pruebas.route');
const grupos = require('./server/routes/grupos.route');
const users = require('./server/routes/users.route');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Routes
app.use('/', index);
app.use('/api/pruebas', pruebas);
app.use('/api/grupos', grupos);
app.use('/api/users', users);

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});