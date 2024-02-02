const express = require('express');
const ejs = require('ejs');
const cookieparser = require('cookie-parser');
const connectflash = require('connect-flash');
const exsession = require('express-session');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', 'views');

app.use(cookieparser());
app.use(connectflash());
app.use(express.static('public'))

app.use(cors())

const Router = require('./router/adminRoute');
app.use(Router)

const ApiRouter = require('./router/apiRoute')
app.use('/api',ApiRouter)

data = 'mongodb+srv://rajdasrd8346:6cW8Gp7Y2iueeWP2@cluster0.cwf3mun.mongodb.net/MarnProject';
const port = 5625
mongoose.connect(data, { useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    app.listen(port,()=>{
        console.log(`http://localhost:${port}`);
        console.log(`data base connected successfully`);
    })
}).catch(err=>{
    console.log(err);
})