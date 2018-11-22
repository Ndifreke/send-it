import jwt from 'jsonwebtoken';

function tokenizer( userId ) {

 const payload = {
  user: userId
 }

 const token = jwt.sign( payload, process.env.SECRET, {
  expiresInMinutes: ( 1440 * 2 )
 } );

 return token;
}

export default tokenizer;