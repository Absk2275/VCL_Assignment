const express = require("express");
const login = require("./routes/login");
const app=express();
const conn = require("./database/db");
const cors = require("cors");
conn();

app.post("/", (req, res)=>{
    res.send("Hello world")
})
app.use(cors());
app.use(login);

app.listen(5000, ()=>console.log("server is up at port 5000"))