let fs = require('fs');
let file = require('./../util/file');
let proto = require('./protobuf');

let dataPath = './protobuf/data/';
let protoPath = './protobuf/proto/';
let outPath = './protobuf/out/';

let keyFile = 'key.json';

file.cleanDir(outPath);
let key = {};
file.ergodicDir(dataPath, (dataFile) => {
    let jsonData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    let buf = proto.encode(protoPath + jsonData.path, jsonData.proto, jsonData.data);
    let subPath = dataFile.substring(dataPath.length + 1).split('.')[0] + '.pd';
    file.writeFile(outPath, subPath, buf);

    key[subPath] = {
        path: jsonData.path,
        proto: jsonData.proto
    };
    file.writeFile(outPath, keyFile, JSON.stringify(key));
}, '.json');

module.exports = {
    protoPath,
    outPath,
    keyFile
}