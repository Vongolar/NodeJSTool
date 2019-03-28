let fs=require('fs');

function cleanDir(path){
    if(fs.existsSync(path)&&fs.statSync(path).isDirectory()){
        let clean=(p)=>{
            let stat=fs.statSync(p);
            if(stat.isDirectory()){
                let ps=fs.readdirSync(p);
                for(let i=0;i<ps.length;i++){
                    clean(p+'/'+ps[i]);
                }
                fs.rmdirSync(p);
            }else{
                fs.unlinkSync(p);
            }
        };
        clean(path);
    }
    fs.mkdirSync(path);
}

function ergodicDir(path,callback,end){
    let ends=end;
    if(!Array.isArray(end)){
        ends=[end];
    }
    let ergoDir=(p)=>{
        let stat=fs.statSync(p);
        if(stat.isDirectory()){
            let ps=fs.readdirSync(p);
            for(let i=0;i<ps.length;i++){
                ergoDir(p+'/'+ps[i]);
            }
        }else if(stat.isFile()){
            for(let i=0;i<ends.length;i++){
                if(p.endsWith(ends[i])){
                    if(callback!=null){
                        callback(p);
                    }
                    break;
                }
            }
        }
    };
    if(fs.existsSync(path)){
        ergoDir(path);
    }
}

function writeFile(root,path,data){
    let paths=path.split('/');
    let subPath='';
    for(let i=0;i<paths.length-1;i++){
        subPath+=('/'+paths[i]);
        if(!fs.existsSync(root+subPath)||!fs.statSync(root+subPath).isDirectory()){
            fs.mkdirSync(root+subPath);
        }
    }
    fs.writeFileSync(root+path,data,'utf-8');
}

module.exports={
    cleanDir,
    ergodicDir,
    writeFile
}