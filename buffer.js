// 数组不能进行二进制的操作
// js数组不像java, python 等语言效率高
// buffer 内存空间开辟出固定大小的内存==

var str = "12345"

let buf = Buffer.from(str)
console.log(buf)

console.log(buf.toString())