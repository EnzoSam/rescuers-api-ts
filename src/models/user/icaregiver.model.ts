import { PostStates } from "../../constants/animals/posts.constant";
import { BaseModel } from "../base/base.model";

interface ICaregiver extends BaseModel {
    userId: string;
    presentation:string
    state:PostStates    
  }
  
  export default ICaregiver;
  