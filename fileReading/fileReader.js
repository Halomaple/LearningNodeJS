var fs = require('fs');

var data = fs.readFileSync('fileReading/input.txt');

console.log(data.toString());
console.log('syn file reading finished');

console.log('----------------------------')

fs.readFile('fileReading/input.txt', function(err, data){
	if(err) return console.error(err);
	console.log(data.toString());
	console.log('asyn file reading finished');
});

console.log('continue work here before asycn file reading finished');