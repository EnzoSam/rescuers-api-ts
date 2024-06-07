import { BaseModel } from "../base/base.model";

interface IAnimal extends BaseModel {
    name:string
    userId:string
    image?:string
    description?:string
    state:number
    lost:boolean
    atributes:string[]
  }
  
  export default IAnimal;
  