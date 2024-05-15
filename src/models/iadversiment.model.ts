import { BaseModel } from "./base/base.model";

interface IAdvertisement extends BaseModel {
    userId: string;
    content: string;
    publicationDate?: string;    
  }
  
  export default IAdvertisement;
  