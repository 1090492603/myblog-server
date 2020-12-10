var express = require('express');
var router = express.Router();

const {
  getIndex,
  getTotal
} = require('../controller/blog');

const {SuccessModel,ErrorModel} = require('../model/msgModel');

/* GET home page. */
router.get('/list',(req,res,next)=>{
  let limit = req.query.limit,offset = req.query.offset;
  if(typeof req.query.limit != 'number' && typeof req.query.offset != 'number'){
    limit = parseInt(limit);
    offset = parseInt(offset);
  }
  if(limit<=0 && offset<=0){
    res.json( new ErrorModel('传入参数有误') );
  }
  console.log(limit,offset);
  const result1 = getIndex(limit,offset);
  const result2 = getTotal();
  Promise.all([result1,result2]).then((list)=>{
    let detailData = {};
    detailData.data = list[0];
    detailData.total = list[1][0].total;  //必定只有一条，所以 [0]
    if(detailData){
      res.json(new SuccessModel(detailData))
      return ;
    }
  res.json( new ErrorModel('博客详情获取失败，查无此博客') );
  })
 
})

router.get('other',(req,res,next)=>{
    res.json( new ErrorModel('此接口还未开发完成'));
})

module.exports = router;
