import { IFilter } from "../../interfaces/ifilter.interface";
import { IAnimalRepository } from "../../interfaces/repositories/rescuers/iAnimalRepository.interface";
import IAnimal from "../../models/animals/ianimal.interface";
import { BaseFirebaseRepository } from "../baseFirebase.repository";

export class AnimalRepository 
extends BaseFirebaseRepository<IAnimal> implements IAnimalRepository {

    async filter(filter: IFilter | undefined): Promise<IAnimal[]> {
        const snapshot = await this.ref.once('value');
        const data = snapshot.val();
        return data ? Object.values(data) : [];
    }
 
   
}