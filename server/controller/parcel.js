/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import util from '../module/utils';
import Parcel from '../module/Parcel';
import User from '../module/User';

//done
async function createParcel( req, res ) {
   console.log(req.body)
  const created = await new Parcel(req.body).create();
  res.json(created);
}

//done
async function getOneParcel( req, res ) {
   // res.setHeader( 'Content-Type', 'text/json' );
   const id = req.params.id;
   if ( util.isInteger( id ) ) {
      const result = await Parcel.fetchById(id);
     res.json(result)
   }
   res.end( '{}');
   // next();
}

//done
async function getAllParcels( req, res ) {
   const result = await Parcel.fetchAllparcel();
   res.json( result);
}
//done
async function getUserParcels( req, res ) {
   res.setHeader( 'Content-Type', 'text/json' );
   const id = req.params.id;
      const result = await Parcel.fetchUserParcels( id );
      res.json(result);
}
//done
async function cancelParcel( req, res ) {
   console.log(User)
   const id = req.params.id;
   /*
      const isAdmin =  await User.is_admin( id );
      if (!isAdmin ) {
         */
        res.statusCode = 201;
         const result = await Parcel.changeStatus( id, Parcel.CANCELLED );
         res.json( result );
}

export {
   getOneParcel,
   cancelParcel,
   getAllParcels,
   getUserParcels,
   createParcel,
};