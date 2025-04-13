const { Sequelize } = require("sequelize");

module.exports = sequelize = new Sequelize(
    process.env.BD_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: "localhost",
    }
);
