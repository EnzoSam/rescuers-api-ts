import { IFilter } from "../../interfaces/ifilter.interface";
import { IAnimalRepository } from "../../interfaces/repositories/rescuers/iAnimalRepository.interface";
import IAnimal from "../../models/animals/ianimal.interface";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class AnimalRepository 
extends BaseFirestoreRepository<IAnimal> implements IAnimalRepository {

    async filter(filter: IFilter | undefined): Promise<IAnimal[]> {
        let q = this.collection.where('state','!=', 0);
        if(filter && filter?.atributes && filter.atributes.length > 0)
            q = q.where('atributes', 'array-contains-any', filter?.atributes);
        const snapshot = await q.get();
        const data: IAnimal[] = [];
        snapshot.forEach(doc => {
            if (doc.exists) {

                let a:IAnimal = doc.data() as IAnimal;
                a.id = doc.id;
                data.push(a);
            }
        });
        return data;
    }

}