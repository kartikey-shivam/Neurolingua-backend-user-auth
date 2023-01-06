const Course = require('../model/courseModel');
const catchAsync = require('../utils/catchAsync');
exports.createCourse = catchAsync(async (req, res) => {
  const {
    userId,
    title,
    language,
    course,
    program,
    price,
    price1,
    price2,
    coupons,
    description,
    reviews,
    courseImage,
  } = req.body;
  const courses = await Course.create({
    userId,
    title,
    language,
    course,
    program,
    price,
    price1,
    price2,
    coupons,
    description,
    reviews,
    courseImage,
  });

  res.status(201).json(courses);
});
