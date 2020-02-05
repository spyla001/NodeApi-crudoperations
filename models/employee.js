const Sequelize = require("sequelize");
const db = require("../utility/dbConnection");
const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ssn: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  profession: {
    type: Sequelize.STRING
  }
});

module.exports = User;
