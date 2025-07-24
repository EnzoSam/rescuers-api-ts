import { PostStates } from "../../constants/animals/posts.constant";
import { IFilter } from "../../interfaces/ifilter.interface";
import { IAnimalRepository } from "../../interfaces/repositories/rescuers/iAnimalRepository.interface";
import IAnimal from "../../models/animals/ianimal.interface";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class AnimalRepository 
extends BaseFirestoreRepository<IAnimal> implements IAnimalRepository {

    async count(filter: IFilter | undefined): Promise<number> {
        let q = this.collection.where(
            'state', '==', filter?.state || PostStates.Published
        );
        q = q.where('lost', '==', filter?.lost); 

        if (filter && filter.atributes && filter.atributes.length > 0) {
            q = q.where('atributes', 'array-contains-any', filter.atributes); 
        }

        try {
            const snapshot = await q.count().get(); 
            return snapshot.data().count; 
        } catch (error) {
            console.error("Error al contar documentos en AnimalRepository:", error);
            throw new Error("No se pudo obtener el conteo de animales.");
        }
    }

    async filter(filter: IFilter | undefined): Promise<IAnimal[]> {
        let q = this.collection.where(
            'state', '==', filter?.state || PostStates.Published
        );
        q = q.where('lost', '==', filter?.lost); 

        if (filter && filter.atributes && filter.atributes.length > 0) {
            q = q.where('atributes', 'array-contains-any', filter.atributes); 
        }

        if (filter && typeof filter.pageIndex === 'number' && typeof filter.pageSize === 'number') {
            const offset = filter.pageIndex * filter.pageSize;
            
            q = q.limit(filter.pageSize).offset(offset);
        }
        
        const snapshot = await q.get();
        const data: IAnimal[] = [];
        
        snapshot.forEach(doc => {
            if (doc.exists) {
                let a: IAnimal = doc.data() as IAnimal;
                a.id = doc.id;
                data.push(a);
            }
        });
        
        return data;
    }
}