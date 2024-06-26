import express from 'express';
import authenticateToken from '../middlewares/auth.middleware';
import { IUsefulDataRepository } from '../interfaces/repositories/general/iusefulData.interface';
import { UsefullRepository } from '../repositories/general/usefulData.repository';
import UsefulDataService from '../services/general/usefullData.service';
import UsefulDataController from '../controllers/general/usefulData.controller';
import validateRole from '../middlewares/role.middleware';
import { ROLES } from '../constants/auth/roles.constant';

const router = express.Router();

const repository:IUsefulDataRepository = new UsefullRepository('usefulData');
const service:UsefulDataService = new UsefulDataService(repository);
const controller:UsefulDataController = new UsefulDataController(service);

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.get.bind(controller));

router.post('/',authenticateToken, controller.create.bind(controller));
router.delete('/:id', authenticateToken, controller.delete.bind(controller));
router.put('/', authenticateToken,validateRole([ROLES.SUPER_ADMIN]), controller.update.bind(controller));


export default router;
