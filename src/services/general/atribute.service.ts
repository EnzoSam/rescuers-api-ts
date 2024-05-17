import * as admin from 'firebase-admin';
import IAttribute from '../../models/general/iatribute.model';
import bcrypt from 'bcryptjs'

const db = admin.database();
const atributeRef = db.ref('atributes');
const storage = admin.storage().bucket();

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

  static async uploadFile(file: Express.Multer.File): Promise<any> {
    const fileName =  await bcrypt.hash(file.originalname, 10);    
    const fullPath = 'atributes/' + fileName;
    const bucketFile = storage.file(fullPath);
  
    await bucketFile.save(file.buffer, {
      contentType: file.mimetype,
      gzip: true
    });
  
    const [url] = await bucketFile.getSignedUrl({
      action: "read",
      expires: "01-01-2050"
    });

    await storage.file(fullPath).makePublic();

    return {url, fullPath, name:fileName};
  }
    
}

export default AtributeService;
