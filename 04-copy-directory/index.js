const fs = require('fs/promises');
const path = require('path');

const dir = path.join(__dirname, 'files');
const dircopy = path.join(__dirname, 'files-copy');

fs.rm(dircopy, { recursive: true, force: true })
.then(() => fs.mkdir(dircopy, { recursive: true }))
.then(() => fs.readdir(dir, { withFileTypes: true }))
.then((data) => {
  data.forEach((item) => {
    if (item.isFile()) {
      const pathItem = path.join(dir, item.name);
      const pathItemDes = path.join(dircopy, item.name);
      fs.copyFile(pathItem, pathItemDes);
    }
  });
})
.catch((error) => console.log(error));
