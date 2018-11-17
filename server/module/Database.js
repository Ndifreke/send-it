/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import { fileSystem } from './FileSystem';

import { parcelPath } from './Parcel';

import { userPath } from './User';

class DB {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  // write parcel file to flat databasee
  writeToDb(data, path) {
    if (typeof data === 'object') {
      data = JSON.stringify(data, null, '\t');
    }
    fileSystem.writeFile(path, data);
  }

  initDb(path) {
     console.log(userPath)
    let dbTemplate;
    /* dertermine which db to initialize base on the caller */
    if (path === parcelPath) {
      dbTemplate = {
        lastId: 0,
        parcelList: {},
      };
    } else if (path === userPath) {
      dbTemplate = {
        lastId: 0,
        userList: {},
      };
    }
    fileSystem.writeFile(path, JSON.stringify(dbTemplate));
  }

  // read percel from flat databse
  readDb(path) {
    try {
      return JSON.parse(fileSystem.readFile(path));
    } catch (exception) {
      // db may not be a valid json create one and return it;
      this.initDb(path);
      return JSON.parse(fileSystem.readFile(path));
    }
  }
}
const db = new DB();
export { db };
