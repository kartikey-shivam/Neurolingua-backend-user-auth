const catchAsync = require('../utils/catchAsync');
const crypto = require('crypto');
const AppError = require('../utils/appError');
const User = require('../model/userModel');
const createSendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

//Register User
exports.registerUser = catchAsync(async (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  const { fullName, email, password, googleId, roleModel } = req.body;
  const user = await User.create({
    email,
    password,
    fullName,
    googleId,
    roleModel,
  });
  console.log(user);
  createSendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email or password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  const isPasswordValid = user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new AppError('Invalid email or password', 401));
  }
  createSendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

//Get User details
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single User -- Admin
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User does not exist'), 400);
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update User Profile -- Admin
exports.updateUser = catchAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

//delete User --Admin
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User does not exist'), 400);
  }
  // remove avatar
  await user.remove();
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});
