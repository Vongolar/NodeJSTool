let config = require('./gen');
let fs = require('fs');
let proto = require('./protobuf');

if (!fs.existsSync(config.outPath + config.keyFile) || !fs.statSync(config.outPath + config.keyFile).isFile()) {
    console.error('预览时解析文件' + config.outPath + config.keyFile + '不存在');
    return;
}

let key = JSON.parse(fs.readFileSync(config.outPath + config.keyFile, 'utf-8'));
for (const k in key) {
    let ppath = key[k].path;
    let pname = key[k].proto;
    let res = proto.decode(config.protoPath + ppath, pname, fs.readFileSync(config.outPath + k));
    console.log(JSON.stringify(res, null, 4));
}