const express = require('express');
const {getAllTopics, getArticlesByTopic, addArticleToTopic}= require('../controllers/topicsControllers');
const router = express.Router();
const bodyParser = require('body-parser');


router.route('/')
  .get(getAllTopics);


router.route('/:topic_title/articles')
  .get(getArticlesByTopic)
  .post(addArticleToTopic)
  

  
module.exports = router;