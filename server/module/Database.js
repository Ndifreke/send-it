/* eslint-disable no-unused-vars */

const { Client } = require('pg');

const userShema = `
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY, 
  first_name VARCHAR(50) NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  mobile_number VARCHAR NULL NULL,
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
  status INT DEFAULT 1,
  weight NUMERIC NOT NULL,
  created_At DATE DEFAULT current_date,
  delivered_On DATE ,
  location TEXT DEFAULT 'WAREHOUSE',
  price NUMERIC NOT NULL
  );
`;

class Database {
  constructor() {
    Database.connectionString = process.env.DATABASE_URL
      || 'tcp://ndifreke:root@localhost:5432/sendit';
    if (Database.client) {
      this.client = Database.client;
    } else {
      this.client = new Client(Database.connectionString);
      this.client.connect();
      this.client.query(userShema);
      this.client.query(parcelShema);
    }
  }

  query(query) {
    return this.client.query(query);
  }
}

module.exports.db = new Database();