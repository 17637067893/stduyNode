
var fs = require("fs");

var readStream = fs.createReadStream("output.txt");

var writeStream = fs.createWriteStream('c.txt');


readStream.pipe(writeStream);