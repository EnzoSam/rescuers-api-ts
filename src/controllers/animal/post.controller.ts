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

  constructor(private _service:PostService,
    private _animalService:AnimalService
  )
  {
  }

  async changeStatePublished(req: Request, res: Response): Promise<void> {
    try {
      const { animalId } = req.body;

      if(animalId)
          await this._animalService.changeState(animalId, PostStates.Published);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }

  async changeStateRejected(req: Request, res: Response): Promise<void> {
    try {
      const { animalId } = req.body;
      if(animalId)
        await this._animalService.changeState(animalId, PostStates.Rejected);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }  
 
  async changeStateArchived(req: Request, res: Response): Promise<void> {
    try {
      const { animalId } = req.body;
      if(animalId)
        await this._animalService.changeState(animalId, PostStates.Archived);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }   

  async changeStateDraft(req: Request, res: Response): Promise<void> {
    try {
      const { animalId } = req.body;
      if(animalId)
        await this._animalService.changeState(animalId, PostStates.Draft);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }  

  async filter(req: Request, res: Response): Promise<void> 
  {
    try {
      let filter:IFilter | undefined = undefined;
      if(req.body)
        filter = req.body as IFilter;
      
      const all = await this._service.filter(filter);
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener los post:', error);
      handleErrorGeneric(res, 'Error al obtener todos', error);
    }
  }
}

export default PostController;
