const  {ErrorModel} = require("../model/msgModel");

module.exports = function(req,res,next){
    if(req.session.username){
        next();
        return ;
    }
    res.json(
        new ErrorModel("未登陆")
    )
}