const express = require('express')
const todoController = require('../controllers/todoController')
const todMiddleware = require('../middleware/todoMiddleware')
const router = express.Router()


router.get('/new' , todoController.todo_new_index)
router.get('/edit/:id' , todoController.todo_edit_index)
router.get('/:slug', todoController.todo_details)
router.post('/', todMiddleware.todo_create_post, todoController.saveAndRedirect('new'))
router.put('/:id', todMiddleware.todo_edit_put, todoController.saveAndRedirect('edit'))
router.delete('/:id', todoController.todo_delete)



module.exports = router