import * as admin from 'firebase-admin';

const db = admin.database();
const permissionsRef = db.ref('permissions');

class PermissionService {
  static async getAllPermissions(): Promise<string[]> {
    const snapshot = await permissionsRef.once('value');
    const permissions: string[] = snapshot.val() || [];
    return permissions;
  }

  static async createPermission(permission: string): Promise<void> {
    await permissionsRef.push(permission);
  }

  static async deletePermission(permission: string): Promise<void> {
    const snapshot = await permissionsRef.orderByValue().equalTo(permission).once('value');
    const permissionId = Object.keys(snapshot.val())[0];
    if (permissionId) {
      await permissionsRef.child(permissionId).remove();
    }
  }
}

export default PermissionService;
