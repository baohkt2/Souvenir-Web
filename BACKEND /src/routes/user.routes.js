// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refreshUser, logoutUser, changePassword, updateUserProfile, getUserProfileById, deleteUserById} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { getUserProfile,getAllUsers, createManager } = require('../controllers/userController');
const { adminRole } = require('../middlewares/role');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile/:id').get(protect, adminRole, getUserProfileById);
router.route('/profile').put(protect, updateUserProfile);
router.route('/refresh').get(protect, refreshUser);
router.route('/logout').get(protect, logoutUser);
router.route('/changePassword').put(protect, changePassword);
router.route('/userlist').get(protect, adminRole, getAllUsers);
router.route('/createManager').post(protect, adminRole, createManager); 
router.route('/:id').delete(protect, adminRole, deleteUserById);
module.exports = router;
