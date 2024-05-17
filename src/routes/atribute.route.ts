import express from 'express';
import AtributeController from '../controllers/general/atribute.controller';
import authenticateToken from '../middlewares/auth.middleware';
import multer from 'multer';
import { FirestoreUploader } from '../services/base/firestoreUploader.service';
import { IFileUploader } from '../interfaces/services/IFileUploader.interface';

const router = express.Router();


// Configuración de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploader:IFileUploader = new FirestoreUploader();
const controller:AtributeController = new AtributeController(uploader);

router.use(authenticateToken);
router.get('/', controller.getAll.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));
router.post('/uploads', upload.single('file'), controller.uploadImages.bind(controller));


export default router;
