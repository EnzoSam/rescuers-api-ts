import express from 'express';
import authenticateToken from '../middlewares/auth.middleware';
import { ICaregiverCalificationRepository } from '../interfaces/repositories/users/iCaregiverCalificationRepository.interface';
import { CaregiverCalificationRepository } from '../repositories/users/caregiverCalification.repository';
import CaregiverCalificationService from '../services/user/caregiverCalification.service';
import CaregiverCalificationController from '../controllers/user/caregiverCalification.controller';

const router = express.Router();

const repository:ICaregiverCalificationRepository = new CaregiverCalificationRepository('caregiversCalifications');
const service:CaregiverCalificationService = new CaregiverCalificationService(repository);
const controller:CaregiverCalificationController = new CaregiverCalificationController(service);


router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.get('/caregiver/:caregiverId/:lasts', controller.getByCaregiver.bind(controller));

router.post('/',authenticateToken, controller.create.bind(controller));
router.delete('/:id',authenticateToken, controller.delete.bind(controller));
router.put('/',authenticateToken, controller.update.bind(controller));



export default router;
