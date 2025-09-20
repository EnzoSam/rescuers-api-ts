// PostController.ts

import { Request, Response } from 'express';
import PostService from '../../services/animal/post.service';
import IPost from '../../models/animals/ipost.interface';
import { handleOK, handleResOK } from '../../handlers/response.handler';
import { handleErrorGeneric } from '../../handlers/error.handler';
import { IFilter } from '../../interfaces/ifilter.interface';
import AnimalService from '../../services/animal/animal.service';
import { PostStates } from '../../constants/animals/posts.constant';

class PostController {

  constructor(private _service:PostService)
  {
  }

  async changeStateRevision(req: any, res: Response): Promise<void> {
    try {
      const { id, contentType } = req.body;
       let {userId} = req.user;
      await this._service.changeState
      (id, contentType, PostStates.PendingReview, userId);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un post:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }

  async changeStatePublished(req: any, res: Response): Promise<void> {
    try {
      const { id, contentType } = req.body;
      let {userId} = req.user;
      await this._service.changeState
      (id, contentType, PostStates.Published, userId);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un post:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }

  async changeStateRejected(req: any, res: Response): Promise<void> {
    try {
      const { id, contentType } = req.body;
      let {userId} = req.user;
      await this._service.changeState
      (id, contentType, PostStates.Rejected, userId);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un post:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }  
 
  async changeStateArchived(req: any, res: Response): Promise<void> {
    try {
      const { id, contentType } = req.body;
      let {userId} = req.user;
      await this._service.changeState
      (id, contentType, PostStates.Archived,userId);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un post:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }   

  async changeStateDraft(req: any, res: Response): Promise<void> {
    try {
      const { id, contentType } = req.body;
      let {userId} = req.user;
      await this._service.changeState
      (id, contentType, PostStates.Draft, userId);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un post:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }  

  async filter(req: any, res: any): Promise<void> 
  {
    try {

      let userId = req.user?.userId;
      let filter:IFilter | undefined = undefined;
      if(req.body)
        filter = req.body as IFilter;
      
      if(!filter.onlyOwenerPublished)
        userId = undefined;

      const all = await this._service.filter(filter, userId);
      const count = await this._service.count(filter,userId);

      const data = {
        posts:all,
        totalCount:count
      }
      handleOK(res, data);
    } catch (error) {
      console.error('Error al obtener los post:', error);
      handleErrorGeneric(res, 'Error al obtener todos', error);
    }
  }
}

export default PostController;
