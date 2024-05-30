import { IZoneRepository } from "../../interfaces/repositories/general/izoneRepository.interface";
import { IZone } from "../../models/general/izone.model";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class ZoneRepository
    extends BaseFirestoreRepository<IZone> implements IZoneRepository {

    async getByParent(parentId: string): Promise<IZone[]> {
        const snapshot = await this.collection.where('parentZoneId', '==', parentId).get();
        const data: IZone[] = [];
        snapshot.forEach(doc => {
            if (doc.exists) {
                let z = doc.data() as IZone;
                z.id = doc.id;
                data.push(z);
            }
        });
        return data;
    }

    async getRoots(): Promise<IZone[]> {
        const snapshot = await this.collection.where
        ('parentZoneId', '==', null).get();
        const data: IZone[] = [];
        snapshot.forEach(doc => {
            if (doc.exists) {
                let z = doc.data() as IZone;
                z.id = doc.id;
                data.push(z);
            }
        });
        return data;
    }


}