function intToUint8Array(integer) {
    let arr = new Uint8Array(4);
    arr[3] = (integer >> 24) & 0xFF;
    arr[2] = (integer >> 16) & 0xFF;
    arr[1] = (integer >> 8) & 0xFF;
    arr[0] = integer & 0xFF;
    return arr;
}

function uint8ArrayToInt(arr) {
    let iarr = new Uint32Array(1);
    iarr[0] = (arr[3] & 0xFF) << 24;
    iarr[0] = iarr[0] | ((arr[2] & 0xFF) << 16);
    iarr[0] = iarr[0] | ((arr[1] & 0xFF) << 8);
    iarr[0] = iarr[0] | (arr[0] & 0xFF);
    return iarr[0];
}

function stringToUint8Array(str){
    let arr=[];
    for(let i=0;i<str.length;i++){
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
}

function uint8ArrayToString(arr){
    let str='';
    for(let i=0;i<arr.length;i++){
        str+=String.fromCharCode(arr[i]);
    }
    return str;
}

module.exports={
    intToUint8Array,
    uint8ArrayToInt,
    stringToUint8Array,
    uint8ArrayToString
}