const express = require('express');
const mongoose = require('mongoose')
const Todos = require('./models/todo')
const todoRouter = require('./routes/todos')
const methodOverride = require('method-override')
const app = express();

mongoose.connect('mongodb://localhost/todo', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine' , 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.get('/', async (req, res) => {
    const todos = await Todos.find().sort({ created_at : 'desc'})
    res.render('todos/index', { todo : todos });
})

app.use('/todos', todoRouter)

app.listen(8000)

