import { PostStates } from "../constants/animals/posts.constant"

export interface IFilter
{
    pageIndex:number
    pageSize:number
    atributes:string[]  
    state:PostStates
    lost:boolean,
    onlyOwenerPublished:boolean
}