const express = require('express');
const Router =  express.Router()
const Controller = require('../controller/adminController')
const adminAuth = require('../middleware/adminAuth')

Router.get('/register',Controller.adRegister)
Router.post('/addAdmin',Controller.adminCreate)

Router.get('/',Controller.adLogin)
Router.post('/LogIn',Controller.logCreate)

Router.get('/post',Controller.dashbord)
Router.post('/post/postCreate',Controller.postCreate)

Router.get('/about',Controller.about)
Router.post('/about/addAbout',Controller.aboutCreate)

Router.get('/user',Controller.user)

Router.get('/contact',Controller.contact)

Router.get('/delete/:id',Controller.delete)
Router.get('/udelete/:id',Controller.userDelete)

Router.get('/AdLogout',Controller.Logout)

module.exports = Router;