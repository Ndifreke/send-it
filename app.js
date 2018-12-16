import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(bodyParser());
app.use(cors);

const UIPath = path.join(__dirname, 'ui');
app.use(express.static(UIPath));
app.use(express.static(UIPath + '/pages'));

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
} from './server/controller/user';

import {
  cors,
  oauthToken
} from './server/module/authenticate';

import view from './server/controller/view';

view(app);


app.get('/api/v1/oauth', oauthToken);
app.get('/api/v1/parcels', getAllParcels);
app.get('/api/v1/parcels/:id', getOneParcel);
app.get('/api/v1/users/:id/parcels', getUserParcels);

app.post('/api/v1/parcels', createParcel);
app.post('/api/v1/auth/signup', signup);
app.post('/api/v1/auth/login', login);

app.put('/api/v1/parcels/:id', cancelParcel);
app.put('/api/v1/parcels/:id/status', updateStatus);
app.put('/api/v1/parcels/:id/destination', changeCordinate);
app.put('/api/v1/parcels/:id/presentLocation', changePresentLocation);

app.use((req, res) => {
  res.statusCode = 308;
  res.setHeader('location', "/")
  const msg = {
    status: 'ok',
    message: 'Redirect',
  };
  res.end(JSON.stringify(msg), null, '\t');
});


app.listen(process.env.PORT);
export default app;