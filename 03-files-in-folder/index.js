const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (error, files) => {
  if (error) {
    console.error('Error reading directory:', error);
    return;
  }
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (error, stats) => {
        if (error) {
          console.error(`Error getting info for file ${file.name}:`, error);
          return;
        }
        const filename = file.name.split('.').slice(0, -1).join('.');
        const extension = path.extname(file.name).slice(1);
        const size = `${Math.round(stats.size / 1024)}Kb`;
        console.log(`${filename} - ${extension} - ${size}`);
      });
    }
  });
});








