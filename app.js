import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();


import {
  cancelParcel,
  createParcel,
  getOneParcel,
  getUserParcels,
  getAllParcels,
  changePresentLocation,
  updateStatus,
  changeCordinate
}
from './server/controller/parcel';

import {
  signup,
  login,
} from './server/controller/user';

import {
  cors,
  oauthToken
} from './server/module/authenticate';

app.use(cors);

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'ui')));

app.set('views', path.join(__dirname, 'ui/pages'));
app.set('view engine', 'ejs');

app.get('/api/v1/oauth', oauthToken);

app.post('/api/v1/parcels', createParcel);
app.get('/api/v1/parcels', getAllParcels);
app.get('/api/v1/parcels/:id', getOneParcel);
app.put('/api/v1/parcels/:id', cancelParcel);

app.get('/api/v1/users/:id/parcels', getUserParcels);

app.post('/api/v1/auth/signup', signup);
app.post('/api/v1/auth/login', login);
app.put('/api/v1/parcels/:id/status', updateStatus);
app.put('/api/v1/parcels/:id/destination', changeCordinate);
app.put('/api/v1/parcels/:id/presentLocation', changePresentLocation);

app.use((req, res) => {
  console.log(req.body)
  res.statusCode = 500;
  const msg = {
    status: 'error',
    message: 'we dont quiit understand your request at this time. Project is WIP',
  };
  res.end(JSON.stringify(msg), null, '\t');
});


app.listen(process.env.PORT);
export default app;