let protobuf=require('protobufjs');
let fs=require('fs');

function encode(protoPath,proto,data){
    let root=protobuf.loadSync(protoPath);
    let builder=root.lookupType(proto);
    let msg=builder.create(data);
    let buf=builder.encode(msg).finish();
    return buf;
}

function decode(){
    // let buf=testData.encode(msg).finish();

// let message=testData.decode(buf);

// let ret=testData.toObject(message);
}

module.exports={
    encode,
    decode
}