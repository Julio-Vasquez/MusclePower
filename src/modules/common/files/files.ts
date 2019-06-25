import { existsSync, unlink } from 'fs';

export class Files {

  public deleteFile(path) {
    if (existsSync(path)) {
      unlink(path, err => {
        console.log(err);
        return false;
      });
      return true;
    }
    return false;
  }

  public prepareFile(array) {
    let result = [];
    for (let item in array) {
      console.log('the item file ' + array[item])
      result.push(array[item].replace('localhost', '.'))
    }
    return result;
  }

  private renameFile(path) {
    return;
  }

  private moveFile() {
    return;
  }
}
