import * as admin from 'firebase-admin';
import Role from '../../models/user/irole.interface';

const db = admin.database();
const rolesRef = db.ref('roles');

class RoleService {
  static async getAllRoles(): Promise<Role[]> {
    const snapshot = await rolesRef.once('value');
    const roles: Role[] = snapshot.val() || [];
    return roles;
  }

  static async createRole(role: string, permissions: string[] = []): Promise<void> {
    const roleRef = await rolesRef.push({ role, permissions });
    const roleId = roleRef.key;

    if (roleId) {
      await rolesRef.child(roleId).update({ id: roleId });
    }
  }

  static async deleteRole(roleId: string): Promise<void> {
    await rolesRef.child(roleId).remove();
  }

  static async addPermissionsToRole(roleId: string, permissions: string[]): Promise<void> {
    const roleRef = rolesRef.child(roleId);
    const roleSnapshot = await roleRef.once('value');
    const role: Role | null = roleSnapshot.val();

    if (role) {
      const updatedPermissions = Array.from(new Set([...role.permissions, ...permissions]));
      await roleRef.update({ permissions: updatedPermissions });
    }
  }

  static async removePermissionsFromRole(roleId: string, permissions: string[]): Promise<void> {
    const roleRef = rolesRef.child(roleId);
    const roleSnapshot = await roleRef.once('value');
    const role: Role | null = roleSnapshot.val();

    if (role) {
      const updatedPermissions = role.permissions.filter((permission) => !permissions.includes(permission));
      await roleRef.update({ permissions: updatedPermissions });
    }
  }
}

export default RoleService;
