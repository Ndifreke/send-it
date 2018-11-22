// const user = require( "../library/User" ).User;
import util from '../module/utils';
import User from '../module/User';

async function signup( req, res ) {
  const created = await new User( req.body ).create(res);
  res.json( created );
}

/* Log a user in using his email and password */
async function login( req, res ) {
  const logins = Object.assign({},req.body);
  const id = await User.authLogin(logins.email, logins.password,res);
  res.json(id);
}

function changeSettings( req, res ) {
}

export {
  signup,
  login,
  changeSettings,
};