import * as admin from 'firebase-admin';
import ICaregiver from '../models/icaregiver.model';
import ICalification from '../models/icalification.model';

const db = admin.database();
const caregiversRef = db.ref('caregivers');
const calificationsRef = db.ref('califications');

class CaregiverService {
  static async getAllCaregivers(): Promise<ICaregiver[]> {
    const snapshot = await caregiversRef.once('value');
    const caregivers: ICaregiver[] = snapshot.val() || [];
    return caregivers;
  }

  static async createCaregiver(caregiver: ICaregiver): Promise<void> {
    const caregiverRef = await caregiversRef.push(caregiver);
    const caregiverId = caregiverRef.key;

    if (caregiverId) {
      await caregiversRef.child(caregiverId).update({ id: caregiverId });
    }
  }

  static async publishAvailability(caregiverId: string): Promise<void> {

    
  }

  static async getRatings(caregiverId: string): Promise<ICalification[]> {
    const snapshot = await calificationsRef.orderByChild('ratedUserId').equalTo(caregiverId).once('value');
    const califications: ICalification[] = snapshot.val() || [];
    return califications;
  }
}

export default CaregiverService;
