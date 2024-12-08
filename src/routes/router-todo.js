const router = require('express').Router();
const todoController = require('../controllers').todo;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, todoController.getTodoList);
router.get('/add', verifyUser.isLogin, todoController.formTodo);
router.post('/save', verifyUser.isLogin, todoController.saveTodo);
router.get('/edit/:id', verifyUser.isLogin, todoController.editTodo);
router.post('/update/:id', verifyUser.isLogin, todoController.updateTodo);
router.get('/delete/:id', verifyUser.isLogin, todoController.deleteTodo);

module.exports = router;
