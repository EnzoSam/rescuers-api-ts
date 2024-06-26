import ICaregiver from "../../../models/user/icaregiver.model";
import { IBaseRepository } from "../irepository.interface";

export interface ICaregiverRepository extends IBaseRepository<ICaregiver>
{
    getByUserId(_userId: string): Promise<ICaregiver | null>;
}
