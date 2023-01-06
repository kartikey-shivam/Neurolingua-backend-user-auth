const catchAsync = require('../utils/catchAsync');
const createSendToken = require('../utils/jwtToken');
const Teacher = require('./../model/teacherModel');
const User = require('./../model/userModel');

exports.teacherOnboarding = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    dob,
    mobileNumber,
    teacherType,
    motherTongue,
    languageSpeak,
    languageTeach,
    fromCountry,
    fromState,
    currentCountry,
    currentState,
    selfIntro,
    teacherProfilePic,
    videoURL,
    educationDetails,
    workExperience,
    rating,
    availability,
  } = req.body;
  const userId = req.user.id;
  const teacher = await Teacher.create({
    userId,
    firstName,
    lastName,
    gender,
    dob,
    mobileNumber,
    teacherType,
    motherTongue,
    languageSpeak,
    languageTeach,
    fromCountry,
    fromState,
    currentCountry,
    currentState,
    selfIntro,
    teacherProfilePic,
    videoURL,
    educationDetails,
    workExperience,
    rating,
    availability,
  });
  res.status(201).json({
    success: true,
    teacher,
  });
});

exports.getTeacherDetailByTId = catchAsync(async (req, res) => {
  const teacherDetails = await Teacher.findById(req.params.tid);
  res.status(200).json(teacherDetails);
});
exports.getTeacherDetailByUId = catchAsync(async (req, res) => {
  const teacherDetails = await Teacher.find({ userId: req.params.uid });
  res.status(200).json(teacherDetails);
});
