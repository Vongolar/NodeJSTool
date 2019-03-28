let protobuf = require('protobufjs');
let fs = require('fs');

function encode(protoPath, proto, data) {
    let root = protobuf.loadSync(protoPath);
    let builder = root.lookupType(proto);
    let msg = builder.create(data);
    let buf = builder.encode(msg).finish();
    return buf;
}

function decode(protoPath, proto, buffer) {
    let root = protobuf.loadSync(protoPath);
    let builder = root.lookupType(proto);
    let msg = builder.decode(buffer);
    return builder.toObject(msg);
}

module.exports = {
    encode,
    decode
}