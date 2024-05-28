import { IUsefulDataRepository } from "../../interfaces/repositories/general/iusefulData.interface";
import { IUsefulData } from "../../models/general/iusefulData.model";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class UsefullRepository 
extends BaseFirestoreRepository<IUsefulData> implements IUsefulDataRepository {

   
}