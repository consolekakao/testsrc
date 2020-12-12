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

connection.connect();
router.post("/", function (req, res) {
  connection.query(`delete from calendar where num = ${req.body.idx}`);

  connection.query(
    `select count(*) as cnt from calendar where num = ${req.body.idx}`,
    function (err, rows) {
      try {
        if (err) throw err;
        if (rows) {
          rows[0].cnt == 0
            ? console.log(`${req.body.idx}번 일정 삭제 성공`)
            : console.log(`${req.body.idx}번 일정 삭제 실패`);
        }
      } catch {
        console.log("실패");
      }
    }
  );
});

module.exports = router;
