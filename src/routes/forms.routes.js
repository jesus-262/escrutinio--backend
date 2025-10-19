import express from 'express';
import { saveForms, getForms,getZonasYPuestos } from '../controllers/forms.controller.js';

const router = express.Router();

router.post('/forms', saveForms);
router.post('/forms/post', getForms);
router.get('/formularios/zonasypuestos', getZonasYPuestos);
export default router;