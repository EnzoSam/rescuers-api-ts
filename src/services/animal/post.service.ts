import * as admin from 'firebase-admin';
import IPost from '../../models/animals/ipost.interface';
import AnimalService from './animal.service';

const db = admin.database();
const postsRef = db.ref('posts');

class PostService {

    constructor(private _postService:PostService)
    {
    }

    async filter():Promise<IPost[]>
    {
       let animals = await this._postService.filter();
       return animals;
    }
}

export default PostService;
