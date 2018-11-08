const { Client } = require('pg');

const usersTableShema = `
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

const parcelsTableShema = `
CREATE TABLE IF NOT EXISTS parcels(
  id SERIAL,
  owner INT REFERENCES users(id) ON DELETE RESTRICT,
  shortname VARCHAR(50) NOT NULL,
  location TEXT DEFAULT 'WAREHOUSE',
  location_lat  TEXT ,
  location_lng  TEXT ,
  destination TEXT NOT NULL,
  destination_Lat  TEXT ,
  destination_lng TEXT ,
  origin TEXT NOT NULL,
  origin_Lat TEXT ,
  origin_lng TEXT ,
  description TEXT,
  distance TEXT DEFAULT '0 m',
  status VARCHAR(20) DEFAULT 'PENDING',
  weight DECIMAL DEFAULT 0,
  created_At DATE DEFAULT current_date,
  delivered_On DATE ,
  price DECIMAL DEFAULT 0
  );
`;

class Database {
  constructor() {
    if (!Database.INITIALIZED) {
      throw new Error(
        `An instance exist already, use static getInstance() to obtain existing instance`
      );
    }
    if (Database.client) {
      this.client = Database.client; 
    } else {
      this.client = new Client(process.env.DATABASE_URL);
      this.client.connect();
      this.migrate();
    }
  }

  query(query) {
    return this.client.query(query);
  }

  static getInstance() {
    Database.INITIALIZED = true;
    return new Database();
  }

  migrate(req, resp) {
    this.query(usersTableShema);
    this.query(parcelsTableShema);
    return {
      status: 'ok',
      message: 'tables created'
    };
  }

  async deleteUserTable(req, resp) {
    const query = 'DROP TABLE users CASCADE';
    try {
      const result = await this.query(query);
      if ('rows' in result) {
        return Promise.resolve({
          status: 'ok',
          message: 'Users table deleted'
        });
      } else {
        return Promise.resolve({
          status: 'error',
          message: 'Users table not affected'
        });
      }
    } catch (e) {
      resp.statusCode = 404;
      return Promise.resolve({
        status: 'error',
        message: 'Users Table does not exist'
      });
    }
  }

  async deleteParcelTable(req, resp) {
    const query = 'DROP TABLE parcels CASCADE';
    try {
      const result = await this.query(query);
      if ('rows' in result) {
        return Promise.resolve({
          status: 'ok',
          message: 'Parcels table deleted'
        });
      } else {
        return Promise.resolve({
          status: 'error',
          message: 'Parcels table not affected'
        });
      }
    } catch (e) {
      resp.statusCode = 404;
      return Promise.resolve({
        status: 'error',
        message: 'Parcels Table does not exist'
      });
    }
  }

  async deleteTables(req, resp) {
    const parcelResponse = await this.deleteParcelTable(req, resp);
    const userResponse = await this.deleteUserTable(req, resp);
    return Promise.resolve({
      status:
        (parcelResponse.status && userResponse.status) === 'ok'
          ? 'ok'
          : 'error',
      message: parcelResponse.message + ', ' + userResponse.message
    });
  }
}

const db = Database.getInstance();
export default db;
