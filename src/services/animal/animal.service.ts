import * as admin from 'firebase-admin';
import Animal from '../../models/animals/ianimal.interface';
import IAttribute from '../../models/general/iatribute.model';

const db = admin.database();
const animalsRef = db.ref('animals');
const storage = admin.storage().bucket('animals');

class AnimalService {
  static async getAllAnimals(): Promise<Animal[]> {
    const snapshot = await animalsRef.once('value');
    const animals: Animal[] = snapshot.val() || [];
    return animals;
  }

  static async createAnimal(animal: Animal): Promise<void> {
    const animalRef = await animalsRef.push(animal);
    const animalId = animalRef.key;

    if (animalId) {
      await animalsRef.child(animalId).update({ id: animalId });
    }
  }

  static async updateAnimal(animalId: string, updates: Partial<Animal>): Promise<void> {
    await animalsRef.child(animalId).update(updates);
  }

  static async deleteAnimal(animalId: string): Promise<void> {
    await animalsRef.child(animalId).remove();
  }
/*
  static async getAnimalsByAttributes(attributes: IAttribute[]): Promise<Animal[]> {
    const allAnimals = await AnimalService.getAllAnimals();
/*
    // Filtrar animales que coincidan con todos los atributos proporcionados
    const filteredAnimals = allAnimals.filter((animal) =>
      attributes.every((attribute) =>
        animal.attributes?.some((animalAttribute) =>
        )
      )
    );

    return filteredAnimals;
  }
*/
  static async uploadImages(animalId: string, imageBuffers: Buffer[]): Promise<string[]> {
    const imageUrls: string[] = [];

    for (const [index, imageBuffer] of imageBuffers.entries()) {
      if (imageBuffer.length > 1024 * 1024) {
        // Imagen demasiado grande
        throw new Error(`La imagen ${index + 1} excede el límite de tamaño.`);
      }

      const fileName = `${animalId}_image_${index + 1}.jpg`; // Ajusta el nombre del archivo según tus necesidades
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

  static async updateImageURLs(animalId: string, imageUrls: string[]): Promise<void> {
    await animalsRef.child(animalId).update({ imageUrls });
  }
}

export default AnimalService;
