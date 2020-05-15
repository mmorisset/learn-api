import express from 'express';
import * as exerciseController from '../controllers/exercise';

const router  = express.Router();

router.get('/:id', exerciseController.get);

export default router;
