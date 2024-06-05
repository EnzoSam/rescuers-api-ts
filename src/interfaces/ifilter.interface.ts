import { PostStates } from "../constants/animals/posts.constant"

export interface IFilter
{
    pageFrom:number
    pageTo:number
    atributes:string[]  
    state:PostStates
}