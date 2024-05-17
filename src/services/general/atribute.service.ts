import * as admin from 'firebase-admin';
import IAttribute from '../../models/general/iatribute.model';


const db = admin.database();
const atributeRef = db.ref('atributes');

class AtributeService {

  static async getAll(): Promise<IAttribute[]> {
    const snapshot = await atributeRef.once('value');
    let atributes:IAttribute[] = [];
    //const atributes: IAttribute[] = snapshot.val() || [];
    
    await snapshot.forEach(childSnapshot=> {
      //var key = childSnapshot.key;
      var atr = childSnapshot.val();
      atributes.push(atr);
  });

    return atributes;
  }

  static async create(atribute: IAttribute): Promise<void> {
    const atrRef = await atributeRef.push(atribute);
    const atributeId = atrRef.key;

    if (atributeId) {
      await atributeRef.child(atributeId).update({ id: atributeId });
    }
  }

  static async update(id: string, updates: Partial<IAttribute>): Promise<void> {
    await atributeRef.child(id).update(updates);
  }

  static async delete(id: string): Promise<void> {
    await atributeRef.child(id).remove();
  }


    
}

export default AtributeService;
