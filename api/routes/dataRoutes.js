import express from 'express';
import { getData } from '../Controllers/dataController.js';

const router = express.Router();

router.route('/').get(getData);

export default router;