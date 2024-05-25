import { BaseModel } from "../base/base.model";
import { IContact } from "./icontact.model";

export interface IUsefulData extends BaseModel{

    data:string
    description:string
    contacts:IContact[]
}