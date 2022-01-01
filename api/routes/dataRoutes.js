import express from 'express';
import { getData } from '../controllers/dataController.js';

const router = express.Router();

router.route('/').get(getData);

export default router;