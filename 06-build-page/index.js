const path = require('path');
const fs = require('fs')

const pathStyles = path.join(__dirname, 'styles');
const pathCopy = path.join(__dirname, 'project-dist');
const pathAssetsCopy = path.join(pathCopy, 'assets');
const folderPath = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');


fs.promises.rm(pathCopy, { recursive: true, force: true })
  .then(() => fs.mkdir(pathAssetsCopy, { recursive: true }))
  .then(() => fs.readdir(pathAssets, { withFileTypes: true }))
  .then((data) => {
    data.forEach((item) => {
      if (item.isFile()) {
        const pathItem = path.join(pathAssets, item.name);
        const pathItemDes = path.join(pathAssetsCopy, item.name);
        fs.copyFile(pathItem, pathItemDes, (error) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

fs.stat(pathCopy, function(error, stats) {
  if (error && error.code === 'ENOENT') {
    fs.mkdir(pathCopy, function(error) {
      if (error) {
        console.error(error);
        return;
      }
      createTemplate();
    });
  } else if (stats.isDirectory()) {
    createTemplate();
  } else {
    console.error(`Invalid path ${pathCopy}`);
  }
});

fs.readdir(pathStyles, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error);
      return;
    }
    const stream = fs.createWriteStream(path.join(pathCopy, 'style.css'));
    files.forEach((item) => {
      if (item.isFile() && path.extname(item.name) === '.css') {
        const itemPath = path.join(pathStyles, item.name);
        fs.createReadStream(itemPath).pipe(stream);
      }
    });
  });


function createTemplate() {
  fs.copyFile(path.join(__dirname, 'template.html'), path.join(pathCopy, 'index.html'), (error) => {
    if (error) {
      console.error(error);
      return;
    }
    fs.readFile(path.join(pathCopy, 'index.html'), 'utf8', (error, data) => {
      if (error) {
        console.error(error);
        return;
      }
      fs.readdir(folderPath, { withFileTypes: true }, (error, files) => {
        if (error) {
          console.error(error);
          return;
        }
        files.forEach((file) => {
          fs.readFile(path.join(folderPath, file.name), 'utf8', (error, dataFile) => {
            if (error) {
              console.error(error);
              return;
            }
            const tagName = `{{${file.name.split('.')[0]}}}`;
            data = data.replace(tagName, dataFile);
            fs.writeFile(path.join(pathCopy, 'index.html'), data, (error) => {
              if (error) {
                console.error(error);
                return;
              }
              console.log(`${file.name} has been processed successfully.`);
            });
          });
        });
      });
    });
  });
}
