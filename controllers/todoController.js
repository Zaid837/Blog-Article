const Todo = require('../models/todo')

const todo_new_index = (req, res) => {
    res.render('todos/new', {todo: new Todo()})
}

const todo_edit_index =  async (req , res) => {
    const todo = await Todo.findById(req.params.id)
    res.render('todos/edit', {todo: todo})
}

const todo_details = async (req, res) => {
    const todo = await Todo.findOne({ slug: req.params.slug })
    if(todo == null) res.redirect('/')
    res.render('todos/show', { todo : todo })
}

const todo_delete = async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id)
    res.redirect('/')
}

const saveAndRedirect = path => {
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

module.exports = {
    todo_new_index,
    todo_edit_index,
    todo_details,
    todo_delete, 
    saveAndRedirect
}