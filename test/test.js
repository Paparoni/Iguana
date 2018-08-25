const newt = require('iguana')
const n = new newt();
var arr = new n.List(1, 2, 3, 4);
console.log(arr.shuffle(2))