import express from 'express';
import PostController from '../controllers/animal/post.controller';
import authenticateToken from '../middlewares/auth.middleware';
import PostService from '../services/animal/post.service';
import AnimalService from '../services/animal/animal.service';
import { IAnimalRepository } from '../interfaces/repositories/rescuers/iAnimalRepository.interface';
import { AnimalRepository } from '../repositories/rescuers/animal.repository';
import AtributeController from '../controllers/general/atribute.controller';
import AtributeService from '../services/general/atribute.service';
import { IAtributeRepository } from '../interfaces/repositories/general/iAtributeRepository.interface';
import { AtributeRepository } from '../repositories/general/atribute.repository';
import { CollectionsNames } from '../constants/database/database.constants';

const router = express.Router();

const repository:IAnimalRepository = new AnimalRepository(CollectionsNames.animals);
const animalService:AnimalService = new AnimalService(repository);
const atributeRepository:IAtributeRepository = new AtributeRepository(CollectionsNames.atributes);
const atributeService:AtributeService = new AtributeService(atributeRepository)
const service:PostService = new PostService(animalService, atributeService);
const controller = new PostController(service);

router.use(authenticateToken);
router.post('/', controller.filter.bind(controller));

export default router;
