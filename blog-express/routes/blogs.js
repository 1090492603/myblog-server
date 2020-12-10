const {    
    getList,
    getDtail,
    newBlog,
    updateBlog,
    delBlog,
} = require('../controller/blog');

const {SuccessModel,ErrorModel} = require('../model/msgModel');

let express = require('express');
let router = express.Router();
let loginCheck = require('../middleware/loginCheck');

router.get('/list',(req,res,next)=>{
      let author;
      //是否在管理员页;
     if(req.query.isadmin){
          if(req.session.username == null){
            res.json(
              new ErrorModel("未登录")
            )
            return ;
          }
          author = req.session.username;
      }

     let {keyword} =  req.query;
     const result  = getList(author,keyword);
     result.then((listData)=>{
            if(typeof listData!= 'string'){
              res.json(new SuccessModel(listData));
              return ;
            }
        res.json( new ErrorModel('查询博客列表失败') );    
     });
      //then本身就是一个promise。return new Succ... ; 就是把这个作为成功回调的参数. 
})

router.get('/detail',(req,res,next)=>{
  const result = getDtail(req.query.id);
  result.then(detailData=>{
      if(detailData){
          res.json(new SuccessModel(detailData[0]))
          return ;
      }
      res.json( new ErrorModel('博客详情获取失败，查无此博客') );
  })
})


//会先执行loginChek，next了到下一个;
router.post('/new',loginCheck,(req,res,next)=>{
 
  req.body.author = req.session.username;
  const result = newBlog(req.body);
   result.then(newData=>{
      if(newData){
          console.log(" * blog newData = " ,newData.insertId);    
          res.json( new SuccessModel(newData.insertId,"插入成功"));
      }
      res.json( new ErrorModel('新建博客失败') );
  })
})

router.post('/update', loginCheck, (req,res,next)=>{
  req.body.author = req.session.username;

  const result = updateBlog(req.query.id,req.body);

  result.then(updataData=>{
      if(updataData){
        res.json(new SuccessModel("更新博客成功"));
        return ;
      }
      res.json(new ErrorModel('更新博客失败'));
  })

})

router.post('/del',loginCheck,(req,res,next)=>{
  
  const author = req.session.username;
  const result = delBlog(req.query.id,author);
   result.then(delData=>{
      if(delData){
           res.json(new SuccessModel("删除博客成功"));
           return ;
      }   
      res.json(new ErrorModel('删除博客失败'));
  })
})
module.exports = router;