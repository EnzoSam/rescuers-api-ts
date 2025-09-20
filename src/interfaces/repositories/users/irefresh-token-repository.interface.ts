import { IRefreshToken } from "../../../models/user/irefresh-token.model"
import { IBaseRepository } from "../irepository.interface";

export interface IRefreshTokenRepository extends IBaseRepository<IRefreshToken>
{
    getByToken(token:string):Promise<IRefreshToken| undefined>
    deleteByToken(token:string):Promise<void>
}