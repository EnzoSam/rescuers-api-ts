import { BaseModel } from "../base/base.model";

interface IAttribute extends BaseModel{
  name: string
  group: string
  image:string
}

export default IAttribute;