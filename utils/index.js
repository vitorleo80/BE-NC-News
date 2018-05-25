const devData = require('../seed/devData')


exports.createUserRef = (data, docs) => {
    return data.reduce((acc, datum, index) => {
      acc[datum.username] = docs[index]._id;
      return acc;
    }, {});
}

exports.formatArticleData = (ArticleData, topicRef, userRef) => {
    return ArticleData.map(articleDatum => {
        let {topic: belongs_to, created_by, votes} = articleDatum;
        return {
            ...articleDatum,
            belongs_to,
            created_by: userRef[created_by],
            votes: 0
        }
    })
}

exports.formatCommentData = (commentData, articleData, userDocs) => {
    return commentData.map(commentDatum => {
        return {
            ...commentDatum,
            belongs_to: articleData.find(article => article.title === commentDatum.belongs_to)._id,
              created_by: userDocs.find(user => user.username === commentDatum.created_by)._id
        }
    })
}
