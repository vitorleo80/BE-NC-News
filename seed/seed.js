const mongoose = require('mongoose');
mongoose.Promise = Promise;
const {Article, ComMent, Topic, User} = require('../models')
const testData = require('./testData')
const devData = require('./devData')
const {formatArticleData, createUserRef, formatCommentData} = require('../utils')


let rawData = process.env.NODE_ENV === 'test' ? testData : devData;

exports.seedDB = () => {
    return Promise.all([Topic.insertMany(rawData.topicData),
        User.insertMany(rawData.userData)])
        .then(([topicDocs, userDocs]) => {
            const userRef = createUserRef(rawData.userData, userDocs);
            return Promise.all([Article.insertMany(formatArticleData(rawData.articleData, topicDocs, userRef)), userDocs])
            })
            .then(([articleDocs, userDocs]) => {
            return ComMent.insertMany(formatCommentData(rawData.commentData, articleDocs, userDocs))
            })
            .then(commentDocs => console.log('Database seeded with sucess'))
      
}

