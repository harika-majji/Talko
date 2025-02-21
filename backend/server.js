const express = require('express');
const dotenv = require("dotenv");
const { chats } = require('./data');
const connectDb = require('./config/db');
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config();
connectDb();
const port = process.env.PORT || 5000

app.use(express.json());
app.listen(port, console.log("Server started on PORT 5001".yellow.bold))
app.get("/", (req, res) => {
    res.send("API running")
});

app.use("/api/user", userRoutes);

// app.get("/api/chat", (req, res) => {
//     res.send(chats)
// });

// app.get("/api/chat/:id", (req, res) => {
//     const singleChat = chats.find(c=> c._id==req.params.id)
//     res.send(singleChat)
// });

