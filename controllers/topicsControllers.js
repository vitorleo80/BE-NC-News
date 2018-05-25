const {Topic, Article, User} = require('../models');



exports.getAllTopics = ((req, res, next) => {
  Topic.find()
    .then(topics => {
      return res.status(200).send({topics});
    })
    .catch(err => {
        return next({
          status: 404,
          msg: 'Page Not Found!'
        });
        
      });
});

exports.getArticlesByTopic = (req, res, next) => {
    Article.find({ belongs_to: req.params.topic_title })
      .then(articles => {
        res.status(200).send({articles})
      })
      .catch(err => {
        return next({
          status: 404,
          msg: 'Page Not Found!'
        });
      
      });
   
}

exports.addArticleToTopic = ((req, res, next) => {
  return User.findOne().then((user) => { 
    const newArticle = new Article({ title: req.body.title, body: req.body.body, belongs_to: req.params.topic_title, created_by: user._id})
        return Article.create(newArticle)
  })
  .then(article => {
        res.status(201).send({article});
      })
      .catch(err => {
        next({
          status: 400,
          msg: 'Bad Request'
        });
      
      });
});
