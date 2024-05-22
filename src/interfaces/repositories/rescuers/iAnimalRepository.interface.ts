import IAnimal from "../../../models/animals/ianimal.interface";
import { IFilter } from "../../ifilter.interface";
import { IBaseRepository } from "../irepository.interface";

export interface IAnimalRepository extends IBaseRepository<IAnimal>
{
    filter(filter:IFilter | undefined): Promise<IAnimal[]>;    
}