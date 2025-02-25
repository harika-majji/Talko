const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const connectDb = require('./config/db');

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

dotenv.config();
connectDb();
const port = process.env.PORT || 5000
app.use(cors());
app.use(express.json());
app.listen(port, console.log("Server started on PORT 5001".yellow.bold));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

