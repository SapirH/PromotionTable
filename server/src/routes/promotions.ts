import { Router } from 'express';
import { promotions } from '../controllers';

const router = Router();

router.get('/', promotions.getAllPromotions);
router.get('/page/:rangeStart', promotions.getPromotionsByPage);
router.post('/duplicate', promotions.duplicatePromotion);
router.put('/:id', promotions.updatePromotion);
router.delete('/:id', promotions.deletePromotion);
router.post('/mock', promotions.createMockPromotions);

export default router;
