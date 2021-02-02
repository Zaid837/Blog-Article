const express = require('express')
const Todo = require('../models/todo')
const router = express.Router()

router.get('/new' , (req, res) => {
    res.render('todos/new', {todo: new Todo()})
})
router.get('/edit/:id' , async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    res.render('todos/edit', {todo: todo})
})

router.get('/:slug', async (req, res) => {
    const todo = await Todo.findOne({ slug: req.params.slug })
    if(todo == null) res.redirect('/')
    res.render('todos/show', { todo : todo })
})
router.post('/', async (req, res, next) => {
   req.todo = new Todo()
   next()    
}, saveAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.todo = await Todo.findById(req.params.id)
    next()
}, saveAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveAndRedirect(path) {
    return async (req, res) => {
        let todo = req.todo
        todo.title= req.body.title
        todo.description= req.body.description
        todo.markdown= req.body.markdown
            try {
                todo = await todo.save()
                res.redirect(`/todos/${todo.slug}`)
            }catch(e) {
                // console.log(e)
                res.render(`todos/${path}`, { todo : todo })
            }
    }
}

module.exports = router