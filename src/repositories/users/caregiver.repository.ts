import { ICaregiverRepository } from "../../interfaces/repositories/users/iCaregiverRepository.interface";
import ICaregiver from "../../models/user/icaregiver.model";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class CaregiverRepository
    extends BaseFirestoreRepository<ICaregiver> implements ICaregiverRepository {

    async getByUserId(_userId: string): Promise<ICaregiver> {
        const snapshot = await this.collection
            .where('userId', '==', _userId).get();
        let caregiver: ICaregiver | undefined = undefined;
        snapshot.forEach(doc => {
            if (doc.exists) {
                caregiver = doc.data() as ICaregiver;
                caregiver.id = doc.id;
                return;
            }
        });
        return caregiver;
    }


}