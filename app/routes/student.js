import express from 'express';
import * as studentController from '../controllers/student';

const router  = express.Router();

router.get('/:id/exercises/:exerciceId/grade', studentController.exerciseGrade);

export default router;
