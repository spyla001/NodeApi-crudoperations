const express = require('express');
const router = express.Router();
const userControl = require('../controller/userController');



/* GET home page. */
router.get('/users', userControl.getRecords);
router.get('/insertRecords', userControl.insertRecords);
router.get('/users/:id', userControl.getRecord);
router.post('/users', userControl.postRecord);
router.put('/users/:id', userControl.updateRecord);
router.delete('/users/:id', userControl.deleteRecord);


module.exports = router;
