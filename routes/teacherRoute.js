const router = require('express').Router();

const { isAuthenticated } = require('../controller/authController');
const { createCourse } = require('../controller/courseController');
const {
  teacherOnboarding,
  getTeacherDetailByTId,
  getTeacherDetailByUId,
} = require('../controller/teacherController');

router.post('/onBoarding', isAuthenticated, teacherOnboarding);
router.get('/teacherId/:tid', isAuthenticated, getTeacherDetailByTId);
router.get('/userId/:uid', isAuthenticated, getTeacherDetailByUId);
router.post('/createCourse', createCourse);
module.exports = router;
