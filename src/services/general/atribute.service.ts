import * as admin from 'firebase-admin';
import IAttribute from '../../models/general/iatribute.model';

const db = admin.database();
const atributeRef = db.ref('atributes');
const storage = admin.storage().bucket('atributes');

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

  static async uploadImages(atributeId: string, imageBuffers: Buffer[]): Promise<string[]> {
    const imageUrls: string[] = [];

    for (const [index, imageBuffer] of imageBuffers.entries()) {
      if (imageBuffer.length > 1024 * 1024) {
        // Imagen demasiado grande
        throw new Error(`La imagen ${index + 1} excede el límite de tamaño.`);
      }

      const fileName = `${atributeId}_image_${index + 1}.jpg`;
      const file = storage.file(fileName);

      await file.save(imageBuffer, {
        metadata: {
          contentType: 'image/jpeg',
        },
      });

      // Obtén la URL de descarga de la imagen
      const [url] = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' }); // Ajusta la fecha de caducidad según tus necesidades

      imageUrls.push(url);
    }

    return imageUrls;
  }

  static async updateImageURLs(atributeId: string, imageUrls: string[]): Promise<void> {
    await atributeRef.child(atributeId).update({ imageUrls });
  }
}

export default AtributeService;
