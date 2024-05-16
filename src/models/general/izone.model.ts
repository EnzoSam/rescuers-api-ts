import { BaseModel } from "../base/base.model"

export interface IZone extends BaseModel {
    name: string
    code: string
    zoneType:string,
    parentZoneId?:any
  }