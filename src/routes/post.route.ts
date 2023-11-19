import express from 'express';
import PostController from '../controllers/animal/post.controller';
import authenticateToken from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticateToken);
router.get('/', PostController.getAllPosts);
router.post('/', PostController.createPost);

export default router;
