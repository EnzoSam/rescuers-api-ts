import { BaseModel } from "../base/base.model";
import { IContact } from "../general/icontact.model";

interface User extends BaseModel{
    name: string
    lastName: string
    email: string
    password?: string
    image:string
    contacts:IContact[]
    roles: number[]
    emailConfirmed: boolean
    emailConfirmationToken?: string
    emailVerificationAttempts: number,
    zoneId:any
  }
  
  export default User;
  