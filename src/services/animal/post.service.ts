import * as admin from 'firebase-admin';
import IPost from '../../models/animals/ipost.interface';
import AnimalService from './animal.service';

class PostService {

    constructor(private _animalService:AnimalService)
    {
    }

    async filter():Promise<IPost[]>
    {
       let animals = await this._animalService.filter();
       return animals;
    }
}

export default PostService;
