require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/models");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.get("/api", (req, res) => {
    return res.json("123");
});

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`server started http://localhost:${PORT}`);
    });
};

start();
