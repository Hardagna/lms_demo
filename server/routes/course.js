import express from 'express';
import { getAllCourses, getCourse, getLectures, getLecture, getMyCourse } from '../controllers/course.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.get('/course/all', getAllCourses);
router.get('/course/:id', getCourse);
router.get('/course/lectures/:id', isAuth, getLectures);
router.get('/course/lecture/:id', isAuth, getLecture);
router.get('/course/my', isAuth, getMyCourse);

export default router;