const app = require('../app')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { seedDB } = require('../seed/seed.js')
const testData = require('../seed/testData')
const request = require('supertest')(app)
const rawData = require('../seed/seed')



describe('NC_news', () => {
 
let articles, comments, topics, users; 
beforeEach(() => {
   return mongoose.connection.dropDatabase()
     .then(() => {
       return seedDB()
         .then((docs) => {
             
           comments = docs[0]
           articles = docs[3]
           users = docs[1]
           topics = docs[2] 
         })
     })
 })
after(() => {
    return mongoose.disconnect(); 
  })

describe('/topics', () => {
   it('GET returns 200 for /topics and all topics', () => {
     return request
       .get('/api/topics')
       .expect(200)
       .then(response => {
         expect(response.body).to.be.an('object')
         expect(response.body.topics.length).to.equal(2)
        })
    })
   it('GET returns 200 for /:topic_id/articles and an object of all articles related to that topic', () => {
    return request
      .get('/api/topics/mitch/articles')
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('object')
        expect(response.body.articles.length).to.be.eql(2)
        expect(response.body.articles[0].belongs_to).to.be.eql('mitch')
      });
    })
    it('POST returns 201 for /:topic_id/articles and add a new article to a topic and an object of all articles related to that topic', () => {
        return request
        .post('/api/topics/cats/articles')
        .send(
          { title: 'test', body: "test article", created_by: users[0]._id }
        )
        .expect(201)
        .then(response => {
          expect(response.body).to.be.an('object');
          expect(response.body.article.title).to.equal("test")
        })
    })
})
describe('/articles', () => {
    it('GET returns 200 for /articles and all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an('object')
          expect(response.body.formatedArticles.length).to.equal(4)
         })
    })
    it('GET returns 200 for /articles/:article_id and an individual article', () => {
        const articleId = articles[0]._id;
        return request
          .get(`/api/articles/${articleId}`)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object')
            expect(Object.keys(response.body).length).to.equal(1)
            expect(response.body.formatedArticle._id).to.equal(`${articleId}`)
          });
    });
    it('GET returns 200 for /articles/:article_id/comments and all the comments for a individual article', () => {
        const articleId = articles[0]._id
        return request
          .get(`/api/articles/${articleId}/comments`)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object')
            expect(Object.keys(response.body).length).to.equal(1)
          });
    });
    it('POST returns 201 for /articles/:articleid/comments and add a new article to an article ', () => {
        const articleId = articles[0]._id
        const user = users[0]._id
            return request
              .post(`/api/articles/${articleId}/comments`)
              .send({body: "Test", belongs_to: articleId, created_by: user})
              .expect(201)
              .then(response => {
                expect(response.body).to.be.an('object');
                expect(response.body.comment.body).to.be.equal("Test")
                
            })
    })
    it('PUT return 200 for /articles/:articleid?vote=up and increases the number of votes an article has.', () => {
        const articleId = articles[0]._id
        const actualVotes = articles[0].votes
        return request
          .put(`/api/articles/${articleId}?vote=up`)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object')
            expect(response.body.article.votes).to.equal(actualVotes + 1)
        });
    });
    it('PUT return 200 for /articles/:articleid?vote=down and decreases the number of votes an article has.', () => {
        const articleId = articles[0]._id
        const actualVotes = articles[0].votes
        return request
          .put(`/api/articles/${articleId}?vote=down`)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object')
            expect(response.body.article.votes).to.equal(actualVotes -1)
        });
    });
  
})
describe('/comments', () => {
    it('PUT return 200 for /comments/:comment_id?vote=up and increases the number of votes an article has.', () => {
        const commentId = comments[0]._id
        const actualVotes = comments[0].votes
        return request
          .put(`/api/comments/${commentId}?vote=up`)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object')
            expect(response.body.comment.votes).to.equal(actualVotes + 1)
        });
    });
    it('PUT return 200 for /comments/:comment_id?vote=down and decreases the number of votes an article has.', () => {
        const commentId = comments[0]._id
        const actualVotes = comments[0].votes
        return request
          .put(`/api/comments/${commentId}?vote=down`)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object')
            expect(response.body.comment.votes).to.equal(actualVotes - 1)
        });
    });
    it('DELETE return 200 for /comments/:comment_id and remove a new comment.', () => {
        const commentId = comments[0]._id;      
        return request
          .delete(`/api/comments/${commentId}`)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object')
            expect(Object.keys(response.body).length).to.equal(1)
        })

    })

 
})
describe('/users', () => {
    it('GET returns 200 for /users/:username and a JSON object with the profile data for the specified user.', () => {
        const username = users[0].username;
        return request
          .get(`/api/users/${username}`)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('object')
            expect(Object.keys(response.body.user).length).to.equal(5)
            expect(response.body.user.username).to.equal(username)
          });
    });

 
})
describe('/topics ***ERROR HANDLING***', () => {
    it('GET returns 404 for /topics and an invalid topic', () => {
      return request
        .get('/api/topics/travel')
        .expect(404)
        .then(response => {
          expect(response.status).to.be.equal(404)
          expect(response.body).to.be.eql({ msg: 'Page not found' })
        })
    })
    it('GET returns 404 for /:topic_id/articles for an invalid path', () => {
     return request
       .get('/api/topics/cats/artles')
       .expect(404)
       .then(response => {
        expect(response.status).to.be.equal(404)
        expect(response.body).to.be.eql({ msg: 'Page not found' })
       });
     })
     it('POST returns 400 for /:topic_id/articles and add a new article to a topic and an object of all articles related to that topic', () => {
         return request
         .post('/api/topics/cats/articles')
         .send(
            {titdddle: 'test', bodddddy: "test article"}
         )
         .expect(400)
         .then(response => {
          expect(response.status).to.be.equal(400)
          expect(response.body).to.be.eql({ msg: 'Bad Request' })
         })
     })
})
describe('/articles', () => {
    it('GET returns 404 for /articles with wrong path', () => {
      return request
        .get('/api/artles')
        .expect(404)
        .then(response => {
          expect(response.status).to.be.equal(404)
          expect(response.body).to.be.eql({ msg: 'Page not found' })
         })
    })
    it('GET returns 400 for /articles/:article_id with an invalid Id', () => {
        return request
          .get('/api/articles/039382721')
          .expect(400)
          .then(response => {
            expect(response.status).to.be.equal(400)
          expect(response.body).to.be.eql({ msg: 'Id not Found' })
          });
    });
    it('GET returns 400 for /articles/:article_id/comments with a wrong path', () => {
        return request
          .get('/api/articles/039382721/comments')
          .expect(400)
          .then(response => {
           expect(response.status).to.be.equal(400)
           expect(response.body).to.be.eql({ msg: 'Id not Found' })
          });
    });
    it('POST returns 400 for /articles/:articleid/comments posting a comment with a wrong format or invalid data ', () => {
        const articleId = articles[0]._id
        const user = users[0]._id
            return request
              .post(`/api/articles/${articleId}/comments`)
              .send({boy: "Test", begs_to: articleId, created_by: user})
              .expect(400)
              .then(response => {
                expect(response.status).to.be.equal(400)
                expect(response.body).to.be.eql({ msg: 'Wrong Format' })
            })
    })
    it('PUT return 400 for /articles/:articleid?vote= voting with a invalid input', () => {
        const articleId = articles[0]._id
        const actualVotes = articles[0].votes
        return request
          .put(`/api/articles/${articleId}?vote=bla`)
          .expect(400)
          .then(response => {
            expect(response.status).to.be.equal(400)
            expect(response.body).to.be.eql({ msg: 'Invalid input, use "up" to add a vote or "down" to decrease it.' })
        });
    });
  
})
describe('/comments', () => {
    it('GET returns 400 for /comments/:comments_id with an invalid Id', () => {
        return request
          .get('/api/comments/039382721')
          .expect(400)
          .then(response => {
            expect(response.status).to.be.equal(400)
          expect(response.body).to.be.eql({ msg: 'Id not Found' })
          })
    })

    it('PUT return 400 for /comments/:comment_id?vote= voting with a invalid input', () => {
        const commentId = comments[0]._id
        const actualVotes = comments[0].votes
        return request
          .put(`/api/comments/${commentId}?vote=bla`)
          .expect(400)
          .then(response => {
            expect(response.status).to.be.equal(400)
            expect(response.body).to.be.eql({ msg: 'Invalid input, use "up" to add a vote or "down" to decrease it.' })
        });
    });
    it('DELETE return 400 for /comments/:comment_id with an invalid id when making a delete request.', () => {
        return request
          .delete('/api/comments/5a7da24fef50584178e3a4')
          .expect(400)
          .then(res => {
            expect(res.status).to.equal(400)    
            expect(res.body).to.eql({ msg:'Id not found'})
          })
    })
})
describe('/users', () => {
    
    it('GET will return a 404 error for an invalid user', () => {
        const username = users[0].username;
        return request
          .get(`/api/users/vitor`)
          .expect(404)
          .then(response => {
            expect(response.status).to.equal(404)    
            expect(response.body).to.eql({ msg:'User not Found'})
          });
    })


})
})