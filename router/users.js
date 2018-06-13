const express = require('express');
const {getUsersById, getByUsername, getAllUsers}= require('../controllers/usersControllers');
const router = express.Router();
const bodyParser = require('body-parser');


router.route('/')
  .get(getAllUsers)

router.route('/id/:user_id')
  .get(getUsersById)

router.route('/:username')
  .get(getByUsername)



  

  
module.exports = router;