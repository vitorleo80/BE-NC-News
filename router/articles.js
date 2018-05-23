const express = require('express');
const {getAllArticles, getArticlesById, getCommentsByArticle, addCommentToArticle, inputVotesByArticle}= require('../controllers/articlesControllers');
const router = express.Router();
const bodyParser = require('body-parser');


router.route('/')
  .get(getAllArticles);


router.route('/:article_id')
  .get(getArticlesById)

router.route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(addCommentToArticle);
router.route('/:article_id?')
  .put(inputVotesByArticle);

  

  
module.exports = router;