import { Router } from 'express';
import promotions from './promotions';

const router = Router();

router.use('/', promotions);

export default router;
