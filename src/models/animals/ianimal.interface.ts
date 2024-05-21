import { BaseModel } from "../base/base.model";

interface IAnimal extends BaseModel {
    name:string
    userId:string
    image?:string
    description?:string
    atributes:string[]
  }
  
  export default IAnimal;
  