require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`server started http://localhost:${PORT}`);
    });
};

start();
