const mysql = require("mysql");

let config = {
	host:'localhost',
	port:'3306',
	user:'root',
	password:'123456789',
	database:'whq'
}

let con = mysql.createConnection(config)
con.connect((err) => {
	if(err){
		console.log(err)
	}else{
		console.log("数据库连接成功")
	}
});

let str1 = "select * from whq";
let str2 = "drop table whq";
// 增加表
let str3 = "create table `use` (id int(8),name varchar(255))"
// 新增数据 第一种

// let str4 = "insert into whq (name,age,address) values (?,?,?)"
// con.query(str4,['小胖','20','未知'],(err,results,fields) => {
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(results)
// 	}
	
// })

//第二种

let address1 = "广州";
// 条件查找 'select * from whq where age > 20'
let str5 = "select * from whq where id > 10 and id < 15";
// 条件查找between
let str6 = "select * from whq where id between 5 and 9"
// 查询为空null
let str7 = "select * from whq where name != null"

// 或查询
let str8 =  "select * from whq where id = 5 or id = 7";
let str9 = "select * from whq where id in (1,3,9,12)"


// 模糊查询 % 任意多个字符 _ 一个字符   ‘%胖’ 要加引号
let str10 = "select * from whq where id > 10 and (name like '%胖')"
let str11 = "select * from whq where name like '_娜'"
con.query(str11,(err,results,fields) => {
	if(err){
		console.log(err)
	}else{
		console.log(results);
	}
})
//子查询  a学生表 b  c成绩表   查找学生成绩小于30的学生
      学生表 inner 查出所有成绩 where 学生的名字 in(可能有多个) 成绩小于30的学生名字
select * from student inner score on student.id = score.studentid where student.studentname in (select studentname from score < 30)


//三标查询
select * from a inner join b where a.id = b.id inner join c b.id = c.id where a.id = 5;

// -- 存在某个条件才做查询
// -- 如果有学生大与50岁，将老师查找出来
select * from teacher WHERE EXISTS(select name from student WHERE id < 50);

con.end();