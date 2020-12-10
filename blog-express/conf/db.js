const env = process.env.NODE_ENV; //环境参数.

//配置 数据库连接参数 
let MYSQL_CONF;
let REDIS_CONF;

console.log("env = ",env);
//开发
if(env==='dev'){
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: '',
        database: 'blog'
      }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

//线上
if(env==='production'){
 
}

module.exports = { MYSQL_CONF , REDIS_CONF}