const {exec,escape} = require('../db/mysql');
const {genPasswork} = require('../utils/crypto');

const loginUser=(username,password)=>{

    //用于过滤mysql的关键字符，防止sql注入，返回字符串
    username = escape(username);

    password = genPasswork(password);
    password = escape(password);
    
    let sql = `select * from users where username = ${username} and passwork = ${password} ;`

    return exec(sql);
}

module.exports={
    loginUser
}