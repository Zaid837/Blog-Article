const Todo = require('../models/todo')

const todo_create_post = async (req, res, next) => {
    req.todo = new Todo()
    next()
}

const todo_edit_put = async (req, res, next) => {
    req.todo = await Todo.findById(req.params.id)
    next()
}

module.exports = {
    todo_create_post,
    todo_edit_put
}