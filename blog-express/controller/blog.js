const {exec , escape} = require('../db/mysql');
const xss = require('xss');

const getList = (author,keywork)=>{
    //1=1有特殊作用，防止参数为空
    let sql = `select * from blogs where 1=1 and state = 0 and state = 0 `;
    if(author){
        sql += ` and author="${author}"`
    }
    if(keywork){
        sql += ` and title like "%${keywork}%"`
    }
    sql += ` order by createtime desc;`
    return exec(sql);
}

const getIndex = (limit,offset,author=undefined)=>{
    let left = limit * (offset - 1);
    let sql = `select id,title,preview,createtime,author,tag from blogs where state = 0`;
    if(author){
        author = xss(author);
        sql += ` and author=${author} `;
    }
    sql += ` order by createtime desc limit ${left},${limit}`;
    return exec(sql);
}

const getTotal = ()=>{
    let sql = `SELECT count(*) as total FROM blogs WHERE state = 0`;
    return exec(sql);
}

const getDtail = (id)=>{

    //1=1有特殊作用，防止参数为空
    let sql = `select * from blogs where 1=1`;
    if(id){
        sql += ` and id=${id}`  
    }
    return exec(sql);
}

const newBlog = (blogData)=>{
    let {title,content,author,preview,tag} = blogData;
    title = escape(xss(title));
    content = escape(xss(content));
    author = escape(xss(author));
    preview = escape(xss(preview));
    tag = escape(xss(tag))
    const createtime = Date.now();
    let sql = `insert into blogs (title,content,preview,createtime,author,tag) values (${title},${content},${preview},${createtime},${author},${tag});`;
    
    //数据库中的id
    return exec(sql);

}

const updateBlog= (id,blogData = {})=>{
    
    let {title,content,author,preview,tag} = blogData;
    title = escape(xss(title));
    content =  escape(xss(content));
    author =  escape(xss(author));
    preview = escape(xss(preview));
    tag= escape(xss(tag));
    const createtime = Date.now();

    console.log(`更新一篇博客, ID:${id}, 内容:${blogData}`);
    if(id){
        let sql = `update blogs set `;
        if(title){
            sql += ` title=${title} `;
        }
        if(content){
            sql += `, content=${content} `;
        }
        if(author){
            sql += `, author=${author} `
        }
        if(preview){
            sql += ` , preview=${preview} `
        }
        if(preview){
            sql += ` , preview=${preview} `
        }
        if(tag){
            sql += ` , tag=${tag}`
        }
        sql += ` , createtime=${createtime} `
        sql += ` where id = ${id}; `;
        //createtime ， 自己考虑下改不改。
        return exec(sql).then(sqlDate =>{
            console.log("blog undata",sqlDate);
            if(sqlDate.affectedRows>=1){
                return true;
            }else{
                return false;
            }
            
        })
    }
}

const delBlog = (id,author)=>{
    console.log(`删除一篇博客, ID:${id}`);
    let sql = ` update blogs set state = 1 where 1 = 1 and id=${id} and author = "${author}";`;
    return exec(sql).then(sqlDate =>{
        if(sqlDate.affectedRows>=1){
            return true;
        }else{
            return false;
        }
    })
}

module.exports={
    getList,
    getDtail,
    newBlog,
    updateBlog,
    delBlog,
    getIndex,
    getTotal
}
