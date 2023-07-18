const sequelize = require('sequelize');
const database = new sequelize('sistemaDeCadastro', 'root', 'Brululof#3001', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = {
    database: database,
    sequelize: sequelize
}