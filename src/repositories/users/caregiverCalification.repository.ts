import { ICaregiverCalificationRepository } from "../../interfaces/repositories/users/iCaregiverCalificationRepository.interface";
import ICaregiverCalification from "../../models/user/caregiverCalification.model";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class CaregiverCalificationRepository
    extends BaseFirestoreRepository<ICaregiverCalification> implements ICaregiverCalificationRepository {

    async getByCaregiver(caregiverId: string, lasts: number | undefined): Promise<ICaregiverCalification[]> {
    
        const snapshot = await this.collection.where
        ('caregiverId', '==', caregiverId).get();
        const data: ICaregiverCalification[] = [];
        snapshot.forEach(doc => {
            let a:ICaregiverCalification = doc.data() as ICaregiverCalification;
            a.id = doc.id;
            data.push(a);
        });
        return data      
    }

}