import { BaseModel } from "../base/base.model";

interface Role extends BaseModel{

    name: string;
    description: string;
    permissions: string[]; 
  }
  
  export default Role;