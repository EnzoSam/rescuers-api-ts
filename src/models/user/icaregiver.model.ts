import { BaseModel } from "../base/base.model";

interface ICaregiver extends BaseModel {
    userId: string;
    specialty: string;
    averageRating: number;
  }
  
  export default ICaregiver;
  