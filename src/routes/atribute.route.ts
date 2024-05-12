import express from 'express';
import AtributeController from '../controllers/general/atribute.controller';
import authenticateToken from '../middlewares/auth.middleware';
import multer from 'multer';

const router = express.Router();


// Configuración de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authenticateToken);
router.get('/', AtributeController.getAll);
router.post('/', AtributeController.create);
router.put('/:id', AtributeController.update);
router.delete('/:id', AtributeController.delete);
router.post('/:id/upload-images', upload.array('images', 5), AtributeController.uploadImages);


export default router;
