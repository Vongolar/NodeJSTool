let fs = require('fs');
let file = require('./../util/file');
let proto = require('./protobuf');
let convert=require('../util/convert');
let config=require('./config');

let outPath=config.outPath;
let dataPath=config.dataPath;
let protoPath=config.protoPath;

file.cleanDir(outPath);
let key = {};
file.ergodicDir(dataPath, (dataFile) => {
    let jsonData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    let buf = proto.encode(protoPath + jsonData.path, jsonData.proto, jsonData.data);
    let subPath = dataFile.substring(dataPath.length + 1).split('.')[0] + '.pd';
    let pathLength=convert.intToUint8Array(jsonData.path.length);
    let protoLength=convert.intToUint8Array(jsonData.proto.length);
    let pathHead=convert.stringToUint8Array(jsonData.path);
    let protoHead=convert.stringToUint8Array(jsonData.proto);
    let data=new Uint8Array(pathLength.length+protoLength.length+pathHead.length+protoHead.length+buf.length);
    let offset=0;
    for(let i=0;i<pathLength.length;i++,offset++){
        data[offset]=pathLength[i];
    }
    for(let i=0;i<protoLength.length;i++,offset++){
        data[offset]=protoLength[i];
    }
    for(let i=0;i<pathHead.length;i++,offset++){
        data[offset]=pathHead[i];
    }
    for(let i=0;i<protoHead.length;i++,offset++){
        data[offset]=protoHead[i];
    }
    for(let i=0;i<buf.length;i++,offset++){
        data[offset]=buf[i];
    }
    file.writeFile(outPath, subPath, data);
}, '.json');