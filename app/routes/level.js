import express from 'express';
import * as levelController from '../controllers/level';

const router  = express.Router();

router.get('/', levelController.index);

export default router;
