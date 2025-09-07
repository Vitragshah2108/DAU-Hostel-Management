const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { getUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/user.controller');

router.use(protect, authorize('admin'));
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
