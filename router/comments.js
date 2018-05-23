const express = require('express');
const {getCommentsById, inputVotesByComment, deleteById}= require('../controllers/commentsControllers');
const router = express.Router();
const bodyParser = require('body-parser');


router.route('/:comment_id')
  .get(getCommentsById)

router.route('/:comment_id?')
  .put(inputVotesByComment)
  .delete(deleteById)

  

  
module.exports = router;