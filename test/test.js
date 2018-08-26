const newt = require('./src/iguana.js')
const n = new newt();
var arr = new n.List(1, 2, 3, 4);
console.log(arr.origin.shuffle())