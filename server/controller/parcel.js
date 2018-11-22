/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import util from '../module/utils';
import Parcel from '../module/Parcel';
import User from '../module/User';
import view from '../module/views';

//done
async function createParcel( req, res ) {
  const created = await new Parcel(req.body).create(res);
  res.json(created);
}

//done
async function getOneParcel( req, res ) {
   // res.setHeader( 'Content-Type', 'text/json' );
   const id = req.params.id;
      const result = await Parcel.fetchById(id,res);
     res.json(result)
   }

//done
async function getAllParcels( req, res ) {
   const result = await Parcel.fetchAllparcel(res);
   res.json( result);
}
//done
async function getUserParcels( req, res ) {
   res.setHeader( 'Content-Type', 'text/json' );
   const id = req.params.id;
      const result = await Parcel.fetchUserParcels( id,res );
      res.json(result);
}
//done
async function cancelParcel( req, res ) {
   const id = req.params.id;
        res.statusCode = 201;
         const result = await Parcel.changeStatus( id, Parcel.CANCELLED ,res);
         res.json( result );
}
//done
async function changeCordinate( req, res ) {
   const id = req.params.id;
   const {lat,lng} = req.body;
   const confirm = await Parcel.changeCords(req.params.id, {lat, lng},res);
   res.json(confirm);
}
//done
async function changePresentLocation(req,res){
   const changed = await Parcel.changeLocation(req.params.id, req.body.presentLocation,res)
   res.json(changed);
}

//done
async function updateStatus(req, resp){
   const result = await Parcel.changeStatus(req.params.id, req.body.status,resp);
   resp.json(result);
}

export {
   changePresentLocation,
   changeCordinate,
   getOneParcel,
   cancelParcel,
   getAllParcels,
   getUserParcels,
   updateStatus, 
   createParcel,
};