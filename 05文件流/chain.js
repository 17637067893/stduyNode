var fs = require("fs")
var zlib = require("zlib")

var readStream = fs.createReadStream("a.txt")

readStream.pipe(zlib.createGzip())
.pipe(fs.createWriteStream("d.txt.gz"));

console.log("压缩完成")