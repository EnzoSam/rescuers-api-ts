import { BaseModel } from "../base/base.model";
import IAnimalAttribute from "./ianimalAtribute.interface";

interface Animal extends BaseModel {
    name: string
    datebird:Date
    description: string
    availableForAdoption: boolean
    lost: boolean
    ownerId: string
    attributes: IAnimalAttribute[];
  }
  
  export default Animal;
  