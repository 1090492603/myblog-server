var express = require('express');
var router = express.Router();
const {SuccessModel,ErrorModel} = require('../model/msgModel');
var qiniu = require('qiniu');

router.get("/getAuth",(req,res,next)=>{
    var aceessKey = "EHT1OnyxeG-NoXGUeJYPaIgKwkmwzGx-NiJ1_KDj";
    var secretKey = "2x4hClFe_dV0T_nbsCNJfOqWfkqewuLd4UmmLJDS";
    var mac = new qiniu.auth.digest.Mac(aceessKey,secretKey);
    var options = {
        scope:'guojin-myblog'
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    let auth = {};
    auth.data = uploadToken;
    res.json( new SuccessModel(auth))
    
})


module.exports = router;