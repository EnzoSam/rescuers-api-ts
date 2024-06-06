import ICaregiverCalification from "../../../models/user/caregiverCalification.model";
import { IBaseRepository } from "../irepository.interface";

export interface ICaregiverCalificationRepository extends IBaseRepository<ICaregiverCalification>
{
    getByCaregiver(caregiverId:string,lasts:number | undefined): Promise<ICaregiverCalification[]>;    
}
