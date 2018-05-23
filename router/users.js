const express = require('express');
const {getUsersById}= require('../controllers/usersControllers');
const router = express.Router();
const bodyParser = require('body-parser');


router.route('/:user_id')
  .get(getUsersById)



  

  
module.exports = router;