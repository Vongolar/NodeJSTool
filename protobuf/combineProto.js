let fs=require('fs');
let File=require('../util/file');
let config=require('./config');

let res='';
File.ergodicDir(config.protoPath,(file)=>{
    let contents=fs.readFileSync(file,'utf-8').split('\n');
    let content='';
    for(let i=0;i<contents.length;i++){
        if(contents[i].indexOf('import')>=0){
            continue;
        }
        if(res!=''&&contents[i].indexOf('syntax')>=0){
            continue;
        }
        content+=(contents[i]+'\n');
    }
    res+=content;

    File.writeFile(config.outPath,'all.proto',res);
},'.proto')