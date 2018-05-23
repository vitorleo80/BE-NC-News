const {Topic, Article} = require('../models');



exports.getAllTopics = ((req, res, next) => {
  Topic.find()
    .then(topic => {
      return res.status(200).send({topic});
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
        res.send(articles)
      })
      .catch(err => {
        return next({
          status: 404,
          msg: 'Page Not Found!'
        });
      
      });
   
}

exports.addArticleToTopic = ((req, res, next) => {
    if(req.body.body.length === 0) next({ message: 'Invalid comment, please use the correct format', status: 400 });
    const newArticle = new Article({ title: req.body.title, body: req.body.body, belongs_to: req.params.topic_title, created_by:'5b0581fc496b044550e7abdf'})
        return Article.create(newArticle)
    .then(article => {
         res.status(201).send(`Article added : "title": ${article.title}, "body": ${article.body}`);
      }).catch(next);
});
