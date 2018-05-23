process.env.NODE_ENV = !process.env.NODE_ENV ? 'dev' : 'test'
const app = require('express')();
const { DB_URL } = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router =require('./router');

mongoose.Promise = Promise;

mongoose.connect(DB_URL).then(() => {
    console.log(`connected to the database...${DB_URL}`);
})

app.use(bodyParser.json());
app.get('/', (req, res, next) => {
    res.send('Hello')
})

app.use('/api', router);



module.exports = app;