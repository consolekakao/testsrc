var bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
var mysql = require("mysql");
const cors = require("cors");
const dbconnect = require("./dbconnect.json");
const { json } = require("express");
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
  connection.query(
    `insert into calendar (sindex,contents,date) values ('${req.body.year}-${req.body.month}-${req.body.date}','${req.body.contents}','${req.body.date}')`
  );
});

module.exports = router;
