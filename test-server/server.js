const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");
const todo = require("./routes/todo.js");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/todo", todo);

const port = 3003;
app.listen(port, () => console.log(`Start Node ${port}`));
