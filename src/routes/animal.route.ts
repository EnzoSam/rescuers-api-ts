// animalRoutes.ts

import express from 'express';
import AnimalController from '../controllers/animal/animal.controller';
import authenticateToken from '../middlewares/auth.middleware';
import multer from 'multer';

const router = express.Router();


// Configuración de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authenticateToken);
router.get('/', AnimalController.getAllAnimals);
router.post('/', AnimalController.createAnimal);
router.put('/:animalId', AnimalController.updateAnimal);
router.delete('/:animalId', AnimalController.deleteAnimal);
router.post('/search', AnimalController.getAnimalsByAttributes);
router.post('/:animalId/upload-images', upload.array('images', 5), AnimalController.uploadImages);


export default router;
