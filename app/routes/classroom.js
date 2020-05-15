import express from 'express';
import * as classroomController from '../controllers/classroom';

const router  = express.Router();

router.get('/:code', classroomController.getByCode);

export default router;
