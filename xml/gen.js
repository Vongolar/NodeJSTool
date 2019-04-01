let fs = require('fs');
let file = require('./../util/file');
let xml=require('./xml');
let config=require('./config');

file.cleanDir(config.outPath);

file.ergodicDir(config.dataPath,(dataFile)=>{
    let jsonData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    let data=xml.encode(jsonData);
    let subPath = dataFile.substring(config.dataPath.length + 1).split('.')[0] + '.xml';
    file.writeFile(config.outPath,subPath,data);
},'.json');