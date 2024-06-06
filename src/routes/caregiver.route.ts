import express from 'express';
import { CaregiverRepository } from '../repositories/users/caregiver.repository';
import { ICaregiverRepository } from '../interfaces/repositories/users/iCaregiverRepository.interface';
import CaregiverService from '../services/user/caregiver.service';
import CaregiverController from '../controllers/user/caregiver.controller';
import authenticateToken from '../middlewares/auth.middleware';

const router = express.Router();

const repository:ICaregiverRepository = new CaregiverRepository('caregivers');
const service:CaregiverService = new CaregiverService(repository);
const controller:CaregiverController = new CaregiverController(service);


router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.get.bind(controller));

router.post('/',authenticateToken, controller.create.bind(controller));
router.delete('/:id',authenticateToken, controller.delete.bind(controller));
router.put('/',authenticateToken, controller.update.bind(controller));



export default router;
