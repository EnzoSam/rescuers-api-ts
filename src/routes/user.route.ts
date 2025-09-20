import express from 'express';
import UserController from '../controllers/user/user.controller';
import authenticateToken from '../middlewares/auth.middleware';
import { UserRepository } from '../repositories/users/user.repository';
import UserService from '../services/user/user.service';
import { FirestoreUploader } from '../services/base/firestoreUploader.service';
import { IFileUploader } from '../interfaces/services/IFileUploader.interface';
import multer from 'multer';
import { RefreshTokenrRepository } from '../repositories/users/refresh-token.repository';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploader:IFileUploader = new FirestoreUploader();

const repository = new UserRepository('users');
const refreshTokenRepository = new RefreshTokenrRepository('refreshTokens');
const service = new UserService(repository, refreshTokenRepository);
const controller = new UserController(service,uploader);

router.post('/no-auth/register', controller.registerUser.bind(controller));
router.post('/no-auth/confirm-email', controller.confirmEmail.bind(controller));
router.post('/no-auth/login', controller.loginUser.bind(controller));
router.post('/no-auth/request-reset-password', controller.requestResetPassword.bind(controller));
router.post('/no-auth/change-password', controller.changePassword.bind(controller));
router.post('/no-auth/refresh-token', controller.refreshToken.bind(controller));


router.get('/roles', authenticateToken,controller.getRoles.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.get('/byemail/:email', controller.getByEmail.bind(controller));

router.put('/',authenticateToken, controller.update.bind(controller));
router.delete('/:id',authenticateToken, controller.delete.bind(controller));

router.post('/uploads',authenticateToken, upload.single('file'), controller.uploadImages.bind(controller));

export default router;
