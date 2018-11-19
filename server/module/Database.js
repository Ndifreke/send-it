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
    Database.connectionString = 'postgres://wwzadobbosojdc:3f63098901d24c14455fd61e5ee46305872a12aa8e1fc55c518ba71ce427767a@ec2-54-235-193-0.compute-1.amazonaws.com:5432/d5j9tbmmtor4f1'
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