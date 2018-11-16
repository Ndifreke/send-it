/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */

import { writeFileSync, unlinkSync, readFileSync } from 'fs';


class FileSystem {
  writeFile(path, data) {
    writeFileSync(path, data);
  }

  readFile(path) {
    return readFileSync(path);
  }

  remove(path) {
    try {
      unlinkSync(path);
    } catch (e) {
      throw Error(`Could not read ${path} `);
    }
  }
}
const fileSystem = new FileSystem();
export { fileSystem };
