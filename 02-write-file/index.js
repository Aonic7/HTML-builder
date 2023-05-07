let path = require('path');
let fs = require('fs');

let createStream = fs.createWriteStream(path.join(__dirname, 'write.txt'))

process.stdout.write('Enter your text:');
process.stdin.on('data', function (data) {
    if (data.toString().trim() === 'exit') {
        process.stdout.write('Saved and closed')
        process.exit();
    }
      createStream.write(data);
 });
 
 process.on('SIGINT', function(){
    process.stdout.write('Saved and closed')
    process.exit();
 });
