/* eslint-disable no-unused-vars */

const { Client } = require('pg');


class Database {
  constructor() {
    Database.connectionString = process.env.DATABASE_URL
   || 'tcp://ndifreke:root@localhost:5432/sendit';
    if (Database.client) {
      this.client = Database.client;
    } else {
      this.client = new Client(Database.connectionString);
      this.client.connect();
    }
  }
}

new Database();