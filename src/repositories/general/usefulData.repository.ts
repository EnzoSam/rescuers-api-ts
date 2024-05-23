import { IUsefulDataRepository } from "../../interfaces/repositories/general/iusefulData.interface";
import { IUsefulData } from "../../models/general/iusefulData.model";
import { BaseFirebaseRepository } from "../baseFirebase.repository";

export class UsefullRepository 
extends BaseFirebaseRepository<IUsefulData> implements IUsefulDataRepository {

   
}