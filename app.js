import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import db from './server/module/Database';

import view from './server/module/views';
<<<<<<< Updated upstream
=======
import {
  authenticateRoute
} from './server/module/authenticate';
>>>>>>> Stashed changes


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
  changeSettings,
} from './server/controller/user';


const app = express();

app.set( 'views', path.join( __dirname, 'ui/pages' ) );
app.set( 'view engine', 'ejs' );
app.use( express.static( path.join( __dirname, 'ui' ) ) );
app.use( bodyParser() );

<<<<<<< Updated upstream
app.post('/api/v1/parcels', createParcel);
app.get('/api/v1/parcels', getAllParcels);
app.get('/api/v1/parcels/:id', getOneParcel);
app.put('/api/v1/parcels/:id', cancelParcel);
app.use('/api/v1/users/:id/parcels', getUserParcels);
=======
app.post( '/api/v1/parcels', createParcel );
app.get( '/api/v1/parcels', getAllParcels );
app.get( '/api/v1/parcels/:id', getOneParcel );
app.put( '/api/v1/parcels/:id', cancelParcel );
app.use( '/api/v1/users/:id/parcels', getUserParcels );
>>>>>>> Stashed changes

app.get( '/', view.renderHome );

<<<<<<< Updated upstream
app.post('/api/v1/auth/signup', signup);
app.post('/api/v1/auth/login', login);
app.put('/api/v1/settings', changeSettings);
app.put('/api/v1/parcels/:id/status', updateStatus);
app.put('/api/v1/parcels/:id/destination', changeCordinate);
app.put('/api/v1/parcels/:id/presentLocation', changePresentLocation);
=======
app.post( '/api/v1/auth/signup', signup );
app.post( '/api/v1/auth/login', login );
app.put( '/api/v1/parcels/:id/status', updateStatus );
app.put( '/api/v1/parcels/:id/destination', changeCordinate );
app.put( '/api/v1/parcels/:id/presentLocation', changePresentLocation );
>>>>>>> Stashed changes

app.use( ( req, res ) => {
  console.log( req.url )
  res.statusCode = 500;
  const msg = {
    status: 'error',
    message: 'we dont quiit understand your request at this time. Project is WIP',
  };
  res.end( JSON.stringify( msg ), null, '\t' );
} );


<<<<<<< Updated upstream
app.listen(process.env.PORT);
=======
app.listen( process.env.PORT );

export default app;
>>>>>>> Stashed changes
