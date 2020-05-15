let axios = require("axios");
let request = require("request");
let httpUrl="https://www.dytt8.net/index.htm";
// console.log(axios)

async function getClassUrl(httpUrl){
    let {res,body} = await req(httpUrl);
    console.log(body)
}

function req(url){
    return new Promise(function(resolve,reject){
        request.get(url,function(err,res,body){
            if(err){
                reject(err)
            }else{
                resolve({res,body})
            }
        })
    });
}
getClassUrl(httpUrl);