const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')




const indexRouter = require('./routes/index')
const proudectRouter = require('./routes/addproudect')




app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:Joodm%401989@cluster0.bdxof.mongodb.net/insearchoDB?retryWrites=true&w=majority',  { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection
db.on('err', err => console.error(err))
db.once('open', ()=> console.log("Connected to MongoDB"))



app.use('/', indexRouter)
app.use('/addproudect', proudectRouter)




app.listen(process.env.PORT || 4000)