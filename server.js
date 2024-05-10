const express = require('express');
const app = express();

require("dotenv").config(); // to use the .env file
app.use(express.json()); // to parse the incoming requests with JSON payloads

const DBconnect = require('./DBconnect');
DBconnect();
app.use("/auth",require('./routes/authRouter'));
app.use("/meet",require('./routes/meetRouter'));
app.listen(process.env.PORT, (err) => err? console.log(err): console.log('Server is running on port ' + process.env.PORT));    // server is running on port 