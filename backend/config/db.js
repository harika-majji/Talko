const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{});  
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.bgCyan);
    } catch (error) {
        console.log(`Error Connecting ${error.message}`);
        process.exit()
        
    }
};

module.exports = connectDb;
