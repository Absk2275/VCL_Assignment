

const mongoose = require("mongoose");

const Connection = async () => {
    try{
        await mongoose.connect("mongodb+srv://abskgupta11:abskgupta11@cluster0.7urmp2v.mongodb.net/?retryWrites=true&w=majority");

    console.log("Database Connected Successfully");
}catch(e){
    console.log("Failed to connect",  e);
}
}
module.exports = Connection;