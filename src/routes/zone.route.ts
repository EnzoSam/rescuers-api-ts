import express from 'express';
import ZoneController from '../controllers/general/zone.controller';
import authenticateToken from '../middlewares/auth.middleware';
import multer from 'multer';

const router = express.Router();

// Configuración de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authenticateToken);
router.get('/', ZoneController.getAll);
router.post('/', ZoneController.create);
router.put('/:id', ZoneController.update);
router.delete('/:id', ZoneController.delete);


export default router;
