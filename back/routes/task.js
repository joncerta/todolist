const express = require('express');
const router = express.Router();

const {
  create,
  taskById,
  read,
  remove,
  update,
  list,
  listCategories,
  listBySearch,
  photo,
  listSearch
} = require('../controllers/task');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { taskValidator } = require('../validator/taskValidator');

// Routes
// Get a task
// Param task id
router.get('/task/:taskId', read);
// Create a task
// Param user id
router.post('/task/create/:userId', requireSignin, isAuth, create, taskValidator);
// Delete a task
// Params task id and user id
router.delete(
  '/task/:taskId/:userId',
  requireSignin,
  isAuth,
  remove
);
// Update a task
// Params task id and user id
router.put(
  '/task/:taskId/:userId',
  requireSignin,
  isAuth,
  update,
  taskValidator
);
// Get all tasks
router.get('/tasks', list);
// Get all tasks
router.get('/tasks/search', listSearch);
router.post('/tasks/by/search', listBySearch);
router.get('/tasks/categories', listCategories);
// Get a photo task
// Param task id
router.get('/task/photo/:taskId', photo);

router.param('userId', userById);
router.param('taskId', taskById);

module.exports = router;
