import express from 'express';

import { getVikingProductions, getAxeProductions } from '../controllers/production.controller.js';

const router = express.Router();

router.get('/vikings', getVikingProductions);
router.get('/axes', getAxeProductions);

export default router;
