import express from 'express';
import AtributeController from '../controllers/general/atribute.controller';
import authenticateToken from '../middlewares/auth.middleware';
import multer from 'multer';
import { FirestoreUploader } from '../services/base/firestoreUploader.service';
import { IFileUploader } from '../interfaces/services/IFileUploader.interface';
import AtributeService from '../services/general/atribute.service';
import { IAtributeRepository } from '../interfaces/repositories/general/iAtributeRepository.interface';
import { AtributeRepository } from '../repositories/general/atribute.repository';

const router = express.Router();


// Configuración de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const uploader:IFileUploader = new FirestoreUploader();
const repository:IAtributeRepository = new AtributeRepository('atributes');
const service:AtributeService = new AtributeService(repository);
const controller:AtributeController = new AtributeController(uploader, service);

router.get('/', controller.getAll.bind(controller));
router.get('/group/:group', controller.getByGroup.bind(controller));
router.get('/:id', controller.get.bind(controller));

router.post('/',authenticateToken, controller.create.bind(controller));
router.delete('/:id',authenticateToken, controller.delete.bind(controller));
router.put('/',authenticateToken, controller.update.bind(controller));
router.post('/uploads',authenticateToken, upload.single('file'), controller.uploadImages.bind(controller));


export default router;
