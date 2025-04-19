const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Students = sequelize.define("students", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    full_name_parent: { type: DataTypes.STRING, allowNull: false },
    full_name_student: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

const Tokens = sequelize.define("tokens", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "students", key: "id" },
    },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
});

Students.hasOne(Tokens, { foreignKey: "user_id" });
Tokens.belongsTo(Students, { foreignKey: "user_id" });

module.exports = {
    Students,
    Tokens,
};
