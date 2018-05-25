const express = require('express');
const {getUsersById, getByUsername}= require('../controllers/usersControllers');
const router = express.Router();
const bodyParser = require('body-parser');


router.route('/id/:user_id')
  .get(getUsersById)

router.route('/:username')
  .get(getByUsername)



  

  
module.exports = router;