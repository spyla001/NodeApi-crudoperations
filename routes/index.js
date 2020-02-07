const express = require("express");
const router = express.Router();
const userControl = require("../controller/userController");
const emailService = require("../service/emailService");
const sendMail = require("../service/sendemail");

/* GET home page. */
router.get("/users", userControl.getRecords);
router.get("/insertRecords", userControl.insertRecords);
router.get("/users/:id", userControl.getRecord);
router.get("/users/new/record", sendMail, userControl.postRecord);
router.put("/users/:id", userControl.updateRecord);
router.delete("/users/:id", userControl.deleteRecord);

module.exports = router;
