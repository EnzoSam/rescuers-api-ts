import { IZone } from "../../../models/general/izone.model";
import { IBaseRepository } from "../irepository.interface";

export interface IZoneRepository extends IBaseRepository<IZone>
{
    getByParent(parentId:any):Promise<IZone[]>
    getRoots(): Promise<IZone[]>
}