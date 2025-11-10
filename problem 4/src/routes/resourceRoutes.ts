import { Router } from 'express';
import { ResourceController } from '../controllers/ResourceController';

const router = Router();

router.post('/resources', ResourceController.create);
router.get('/resources', ResourceController.list);
router.get('/resources/:id', ResourceController.getById);
router.put('/resources/:id', ResourceController.update);
router.delete('/resources/:id', ResourceController.delete);

export default router;

