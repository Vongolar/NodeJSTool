let fs=require('fs');

let dataPath='./proto/data/';
let protoPath='./proto/proto';
let outPath='./proto/out';

function clearDir(path){
    if(fs.existsSync(outPath)&&fs.statSync(outPath).isDirectory()){
        removeDir(outPath);
    }

    fs.mkdirSync(outPath);
}

clearDir(outPath);