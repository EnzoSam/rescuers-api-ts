import User from "../../../models/user/iuser.interface";
import { IBaseRepository } from "../irepository.interface";

export interface IUserRepository extends IBaseRepository<User>
{
    getUserByEmail(email: string): Promise<User | undefined>
    getEmailVerificationAttempts():Promise<number>
}
