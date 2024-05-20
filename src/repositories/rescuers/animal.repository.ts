import { IAnimalRepository } from "../../interfaces/repositories/rescuers/iAnimalRepository.interface";
import IAnimal from "../../models/animals/ianimal.interface";
import { BaseFirebaseRepository } from "../baseFirebase.repository";

export class AnimalRepository 
extends BaseFirebaseRepository<IAnimal> implements IAnimalRepository {
 
   
}