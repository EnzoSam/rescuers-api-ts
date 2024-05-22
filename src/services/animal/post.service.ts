import { IFilter } from '../../interfaces/ifilter.interface';
import IPost from '../../models/animals/ipost.interface';
import AnimalService from './animal.service';

class PostService {

    constructor(private _animalService:AnimalService)
    {
    }

    async filter(filter:IFilter | undefined):Promise<IPost[]>
    {
       let animals = await this._animalService.filter(filter);
       
       let posts:IPost[] = animals.map(a=>
        ({
        id: a.id,
        description: a.description,
        image: a.image,
        title:a.name
        }));

       return posts;
    }
}

export default PostService;
