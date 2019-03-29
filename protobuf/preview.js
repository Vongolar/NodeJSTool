let config = require('./config');
let fs = require('fs');
let proto = require('./protobuf');
let convert=require('../util/convert');

let dataPath=config.outPath+process.argv[2];

let buf=fs.readFileSync(dataPath);
let protoPathLength=buf.readInt8(0);
let protoLength=buf.readInt8(4);
let offset=8+protoPathLength;
let protoPath=buf.subarray(8,offset);
let loffset=offset;
offset+=protoLength;
let protoName=buf.subarray(loffset,offset);
let pPath=convert.uint8ArrayToString(protoPath);
let pName=convert.uint8ArrayToString(protoName);
let data=proto.decode(config.protoPath+pPath,pName,buf.subarray(offset));

console.log(JSON.stringify(data,null,4));