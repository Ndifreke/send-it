'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-unused-vars */

var _require = require('pg'),
    Client = _require.Client;

var usersTableShema = '\nCREATE TABLE IF NOT EXISTS users(\n  id SERIAL PRIMARY KEY, \n  firstname VARCHAR(50) NOT NULL,\n  surname VARCHAR(50) NOT NULL,\n  email text NOT NULL,\n  password text NOT NULL,\n  mobile VARCHAR NULL NULL,\n  is_admin BOOLEAN NOT NULL\n  )  \n';

var parcelsTableShema = '\nCREATE TABLE IF NOT EXISTS parcels(\n  id SERIAL,\n  owner INT REFERENCES users(id) ON DELETE RESTRICT,\n  shortname VARCHAR(50) NOT NULL,\n  destination TEXT NOT NULL,\n  destination_Lat  TEXT ,\n  destination_lng TEXT ,\n  origin TEXT NOT NULL,\n  origin_Lat TEXT ,\n  origin_lng TEXT ,\n  description TEXT,\n  distance NUMERIC NOT NULL,\n  status VARCHAR(20) DEFAULT \'PENDING\',\n  weight NUMERIC NOT NULL,\n  created_At DATE DEFAULT current_date,\n  delivered_On DATE ,\n  location TEXT DEFAULT \'WAREHOUSE\',\n  price NUMERIC NOT NULL\n  );\n';

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);

    if (Database.client) {
      this.client = Database.client;
    } else {
      this.client = new Client(process.env.DATABASE_URL || process.env.DATABASE_URL_DEV);
      this.client.connect();
      this.client.query(usersTableShema);
      this.client.query(parcelsTableShema);
    }
  }

  _createClass(Database, [{
    key: 'query',
    value: function query(_query) {
      return this.client.query(_query);
    }
  }]);

  return Database;
}();

var db = new Database();
exports.default = db;