import express from 'express';
import ZoneController from '../controllers/general/zone.controller';
import authenticateToken from '../middlewares/auth.middleware';
import multer from 'multer';
import { ZoneRepository } from '../repositories/general/zone.repository';
import ZoneService from '../services/general/zone.service';

const router = express.Router();

// Configuración de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const repository = new ZoneRepository('zones');
const service = new ZoneService(repository);
const controller = new ZoneController(service);

router.use(authenticateToken);
router.get('/', controller.getAll.bind(controller));
router.post('/', controller.create.bind(controller));
//router.put('/:id', controller.get.bind(controller));
router.delete('/:id', controller.delete.bind(controller));


export default router;
