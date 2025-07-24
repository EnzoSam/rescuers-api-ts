import { ContentsType, PostStates } from "../../constants/animals/posts.constant";
import { BaseModel } from "../base/base.model";

interface IPost  extends BaseModel{

  id:any
  title:string
  contentType:ContentsType
  state:PostStates
  description?:string
  image?:string
  postCategory?:string
}
  
export default IPost;
  