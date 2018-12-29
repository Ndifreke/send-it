import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(bodyParser());
app.use(cors);

const UI_PATH = path.join(__dirname, 'ui');
app.use(express.static(UI_PATH));

import {
  cancelParcel,
  createParcel,
  getOneParcel,
  getUserParcels,
  getAllParcels,
  changePresentLocation,
  updateStatus,
  changeCordinate
} from './server/controller/parcel';

import {
  signup,
  login,
  upate as upateUserData,
  getUserData
} from './server/controller/user';

import {
  cors,
  authToken
} from './server/module/authenticate';

import view from './server/controller/view';

view(app, UI_PATH);

app.get('/api/v1/auth', authToken);
app.get('/api/v1/parcels', getAllParcels);
app.get('/api/v1/parcels/:parcelID', getOneParcel);
app.get('/api/v1/users/:userID/parcels', getUserParcels);
app.get('/api/v1/users/info', getUserData);
app.put('/api/v1/users/update', upateUserData)

app.post('/api/v1/parcels', createParcel);
app.post('/api/v1/auth/signup', signup);
app.post('/api/v1/auth/login', login);

app.put('/api/v1/parcels/:parcelID/cancel', cancelParcel);
app.put('/api/v1/parcels/:parcelID/status', updateStatus);
app.put('/api/v1/parcels/:parcelID/destination', changeCordinate);
app.put('/api/v1/parcels/:parcelID/presentLocation', changePresentLocation);


app.use((req, res) => {
  res.redirect("/");
});

/*
const key = 'AIzaSyCVG4POFIVEKqFALXWDJKSF1o1HPaUI8zk';
const origin = '8.3022297,2.302446';
const dest = '8.3022297,2.302446';
const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${dest}&mode=bicycling&language=fr-FR&key=${key}`;
setTimeout(xmlGet.bind(null, url, 70000));
*/


app.listen(process.env.PORT);
export default app;