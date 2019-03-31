import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

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
  changeCordinate,
  updateParcel
} from './controller/parcel';

import dbController from "./controller/database";

import {
  signup,
  login,
  upate as upateUserData,
  getUserData
} from './controller/user';

import {
  cors,
  authToken
} from './module/authenticate';

import view from './controller/view';

view(app, UI_PATH);

app.get('/api/v1/auth', authToken);
app.get('/api/v1/parcels', getAllParcels);
app.get('/api/v1/parcels/:parcelID', getOneParcel);
app.get('/api/v1/users/:userID/parcels', getUserParcels);
app.get('/api/v1/users/data', getUserData);
app.put('/api/v1/users/update', upateUserData)
app.put('/api/v1/users/update/userID', upateUserData)

app.post('/api/v1/parcels', createParcel);
app.post('/api/v1/auth/signup', signup);
app.post('/api/v1/auth/login', login);
app.post('/api/v1/tables/create', dbController.createTables);

app.put('/api/v1/parcels/:parcelID/cancel', cancelParcel);
app.put('/api/v1/parcels/:parcelID/update', updateParcel);
app.put('/api/v1/parcels/:parcelID/status', updateStatus);
app.put('/api/v1/parcels/:parcelID/destination', changeCordinate);
app.put('/api/v1/parcels/:parcelID/presentLocation', changePresentLocation);

app.delete("/api/v1/table/users", dbController.dropUserTable );
app.delete("/api/v1/table/parcels", dbController.dropParcelTable );
app.delete("/api/v1/tables", dbController.dropTables );

/*
app.delete("/api/v1/user/userId", deleteUser)
app.delete("/api/v1/parcels/parcelId", deleteParcel);

app.delete("/api/v1/tables/drop", dropTables )
*/



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
console.log("Listening on Port", process.env.PORT)
export default app;
