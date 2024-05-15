import { BaseModel } from "./base/base.model";

interface ICalification extends BaseModel {
    userId: string; 
    ratedUserId: string;
    score: number;
    comment: string;
    date?: string;
  }
  
  export default ICalification;
  