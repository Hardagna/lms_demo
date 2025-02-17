import express from 'express';
import { isAuth, isAdmin } from '../middlewares/isAuth.js';
import { createCourse, addLecture, deleteLecture, deleteCourse } from '../controllers/admin.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/course/add', isAuth, isAdmin, upload, createCourse);
router.post('/course/:id/add-lecture', isAuth, isAdmin, upload, addLecture);
router.delete('/admin/delete-lecture/:id', isAuth, isAdmin, deleteLecture);
router.delete('/admin/delete-course/:id', isAuth, isAdmin, deleteCourse);

export default router;