const {User} = require('../models');



exports.getUsersById = ((req, res, next) => {
    User.findById(req.params.user_id)
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        return next({
          status: 400,
          msg: 'Bad Request'
        });
      
      });
   
})