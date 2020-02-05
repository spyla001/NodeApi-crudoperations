const Sequelize = require('sequelize');
const db = new Sequelize('employeerecords', 'spyla001', 'MINDb223$', {
    host: 'localhost',
    dialect:'mysql'
});

module.exports = db;
