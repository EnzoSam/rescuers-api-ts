import { Request, Response } from 'express';
import PermissionService from '../../srvices/user/permision.service';

class PermissionController {
  static async getAllPermissions(req: Request, res: Response): Promise<void> {
    try {
      const permissions = await PermissionService.getAllPermissions();
      res.status(200).json({ permissions });
    } catch (error) {
      console.error('Error al obtener los permisos:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async createPermission(req: Request, res: Response): Promise<void> {
    try {
      const { permission } = req.body;
      await PermissionService.createPermission(permission);
      res.status(201).json({ message: 'Permiso creado exitosamente.' });
    } catch (error) {
      console.error('Error al crear un permiso:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async deletePermission(req: Request, res: Response): Promise<void> {
    try {
      const { permission } = req.params;
      await PermissionService.deletePermission(permission);
      res.status(200).json({ message: 'Permiso eliminado exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar un permiso:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
}

export default PermissionController;
