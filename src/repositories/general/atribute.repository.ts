import { IAtributeRepository } from "../../interfaces/repositories/general/iAtributeRepository.interface";
import IAttribute from "../../models/general/iatribute.model";
import { BaseFirebaseRepository } from "../baseFirebase.repository";

export class AtributeRepository 
extends BaseFirebaseRepository<IAttribute> implements IAtributeRepository {
    
    async getByGroup(group: string): Promise<IAttribute[]> {
        const snapshot =
         await this.ref.orderByChild('group')
                        .equalTo(group).once('value');
        const data = snapshot.val();
        return data ? Object.values(data) : [];   
    }
    
  
   
}