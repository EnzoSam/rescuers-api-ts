import { ContentsType, PostStates } from '../../constants/animals/posts.constant';
import { AtributesGroup } from '../../constants/general/atributes.constant';
import { IFilter } from '../../interfaces/ifilter.interface';
import IPost from '../../models/animals/ipost.interface';
import AtributeService from '../general/atribute.service';
import AnimalService from './animal.service';

class PostService {

    constructor(private _animalService:AnimalService,
        private _atributeService:AtributeService
    )
    {
    }

    async filter(filter:IFilter | undefined):Promise<IPost[]>
    {
       let atributes = await this._atributeService.getAll();
       let animals = await this._animalService.filter(filter);
       let posts:IPost[] = [];

        for(let animal of animals)
        {
            let typeName = '';
            for(let atrId of animal.atributes)
            {
                let aFinded = atributes.find(x=>x.id === atrId);
                if(aFinded && aFinded.group === AtributesGroup.Type)
                {
                    typeName = aFinded.name;
                    break;
                }
            }

            let animalPost:IPost =
            {
                id: animal.id,
                description : animal.description,
                image: animal.image,
                title: animal.name? animal.name : typeName,
                contentType: ContentsType.Animal,
                state: animal.state
            }

            posts.push(animalPost);
        }
       return posts;
    }

    async changeState(id:any, contentType: ContentsType, newState:PostStates)
    {
        if(contentType === ContentsType.Animal)
            await this._animalService.changeState(id, newState);
    }
}

export default PostService;
