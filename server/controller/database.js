import Database from '..//module/Database';

function createUserTable(req, resp) {

}

function createParcelTable(req, resp) {

}

async function dropUserTable(req, resp) {
 const db = new Database();
 const reply = await db.dropUsers(req,resp);
 resp.json(reply);
}

function dropParcelTable(req, resp) {

}

function createTables(req, resp) {
 resp.json(new Database().createTables(req,resp));
}
const db = {
 dropParcelTable,
 createParcelTable,
 createUserTable,
 dropUserTable,
 createTables
}
export default db;