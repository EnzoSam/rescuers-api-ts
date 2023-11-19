// roleRoutes.ts

import express from 'express';
import RoleController from '../controllers/user/role.controller';
import authenticateToken from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticateToken);

//router.get('/', RoleController.getAllRoles);
//router.post('/', RoleController.createRole);
//router.delete('/:roleId', RoleController.deleteRole);
router.post('/:roleId/permissions', RoleController.addPermissionsToRole);
router.delete('/:roleId/permissions', RoleController.removePermissionsFromRole);

export default router;
