let config = require('./config');
let fs = require('fs');
let xml=require('./xml');
let dataPath=config.outPath+process.argv[2];
let source=fs.readFileSync(dataPath,'utf-8');
let data=xml.decode(source);
console.log(JSON.stringify(data,null,4));