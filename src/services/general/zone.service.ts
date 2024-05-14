import * as admin from 'firebase-admin';
import {IZone} from '../../models/general/izone.model';

const db = admin.database();
const zoneRef = db.ref('zones');

class ZoneService {

  static async getAll(): Promise<IZone[]> {
    const snapshot = await zoneRef.once('value');
    let list:IZone[] = [];
    //const atributes: IAttribute[] = snapshot.val() || [];
    
    await snapshot.forEach(childSnapshot=> {
      //var key = childSnapshot.key;
      var atr = childSnapshot.val();
      list.push(atr);
  });

    return list;
  }

  static async create(zone: IZone): Promise<void> {
    const atrRef = await zoneRef.push(zone);
    const id = atrRef.key;

    if (id) {
      await zoneRef.child(id).update({ id: id });
    }
  }

  static async update(id: string, updates: Partial<IZone>): Promise<void> {
    await zoneRef.child(id).update(updates);
  }

  static async delete(id: string): Promise<void> {
    await zoneRef.child(id).remove();
  }
}

export default ZoneService;
