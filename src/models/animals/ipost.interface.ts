import { BaseModel } from "../base/base.model";

interface IPost  extends BaseModel{
    contenido: string;
    autorId: string;
    fechaCreacion?: string; 
    animalId?: string | null;
  }
  
  export default IPost;
  