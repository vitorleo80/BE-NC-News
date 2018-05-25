const {Topic, Article} = require('../models');



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
    const newArticle = new Article({ title: req.body.title, body: req.body.body, belongs_to: req.params.topic_title, created_by:'5b06f200ccd9707a900471c2'})
        return Article.create(newArticle)
    .then(article => {
        res.status(201).send(`Article added : "title": ${article.title}, "body": ${article.body}`);
        // res.status(201).send({article});
      })
      .catch(err => {
        next({
          status: 400,
          msg: 'Bad Request'
        });
      
      });
});
