import db from '../module/Database';

function createUserTable(req, resp) {

}

function createParcelTable(req, resp) {

}

async function dropUserTable(req, resp) {
 const reply = await db.deleteUserTable(req,resp);
 resp.json(reply);
}

async function dropParcelTable(req, resp) {
const result = await db.deleteParcelTable(req,resp);
resp.json(result);
}

function createTables(req, resp) {
 resp.json(db.migrate(req,resp));
}

async function dropTables(req,resp){
 const result = await db.deleteTables(req,resp);
 resp.json(result);


}

const dbController = {
 dropParcelTable,
 createParcelTable,
 createUserTable,
 dropUserTable,
 createTables,
 dropTables,
}
export default dbController;

