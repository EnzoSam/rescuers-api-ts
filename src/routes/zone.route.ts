import express from 'express';
import ZoneController from '../controllers/general/zone.controller';
import authenticateToken from '../middlewares/auth.middleware';
import { ZoneRepository } from '../repositories/general/zone.repository';
import ZoneService from '../services/general/zone.service';

const router = express.Router();

const repository = new ZoneRepository('zones');
const service = new ZoneService(repository);
const controller = new ZoneController(service);

router.get('/', controller.getAll.bind(controller));
router.get('/roots', controller.getRoots.bind(controller));
router.get('/childs/:parentId', controller.getByParent.bind(controller));
router.get('/:id', controller.get.bind(controller));

router.post('/',authenticateToken, controller.create.bind(controller));
router.put('/',authenticateToken, controller.update.bind(controller));
router.delete('/:id', authenticateToken,controller.delete.bind(controller));


export default router;
