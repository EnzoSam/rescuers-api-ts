import express from 'express';
import UserController from '../controllers/user/user.controller';
import authenticateToken from '../middlewares/auth.middleware';
import { UserRepository } from '../repositories/users/user.repository';
import UserService from '../services/user/user.service';

const router = express.Router();

const repository = new UserRepository('users');
const service = new UserService(repository);
const controller = new UserController(service);


router.post('/no-auth/register', controller.registerUser.bind(controller));
router.post('/no-auth/confirm-email', controller.confirmEmail.bind(controller));
router.post('/no-auth/login', controller.loginUser.bind(controller));
router.post('/no-auth/request-reset-password', controller.requestResetPassword.bind(controller));
router.post('/no-auth/change-password', controller.changePassword.bind(controller));

router.use(authenticateToken);
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

//router.use(authenticateToken);

export default router;
