let fs = require('fs');
let path = require('path');
let data='';

let stream = fs.createReadStream(path.join(__dirname, 'text.txt'))
.on('data', function(chunk) {
    data += chunk;
}).on('end', function() {
    console.log(data);
});
