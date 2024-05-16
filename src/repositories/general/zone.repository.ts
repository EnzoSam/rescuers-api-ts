import { IZoneRepository } from "../../interfaces/repositories/general/izoneRepository.interface";
import { IZone } from "../../models/general/izone.model";
import { BaseFirebaseRepository } from "../baseFirebase.repository";

export class ZoneRepository extends BaseFirebaseRepository<IZone> implements IZoneRepository {
    
    async getByParent(parentId: any): Promise<IZone[]> {
        const snapshot =
         await this.ref.orderByChild('parentZoneId')
                        .equalTo(parentId).once('value');
        const data = snapshot.val();
        return data ? Object.values(data) : [];        
    }
   
}