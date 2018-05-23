const {User, Article, ComMent} = require('../models');



exports.getCommentsById = ((req, res, next) => {
    ComMent.findById(req.params.comment_id)
    .then(comments => {
        res.send(comments)
    })
    .catch(err => {
        return next({
          status: 400,
          msg: 'Bad Request'
        });
      
      });
   
})


exports.inputVotesByComment = ((req, res, next) => {
    const commentId = req.params.comment_id
    return ComMent.findByIdAndUpdate(commentId)
    .then(comment => {
      if(req.query.vote === 'up') comment.votes ++;
      else if(req.query.vote === 'down') comment.votes --;
      return comment.save();
    }).then(comment => res.status(200).send({comment}))
    .catch(next)
});

exports.deleteById = ((req, res, next) => {
    const commentId = req.params.comment_id
    return Promise.all([ComMent.findByIdAndRemove(commentId),commentId])
    .then(([comment, commentId]) => {
    res.status(200).send(`comment:${commentId} deleted successfully`);  
    }) 
})

