var express = require('express');
var router = express.Router();

let {loginUser} = require('../controller/user');
let {SuccessModel,ErrorModel} = require('../model/msgModel');

/* POST users listing. */
router.post('/login', function(req, res, next) {
    
  const {
    username,
    password
  } = req.body;

  const result = loginUser(username,password);
  return result.then(userData=>{
  if(typeof userData != 'string'){  
    
      req.session.username  = userData[0].username;
      console.log(req.session.username);
      req.session.realname  = userData[0].realname;//自动放到redis里面，利用connect-redis;
      res.json( new SuccessModel("登陆成功") );
      return ;
  }
  res.json( new ErrorModel('登陆失败'));
      
  })
});

router.get('/login-test',function(req,res,next){
  if(req.session){
    res.json({
      username:req.session,
      msg:"登陆成功"
    })
    return ;
  }
  res.json("未登陆");
})

module.exports = router;
