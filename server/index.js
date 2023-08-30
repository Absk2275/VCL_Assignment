const express = require("express");
const login = require("./routes/login");
const app=express();
const conn = require("./database/db");
const cors = require("cors");
const student = require("./routes/studentDetails");
const staffView = require("./routes/staffView");

const down = require("./routes/download1");
conn();

app.use(express.json());

app.post("/", (req, res)=>{
    res.send("Hello world")
})
app.use(cors());
app.use(login);
app.use(student);
app.use(staffView);

app.use(down);

app.listen(5000, ()=>console.log("server is up at port 5000"))