import { BaseModel } from "../base/base.model";

interface IAnimal extends BaseModel {
    name:string
    image?:string
    description?:string
    atributes:string[]
  }
  
  export default IAnimal;
  