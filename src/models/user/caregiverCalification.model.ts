import { BaseModel } from "../base/base.model";

interface ICaregiverCalification extends BaseModel {
    caregiverId: string
    userId:string
    score:number
    comentario:string
  }
  
  export default ICaregiverCalification;