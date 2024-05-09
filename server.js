const express = require('express');
const app = express();

require("dotenv").config(); // to use the .env file
app.use(express.json()); // to parse the incoming requests with JSON payloads

const DBconnect = require('./DBconnect');
DBconnect();
app.use("/auth",require('./routes/authRouter'));
app.listen(process.env.PORT, (err) => err? console.log(err): console.log('Server is running '));    // server is running on port 