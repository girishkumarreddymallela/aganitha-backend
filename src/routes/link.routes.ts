import { Router } from 'express';
import * as linkController from '../controllers/link.controller';

const router: Router = Router();

router.get('/healthz', linkController.healthCheck);
router.post('/api/links', linkController.createLink);
router.get('/api/links', linkController.getLinks);
router.get('/api/links/:code', linkController.getLinkStats);
router.delete('/api/links/:code', linkController.deleteLink);
router.get('/:code', linkController.redirectLink);

export default router;
