import { Request, Response } from 'express';
import RoleService from '../../srvices/user/role.service';

class RoleController {

  static async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(200).json({ roles });
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async createRole(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body;
      await RoleService.createRole(role);
      res.status(201).json({ message: 'Rol creado exitosamente.' });
    } catch (error) {
      console.error('Error al crear un rol:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.params;
      await RoleService.deleteRole(role);
      res.status(200).json({ message: 'Rol eliminado exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar un rol:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async addPermissionsToRole(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;
      const { permissions } = req.body;
      await RoleService.addPermissionsToRole(roleId, permissions);
      res.status(200).json({ message: 'Permisos agregados al rol exitosamente.' });
    } catch (error) {
      console.error('Error al agregar permisos al rol:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async removePermissionsFromRole(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;
      const { permissions } = req.body;
      await RoleService.removePermissionsFromRole(roleId, permissions);
      res.status(200).json({ message: 'Permisos removidos del rol exitosamente.' });
    } catch (error) {
      console.error('Error al remover permisos del rol:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
}

export default RoleController;
