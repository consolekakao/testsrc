var bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
var mysql = require("mysql");
const cors = require("cors");
const dbconnect = require("./dbconnect.json");
router.use(cors());
var connection = mysql.createConnection({
  host: dbconnect.host,
  port: dbconnect.port,
  user: dbconnect.user,
  password: dbconnect.password,
  database: dbconnect.database,
});

let outdata = [];
connection.connect();
router.post("/", function (req, res) {
    
  let now = new Date();
  let next = new Date(now.getFullYear(),now.getMonth(),now.getDate()+7);
  let data = { 
        nowYear : now.getFullYear(),
        nowMonth :  now.getMonth()+1,
        nowDate : now.getDate(),
        nextYear : next.getFullYear(),
        nextMonth : next.getMonth()+1,
        nextDate : next.getDate()
  }
   
if (data.nowMonth.toString().length == 1)  data.nowMonth = "0" + data.nowMonth ;
if (data.nowDate.toString().length == 1) data.nowDate = "0" + data.nowDate;
if (data.nextMonth.toString().length == 1)  data.nextMonth = "0" + data.nextMonth ;
if (data.nextDate.toString().length == 1) data.nextDate = "0" + data.nextDate;

   now = `${data.nowYear}-${data.nowMonth}-${data.nowDate}`;
   next = `${data.nextYear}-${data.nextMonth}-${data.nextDate}`;

  console.log(now,next);
  connection.query(
      `select * from calendar where sindex > "${now}" and sindex <= "${next}" order by date asc`,function(err,rows){
          try{
              if(err) throw err;
              for (let i = 0; i < rows.length; i++) {
                          var data = {};
                          data.idx = encodeURI(rows[i].num);
                          data.sindex = encodeURI(rows[i].sindex);
                          data.contents = encodeURI(rows[i].contents);
                          data.date = encodeURI(rows[i].date);
                          outdata.push(data);
                        }
                      } catch (error) {
                        console.error(error);
                      }
                      res.send(outdata);
                      outdata = [];
          }
      
  )
  
});

module.exports = router;
