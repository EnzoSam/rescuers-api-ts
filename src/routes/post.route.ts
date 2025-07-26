import express from 'express';
import PostController from '../controllers/animal/post.controller';
import authenticateToken from '../middlewares/auth.middleware';
import PostService from '../services/animal/post.service';
import AnimalService from '../services/animal/animal.service';
import { IAnimalRepository } from '../interfaces/repositories/rescuers/iAnimalRepository.interface';
import { AnimalRepository } from '../repositories/rescuers/animal.repository';
import AtributeService from '../services/general/atribute.service';
import { IAtributeRepository } from '../interfaces/repositories/general/iAtributeRepository.interface';
import { AtributeRepository } from '../repositories/general/atribute.repository';
import { CollectionsNames } from '../constants/database/database.constants';
import validateRole from '../middlewares/role.middleware';
import { ROLES } from '../constants/auth/roles.constant';
import { IUserRepository } from '../interfaces/repositories/users/iUserRepository.interface';
import { UserRepository } from '../repositories/users/user.repository';

const router = express.Router();

const repository:IAnimalRepository = new AnimalRepository(CollectionsNames.animals);
const userRepository:IUserRepository = new UserRepository('users');
const animalService:AnimalService = new AnimalService(repository,userRepository);
const atributeRepository:IAtributeRepository = new AtributeRepository(CollectionsNames.atributes);
const atributeService:AtributeService = new AtributeService(atributeRepository)
const service:PostService = new PostService(animalService, atributeService);
const controller = new PostController(service);

router.post('/', controller.filter.bind(controller));

router.put('/torevision',
    authenticateToken,
    validateRole([ROLES.ADMIN]), 
    controller.changeStateRevision.bind(controller));

router.put('/topublished',
    authenticateToken,
    validateRole([ROLES.ADMIN]), 
    controller.changeStatePublished.bind(controller));

router.put('/toreject',
    authenticateToken,
    validateRole([ROLES.ADMIN]),
    authenticateToken, 
    controller.changeStateRejected.bind(controller));
    
router.put('/toarchive',
    authenticateToken,
    validateRole([ROLES.ADMIN]),
    authenticateToken,
    controller.changeStateArchived.bind(controller));

router.put('/todraft',
    authenticateToken,
    validateRole([ROLES.ADMIN]),
    authenticateToken,
    controller.changeStateDraft.bind(controller));

export default router;
