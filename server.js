const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');

const usersRouter = require('./routers/users');
const { config } = require('./config/config');

const app = express();

// const options = {
//     passphrase: "password",
// };

app.use(cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", usersRouter);

app.get("/", (req, res) => {
    res.json({message: "dolgozat_API is running"});
});

app.use((err, req, res, next) => {
    console.log(err.message, err.stack);
    res.status(err.statusCode || 500).json({message: err.message});
});


app.listen(3000, () => console.log("A szerver a 3000-es porton fut!"));
