const crypto = require("crypto");

//密钥;
const SECRET_KEY = 'Gj_oj8K';

function md5(content){
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
    //hex 十六进制
}

function genPasswork(password) {
    const str = ` passwork=${password}&key=${SECRET_KEY} `;
    return md5(str);
}
module.exports = {
    genPasswork
}