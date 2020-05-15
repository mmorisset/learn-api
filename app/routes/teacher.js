import express from 'express';
import * as teacherController from '../controllers/teacher';

import '../middlewares/teacher-passport';

const router  = express.Router();

router.get('/', teacherController.index);
router.get('/:id', teacherController.get);
router.post('/login', teacherController.login);
router.post('/register', teacherController.register);

export default router;
