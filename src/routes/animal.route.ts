import express from 'express';
import AnimalController from '../controllers/animal/animal.controller';
import authenticateToken from '../middlewares/auth.middleware';
import multer from 'multer';
import { IFileUploader } from '../interfaces/services/IFileUploader.interface';
import { FirestoreUploader } from '../services/base/firestoreUploader.service';
import { IAnimalRepository } from '../interfaces/repositories/rescuers/iAnimalRepository.interface';
import { AnimalRepository } from '../repositories/rescuers/animal.repository';
import AnimalService from '../services/animal/animal.service';

const router = express.Router();


// Configuración de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploader:IFileUploader = new FirestoreUploader();
const repository:IAnimalRepository = new AnimalRepository('animals');
const service:AnimalService = new AnimalService(repository);
const controller:AnimalController = new AnimalController(service,uploader);

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.get.bind(controller));

router.post('/',authenticateToken, controller.create.bind(controller));
router.delete('/:id',authenticateToken, controller.delete.bind(controller));
router.put('/',authenticateToken, controller.update.bind(controller));
router.post('/uploads',authenticateToken, upload.single('file'), controller.uploadImages.bind(controller));

export default router;
