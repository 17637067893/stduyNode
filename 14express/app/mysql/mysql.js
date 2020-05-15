const mysql = require('mysql');


let config = {
	host:'localhost',
	port :'3306',
	user:'root', //不是username
	password:'123456789',
	database:'whq'
}

let con = mysql.createConnection(config);

con.connect((err) => {
	if(err){
		console.log(err)
	}else{
		console.log('数据库连接成功');
	}
})

function sqlQuery (strSql,arr){
	return new Promise(function(resolve,reject) {
		con.query(strSql,arr,(err,results) => {
			if(err){
				reject(err)
			}else{
				let jsonData = Array.from(results)
				resolve(jsonData)
			}
		})
	})
}

module.exports = sqlQuery