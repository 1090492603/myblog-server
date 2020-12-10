class Model{
    constructor(data,msg){
        if(typeof data =='string'){
            this.msg = data;
            data = null;
            msg = null;
        }
        if(data!=null){
            this.data = data;
        }
        if(msg  != null){
            this.msg = msg;
        }

    }
}

class SuccessModel extends Model{
    constructor(data,msg){
        super(data,msg);
        let a = {
            errno : 0,
            data : this.data,
            msg : this.msg
        };
        return a;
    }
}

class ErrorModel extends Model{
    constructor(data,msg){
        super(data,msg);
        return {
            errno : 1,
            data : this.data,
            msg : this.msg
        }
    }
}

module.exports = {    SuccessModel ,ErrorModel  };

