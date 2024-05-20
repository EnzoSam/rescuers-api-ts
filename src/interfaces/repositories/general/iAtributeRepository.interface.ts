import IAttribute from "../../../models/general/iatribute.model";
import { IBaseRepository } from "../irepository.interface";

export interface IAtributeRepository extends IBaseRepository<IAttribute>
{
    getByGroup(group:string): Promise<IAttribute[]>
}