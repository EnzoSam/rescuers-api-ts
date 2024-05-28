import { IAtributeRepository } from "../../interfaces/repositories/general/iAtributeRepository.interface";
import IAttribute from "../../models/general/iatribute.model";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class AtributeRepository
    extends BaseFirestoreRepository<IAttribute> implements IAtributeRepository {

    async getByGroup(group: string): Promise<IAttribute[]> {
        const snapshot = await this.collection.where('group', '==', group).get();
        const data: IAttribute[] = [];
        snapshot.forEach(doc => {
            let a:IAttribute = doc.data() as IAttribute;
            a.id = doc.id;
            data.push(a);
        });
        return data;
    }



}