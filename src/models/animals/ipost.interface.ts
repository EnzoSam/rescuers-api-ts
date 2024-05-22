import { BaseModel } from "../base/base.model";

interface IPost  extends BaseModel{

  id:any
  title:string
  description?:string
  image?:string
}
  
  export default IPost;
  