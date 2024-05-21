// PostController.ts

import { Request, Response } from 'express';
import PostService from '../../services/animal/post.service';
import IPost from '../../models/animals/ipost.interface';
import { handleOK } from '../../handlers/response.handler';
import { handleErrorGeneric } from '../../handlers/error.handler';

class PostController {

  constructor(private _service:PostService)
  {
  }

  async filter(req: Request, res: Response): Promise<void> 
  {
    try {
      const all = await this._service.filter();
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener los post:', error);
      handleErrorGeneric(res, 'Error al obtener todos', error);
    }
  }
}

export default PostController;
