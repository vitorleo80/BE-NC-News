process.env.NODE_ENV = !process.env.NODE_ENV ? 'dev' : 'test'

const app = require('express')();
const { DB_URL } = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router =require('./router');


mongoose.Promise = Promise;

mongoose.connect(DB_URL).then(() => {
    console.log(`connected to the database...${DB_URL}`)
})

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use('/api', router);

app.get('/', (req, res, next) => {
    res.send('Hello')
})

app.get('/api', (req, res, next) => {
    res.render('pages/index');
  });

app.use('/*', (req, res, next) => {
    next({ status:404, msg: 'Page not found'});
});


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