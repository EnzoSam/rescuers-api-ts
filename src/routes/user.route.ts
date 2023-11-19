import express from 'express';
import UserController from '../controllers/user/user.controller';
import authenticateToken from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/confirm-email', UserController.confirmEmail);
router.post('/login', UserController.loginUser);


router.use(authenticateToken);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

export default router;
