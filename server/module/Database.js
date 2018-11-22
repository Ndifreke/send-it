/* eslint-disable no-unused-vars */

const { Client } = require('pg');

const userShema = `
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY, 
  firstname VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  mobile VARCHAR NULL NULL,
  is_admin BOOLEAN NOT NULL
  )  
`;

const parcelShema = `
CREATE TABLE IF NOT EXISTS parcels(
  id SERIAL,
  owner INT REFERENCES users(id) ON DELETE RESTRICT,
  shortname VARCHAR(50) NOT NULL,
  destination TEXT NOT NULL,
  destination_Lat  TEXT ,
  destination_lng TEXT ,
  origin TEXT NOT NULL,
  origin_Lat TEXT ,
  origin_lng TEXT ,
  description TEXT,
  distance NUMERIC NOT NULL,
  status VARCHAR(20) DEFAULT PENDING,
  weight NUMERIC NOT NULL,
  created_At DATE DEFAULT current_date,
  delivered_On DATE ,
  location TEXT DEFAULT 'WAREHOUSE',
  price NUMERIC NOT NULL
  );
`;

class Database {
  
  constructor() {
    if (Database.client) {
      this.client = Database.client;
    } else {
      this.client = new Client(
        process.env.DATABASE_URL || 'tcp://ndifreke:root@localhost:5432/sendit'
      );
      this.client.connect();
      this.client.query(userShema);
      this.client.query(parcelShema);
    }
  }

  query(query) {
    return this.client.query(query);
  }
}

const db = new Database();
// module.exports.db = db;
export default db ;
