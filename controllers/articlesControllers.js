const {User, Article, ComMent} = require('../models');



exports.getAllArticles = ((req, res, next) => {
  Article.find()
    .then(article => {
      return res.status(200).send({article});
    })
    .catch(err => {
        return next({
          status: 404,
          msg: 'Page Not Found!'
        });
        
      });
});

exports.getArticlesById = ((req, res, next) => {
    Article.findById(req.params.article_id)
    .then(articles => {
      res.send(articles)
    })
    .catch(err => {
      return next({
        status: 400,
        msg: 'Bad Request'
      });
    
    });
 
})

exports.getCommentsByArticle = ((req, res, next) => {
    const articleId = req.params.article_id;
    ComMent.find({ belongs_to: articleId }, { __v: false})
      .then((comments) => {
        if (comments.length === 0) next();
        return res.json({comments});
      })
      .catch(next);
});
  
exports.addCommentToArticle = (req, res, next) => {
    const newComment = new ComMent({body: req.body.body, belongs_to: req.params.article_id,created_by: '5b058261f82dc80c7c5fb422'})
    return ComMent.create(newComment)
    .then(comment => {
        res.send(`Comment added :  "body": ${comment.body}`);
    })
    .catch(next)
}

exports.inputVotesByArticle = ((req, res, next) => {
    const articleId = req.params.article_id;
    return Article.findByIdAndUpdate(articleId)
    .then(article => {
      if(req.query.vote === 'up') article.votes ++;
      else if(req.query.vote === 'down') article.votes --;
      return article.save();
    }).then(article => res.status(200).send({article}))
    .catch(next);
});

