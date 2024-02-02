const express = require('express')
const path = require('path')
const Arouter = express.Router();

const ApiController = require('../controller/apiConroller')

Arouter.use(express.json());
Arouter.use(express.urlencoded({extended:true}));
Arouter.use(express.static('public'));


Arouter.post('/Regis',ApiController.registration)
Arouter.post('/login',ApiController.UserLogin)
Arouter.get('/post',ApiController.post)
Arouter.post('/contact',ApiController.contactPost)
Arouter.get('/about',ApiController.about)


module.exports= Arouter;