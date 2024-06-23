import express from 'express';
import { CaregiverRepository } from '../repositories/users/caregiver.repository';
import { ICaregiverRepository } from '../interfaces/repositories/users/iCaregiverRepository.interface';
import CaregiverService from '../services/user/caregiver.service';
import CaregiverController from '../controllers/user/caregiver.controller';
import authenticateToken from '../middlewares/auth.middleware';
import { IUserRepository } from '../interfaces/repositories/users/iUserRepository.interface';
import { UserRepository } from '../repositories/users/user.repository';
import { CollectionsNames } from '../constants/database/database.constants';

const router = express.Router();

const repository:ICaregiverRepository = new CaregiverRepository(CollectionsNames.caregivers);
const userRepo:IUserRepository = new UserRepository(CollectionsNames.users);
const service:CaregiverService = new CaregiverService(repository, userRepo);
const controller:CaregiverController = new CaregiverController(service);


router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.get('/byuseremail/:email', controller.byuseremail.bind(controller));

router.post('/',authenticateToken, controller.create.bind(controller));
router.delete('/:id',authenticateToken, controller.delete.bind(controller));
router.put('/',authenticateToken, controller.update.bind(controller));



export default router;
