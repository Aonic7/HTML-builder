const fs = require('fs');
const path = require('path');

const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const dir = path.join(__dirname, 'styles');

fs.readdir(dir, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
    return;
  }

  files.forEach((item) => {
    if (item.isFile() && path.extname(item.name) === '.css') {
      const itemPath = path.join(dir, item.name);
      let stream = fs.createReadStream(itemPath);
      stream.on('data', function(item) {
        fs.appendFile(bundle, item, (error) => {
          if (error) {
            console.log(error);
            return;
          }
        });
      });
    }
  });
});
