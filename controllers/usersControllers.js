const {User} = require('../models');



exports.getUsersById = ((req, res, next) => {
    User.findById(req.params.user_id)
    .then(user => {
        res.send({user})
    })
    .catch(err => {
        return next({
          status: 400,
          msg: 'Bad Request'
        });
      
      });
   
})

exports.getByUsername = ((req, res, next) => {
    User.findOne({username: req.params.username})
      .then(user => {
          if(user === null) return  next({ status: 404, msg: 'User not Found'})
          res.status(200).send({user})
      })
      .catch(err => {
        next({
          status: 404,
          msg: 'User not Found'
        })
      
      })
    
})


exports.getAllUsers = ((req, res, next) => {
  
  return User.find()
    .then(users => { console.log(users)
      res.send({ users });
    })
    .catch(err => {
      next({
        status: 404,
        msg: 'User not Found'
      })
    
    })
})