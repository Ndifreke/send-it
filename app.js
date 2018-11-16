import {
  cancelParcel,
  createParcel,
  getOneParcel,
  getUserParcel,
  getAllParcels,
}
  from './controller/parcel';


import {
  signup,
  login,
  changeDestination,
  createParcelOrder,
  changeSettings,
  changeStatus,
  changeLocation,
} from './controller/users';

const http = require('http');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const parcel = require('./controller/parcel');


const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);
app.use(express.static(path.join(__dirname, 'template')));
app.use(bodyParser());

/* Parcel Routes  */
app.post('/api/v1/parcels', createParcel);
app.get('/api/v1/parcels', getAllParcels);
app.get('/api/v1/parcels/:id', getOneParcel);
app.put('/api/v1/parcels/:id', cancelParcel);
app.use('/api/v1/users/:id/parcels', getUserParcel);

/*  User Route */
app.post('/api/v1/auth/signup', signup);
app.post('/api/v1/auth/login', login);
app.put('/api/v1/settings', changeSettings);
app.put('/api/v1/parcels/:id/status', changeStatus);
app.put('/api/v1/parcels/:id/destination', changeDestination);
app.put('/api/v1/parcels/:id/presentLocation', changeLocation);

app.use((err, req, res) => {
  res.setHeader('Content-Type', 'text/json');
  const message = err.message;
  res.end(JSON.stringify({
    status: 'error',
  }));
});


app.use((req, res) => {
  res.statusCode = 500;
  const msg = {
    status: 'error',
    message: 'we dont quiit understand your request at this time. Project is WIP',
  };
  res.end(JSON.stringify(msg), null, '\t');
});
http.createServer(app).listen(app.get('port'));
