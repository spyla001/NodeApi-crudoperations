const User = require("../models/employee");
const db = require("../utility/dbConnection");
const userControl = {};
const formdata = {
  firstName: "sai",
  lastName: "ruthvik",
  age: 23,
  ssn: 3823928,
  profession: "Systems Engineer"
};

const pagenate = (page, pageSize) => {
  if (page && pageSize) {
    return {
      limit: pageSize,
      offset: page * pageSize - pageSize
    };
  }
};

userControl.insertRecords = async function(req, res, next) {
  await db.sync({ force: true }).then(() => {
    return User.bulkCreate([
      {
        firstName: "sanyasi",
        lastName: "naidu",
        age: 25,
        ssn: 256346363,
        profession: "software developer"
      },
      {
        firstName: "sai",
        lastName: "ruthvik",
        age: 23,
        ssn: 3823928,
        profession: "Systems Engineer"
      },
      {
        firstName: "vijay",
        lastName: "devarakonda",
        age: 33,
        ssn: 23482,
        profession: "Actor"
      },
      {
        firstName: "sankeerthan",
        lastName: "reddy",
        age: 25,
        ssn: 23423,
        profession: "Datascientist"
      },
      {
        firstName: "sneha",
        lastName: "lella",
        age: 26,
        ssn: 2323,
        profession: "java devloper"
      },
      {
        firstName: "akhila",
        lastName: "velaga",
        age: 23,
        ssn: 2347,
        profession: "Data Engineer"
      }
    ]);
  });
  res.redirect("/");
};

userControl.getRecords = function(req, res, next) {
  console.log(req.query);
  User.findAll(
    pagenate(parseInt(req.query.page), parseInt(req.query.pagesize))
  ).then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
    res.json(users);
  });
};

userControl.getRecord = function(req, res) {
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => res.json(user));
};

userControl.postRecord = async function(req, res) {
  await User.create(formdata);
  res.send("new record inserted");
};

userControl.updateRecord = function(req, res) {
  User.update(
    { age: 27, ssn: 143134 },
    { where: { id: req.params.id } }
  ).then(updated => res.json(updated));
};

userControl.deleteRecord = function(req, res) {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send(`user with id: ${req.params.id}, was deleted`));
};

module.exports = userControl;
