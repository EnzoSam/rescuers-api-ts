import { ICaregiverRepository } from "../../interfaces/repositories/users/iCaregiverRepository.interface";
import ICaregiver from "../../models/user/icaregiver.model";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class CaregiverRepository
    extends BaseFirestoreRepository<ICaregiver> implements ICaregiverRepository {


}