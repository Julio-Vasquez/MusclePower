import { existsSync, unlink } from 'fs';

export class Files {

  public deleteFile(path) {
    for (let item in path) {
      if (existsSync(path[item])) {
          unlink(path[item], err => {
          console.log(err+'-->');
          return false;
        });
      }
    }
    return true;
  }

  public prepareFile(array) {
    let result = [];
    for (let item in array) {
      console.log('the item file ' + array[item])
      result.push(array[item].replace('localhost', '.'))
    }
    return result;
  }

  private renameFile(array) {
    return;
  }

  private moveFile(array) {
    return;
  }
}
