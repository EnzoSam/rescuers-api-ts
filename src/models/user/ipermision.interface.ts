import { BaseModel } from "../base/base.model";

interface Permission extends BaseModel{
    name: string;
    description: string;
  }
  
  export default Permission;