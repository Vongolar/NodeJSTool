let xml =require('fast-xml-parser');

let options={
    attributeNamePrefix:'',
    ignoreAttributes:false,
    textNodeName:'value',
    format:true
};

function encode(date){
    let parser=new xml.j2xParser(options);
    return parser.parse(date);
}

module.exports={
    encode
}