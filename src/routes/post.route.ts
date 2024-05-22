import express from 'express';
import PostController from '../controllers/animal/post.controller';
import authenticateToken from '../middlewares/auth.middleware';
import PostService from '../services/animal/post.service';
import AnimalService from '../services/animal/animal.service';
import { IAnimalRepository } from '../interfaces/repositories/rescuers/iAnimalRepository.interface';
import { AnimalRepository } from '../repositories/rescuers/animal.repository';

const router = express.Router();

const repository:IAnimalRepository = new AnimalRepository('animals');
const animalService:AnimalService = new AnimalService(repository);
const service:PostService = new PostService(animalService);
const controller = new PostController(service);

router.use(authenticateToken);
router.post('/', controller.filter.bind(controller));

export default router;
