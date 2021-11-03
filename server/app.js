const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path: './config.env' });
require('./db/connectdb');

const {Admin , User , City , Place , Food} = require('./model/schema');

app.use(express.json());

app.use(require('./router/user-auth'));

app.get('/',(req,res)=>{
    res.send(`helloo`);
})

app.get('/admin',(req,res)=>{
    res.send(`Admin Page`);
})

app.listen(5000 , ()=>{
    console.log("running");
})