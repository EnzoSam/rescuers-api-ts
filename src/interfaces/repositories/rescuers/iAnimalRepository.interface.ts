import IAnimal from "../../../models/animals/ianimal.interface";
import { IBaseRepository } from "../irepository.interface";

export interface IAnimalRepository extends IBaseRepository<IAnimal>
{

}