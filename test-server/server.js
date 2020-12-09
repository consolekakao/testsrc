const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var http = require("http").createServer(app);

const cors = require("cors");
const todo = require("./routes/todo.js");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/todo", todo);

//app.use("/dump", dump);
const port = 3003;

http.listen(port, () => console.log(`Start Node ${port}`));