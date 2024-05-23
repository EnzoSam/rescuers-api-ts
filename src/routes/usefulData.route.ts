import express from 'express';
import AtributeController from '../controllers/general/atribute.controller';
import authenticateToken from '../middlewares/auth.middleware';
import multer from 'multer';
import { FirestoreUploader } from '../services/base/firestoreUploader.service';
import { IFileUploader } from '../interfaces/services/IFileUploader.interface';
import AtributeService from '../services/general/atribute.service';
import { IAtributeRepository } from '../interfaces/repositories/general/iAtributeRepository.interface';
import { AtributeRepository } from '../repositories/general/atribute.repository';
import { IUsefulDataRepository } from '../interfaces/repositories/general/iusefulData.interface';
import { UsefullRepository } from '../repositories/general/usefulData.repository';
import UsefulDataService from '../services/general/usefullData.service';
import UsefulDataController from '../controllers/general/usefulData.controller';

const router = express.Router();

const repository:IUsefulDataRepository = new UsefullRepository('usefulData');
const service:UsefulDataService = new UsefulDataService(repository);
const controller:UsefulDataController = new UsefulDataController(service);

router.use(authenticateToken);
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.post('/', controller.create.bind(controller));
router.delete('/:id', controller.delete.bind(controller));
router.put('/', controller.update.bind(controller));


export default router;
