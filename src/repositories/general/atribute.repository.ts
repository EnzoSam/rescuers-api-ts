import { IAtributeRepository } from "../../interfaces/repositories/general/iAtributeRepository.interface";
import IAttribute from "../../models/general/iatribute.model";
import { BaseFirebaseRepository } from "../baseFirebase.repository";

export class AtributeRepository 
extends BaseFirebaseRepository<IAttribute> implements IAtributeRepository {
    
  
   
}