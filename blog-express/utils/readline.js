const fs  = require('fs');
const path  = require('path');
const readline = require('readline');

const fileName = path.join(__dirname,'../','../','logs/','access.log');
const readStram = fs.createReadStream(fileName);
const rl = readline.createInterface({
    input : readStram
});

let num = -1;
let ChromeNum = 0;

rl.on('line',lineData=>{
    if(!lineData || lineData == '\n'){
        return ;
    }
    num++;
    if(lineData.split(" -- ")[2]&&lineData.split(" -- ")[2].indexOf("Chrome")){
        ChromeNum++;
    }
})

rl.on('close',() => {
    console.log('chorme 占比：' + ChromeNum / num *100 + "%");
})