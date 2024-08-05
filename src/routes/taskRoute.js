const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
