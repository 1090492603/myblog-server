const mysql = require('mysql');
const {MYSQL_CONF} = require("../conf/db");

//创建链接对象;
let con = mysql.createConnection(MYSQL_CONF);

//开始链接
con.connect();

const escape = mysql.escape;

//统一执行mysql语句函数
function exec(sql){
    const promise = new Promise((resolve,reject)=>{
        //执行sql语句
        con.query(sql,function(error,result){
            if(error){
                console.log(" * mysql err = " , error);
                reject(error);
                return ;
            }
            if(Object.keys(result).length == 0){
                resolve("查询为空");
                return ;
            }
            resolve(result);
        })
    })
    return promise;
}


module.exports = {
    exec,
    escape
}