const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");
const todo = require("./routes/todo.js");
const clickday = require("./routes/clickday");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/todo", todo); //월 전환시 요청 API
app.use("/clickday", clickday); //일자 클릭시 요청API

const port = 3003;
app.listen(port, () => console.log(`Start Node ${port}`));
