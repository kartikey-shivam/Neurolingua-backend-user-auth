var mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      require: [true, 'Please enter your password'],
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    fullName: String,
    googleId: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    onType: {
      type: Schema.Types.ObjectId,
      refPath: 'roleModel',
    },
    roleModel: {
      type: String,
      enum: ['Teacher', 'Student'],
    },
    hasOnBoarding: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
UserSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.changedPasswordAt) {
    const changePassword = parseInt(this.password.getTime() / 1000, 10);
    return changePassword > JWTTimeStamp;
  }
  return false;
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
module.exports = mongoose.model('User', UserSchema, 'User');
