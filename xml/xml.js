let xml =require('fast-xml-parser');

let options={
    attributeNamePrefix:'',
    ignoreAttributes:false,
    textNodeName:'value',
    format:true
};

function encode(data){
    let parser=new xml.j2xParser(options);
    return parser.parse(data);
}

function decode(data){
    return xml.parse(data,options);
}

module.exports={
    encode,
    decode
}