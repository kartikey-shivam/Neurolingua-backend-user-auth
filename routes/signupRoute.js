const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getAllUsers,
  getSingleUser,
  deleteUser,
  socialRoleSelection,
} = require('../controller/signupController');
const {
  isAuthenticated,
  isAuthorized,
} = require('../controller/authController');
const router = require('express').Router();
// const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticated, getUserDetails);
//admin routes
router
  .route('/admin/users')
  .get(isAuthenticated, isAuthorized('Admin'), getAllUsers);

router
  .route('/admin/user/:id')
  .get(isAuthenticated, isAuthorized('Admin'), getSingleUser)
  .delete(isAuthenticated, isAuthorized('Admin'), deleteUser);
module.exports = router;
