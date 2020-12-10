var bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();
router.use(express.json());
router.use(bodyParser.json());
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
  console.log(req.body);
  console.log()
  connection.query(`SELECT * FROM calendar `, function (err, rows) {
    try {
      if (err) throw err;
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
  });
});

module.exports = router;
