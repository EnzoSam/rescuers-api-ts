import * as admin from 'firebase-admin';
import IAdvertisement from '../models/iadversiment.model';

const db = admin.database();
const advertisementsRef = db.ref('advertisements');

class AdvertisementService {
  static async getAllAdvertisements(): Promise<IAdvertisement[]> {
    const snapshot = await advertisementsRef.once('value');
    const advertisements: IAdvertisement[] = snapshot.val() || [];
    return advertisements;
  }

  static async createAdvertisement(advertisement: IAdvertisement): Promise<void> {
    const advertisementRef = await advertisementsRef.push(advertisement);
    const advertisementId = advertisementRef.key;

    // Actualizar el ID de la publicidad recién creada con su valor correspondiente
    if (advertisementId) {
      await advertisementsRef.child(advertisementId).update({ id: advertisementId });
    }
  }

  static async editAdvertisement(advertisementId: string, updatedAdvertisement: IAdvertisement): Promise<void> {
    await advertisementsRef.child(advertisementId).update(updatedAdvertisement);
  }

  static async deleteAdvertisement(advertisementId: string): Promise<void> {
    await advertisementsRef.child(advertisementId).remove();
  }

  static async getAdvertisementDetails(advertisementId: string): Promise<IAdvertisement | null> {
    const snapshot = await advertisementsRef.child(advertisementId).once('value');
    const advertisement: IAdvertisement | null = snapshot.val();
    return advertisement;
  }
}

export default AdvertisementService;
