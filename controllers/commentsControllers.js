const {User, Article, ComMent} = require('../models');



exports.getCommentsById = ((req, res, next) => {
    ComMent.findById(req.params.comment_id)
    .populate('created_by', 'username -_id')
    .then(comment => {
        let {_id, body, belongs_to, votes, created_at} = comment
        const formatedComment = {
          _id, body, belongs_to, votes, created_at,
          created_by: comment.created_by.username,
        }
        res.status(200).send({formatedComment})
    })
    .catch(err => {
        return next({
          status: 400,
          msg: 'Id not Found'
        });
      
      });
   
})


exports.inputVotesByComment = ((req, res, next) => {
  const msg = 'Invalid input, use "up" to add a vote or "down" to decrease it.'
  req.query.vote !== 'up' ? (req.query.vote !== 'down' ?
  next({status: 400, msg: msg}) : null) : null;
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
    .catch(err => {
        return next({
          status: 400,
          msg: 'Id not found'
        });
      
      }); 
})

