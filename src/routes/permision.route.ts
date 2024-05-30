import express from 'express';
import PermissionController from '../controllers/user/permision.controller';
import authenticateToken from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', PermissionController.getAllPermissions);
router.post('/', PermissionController.createPermission);
router.delete('/:permission', PermissionController.deletePermission);

export default router;
