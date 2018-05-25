if(process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'dev'

const app = require('express')()
const { DB_URL } = process.env.NODE_ENV === "production" ? 
process.env : require('./config')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')


mongoose.Promise = Promise;

mongoose.connect(DB_URL).then(() => {
    console.log(`connected to the database...${DB_URL}`)
})

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use('/api', router)

app.get('/', (req, res, next) => {
    res.render('pages/index')
})

app.get('/api', (req, res, next) => {
    res.render('pages/index')
  })

app.use('/*', (req, res, next) => {
    next({ status:404, msg: 'Page not found'})
})


app.use((err, req, res, next) =>{

    if(err.status === 404) {
        res.status(404).send({msg: err.msg});
    } 
    else if (err.status === 400) {
        res.status(400).send({msg: err.msg})

    }
    else {
        res.status(500).send({msg: 'Internal server error'});
    }
})


module.exports = app;