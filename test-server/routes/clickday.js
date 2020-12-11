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
  let lastday = new Date(req.body.year, req.body.month + 1, 0).getDate();
  let q = req.body.month++;
  if (req.body.month.toString().length == 1)
    req.body.month = "0" + req.body.month;

  if (req.body.day.toString().length == 1) req.body.day = "0" + req.body.day;
  console.log(req.body);

  console.log(
    `SELECT * FROM calendar where sindex = "${req.body.year}-${req.body.month}-${req.body.day}"`
  );
  connection.query(
    `SELECT * FROM calendar where sindex = "${req.body.year}-${req.body.month}-${req.body.day}"`,
    function (err, rows) {
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
    }
  );
});

module.exports = router;
