import { Request, Response } from 'express';
import AnimalService from '../../services/animal/animal.service';
import { IFileUploader } from '../../interfaces/services/IFileUploader.interface';
import { handleErrorGeneric, handleError } from '../../handlers/error.handler';
import { handleOK, handleCreatedOk, handleResOK } from '../../handlers/response.handler';
import { PostStates } from '../../constants/animals/posts.constant';

class AnimalController {

  service:AnimalService;
  uploader:IFileUploader;

  constructor(_service:AnimalService,
    _uploader:IFileUploader)
  {
      this.service = _service;
      this.uploader = _uploader;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const all = await this.service.getAll();
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener los animales:', error);
      handleErrorGeneric(res, 'Error al obtener todos', error);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;
      const unique = await this.service.getById(id);
      handleOK(res, unique);
    } catch (error) {
      console.error('Error al obtener animal por id.', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async create(req: any, res: Response): Promise<void> {
    try {
      const animal = req.body;
      let {userId} = req.user;
      animal.userId = userId;
      let created = await this.service.create(animal);
      handleCreatedOk(res, created);
    } catch (error) {
      console.error('Error al crear un animal:', error);
      handleErrorGeneric(res, 'Error al crear', error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updates = req.body;
      const { id } = updates;
      await this.service.update(id, updates);
      handleOK(res, updates);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      handleResOK(res);
    } catch (error) {
      console.error('Error al eliminar un animal:', error);
      handleErrorGeneric(res, 'Error al eliminar', error);
    }
  }

  async uploadImages(req: Request, res: Response): Promise<void> {
    try {

      if (req.file) {
        const imageBuffers: Buffer = req.file.buffer;

        if (imageBuffers.length === 0) {
          handleError(res, 500,'No se proporcionaron imagenes.', {});
        }
        else{
          const imageUrls = await this.uploader.uploadFile
          (req.file, 'animals');
          handleOK(res, imageUrls)
        }
      }
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
      handleErrorGeneric(res, 'Error al subir imagen', error);
    }
  }

  async changeStatePublished(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      await this.service.changeState(id, PostStates.Published);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }

  async changeStateRejected(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      await this.service.changeState(id, PostStates.Rejected);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }  
 
  async changeStateArchived(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      await this.service.changeState(id, PostStates.Archived);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }   

  async changeStateDraft(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      await this.service.changeState(id, PostStates.Draft);
      handleResOK(res);
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }    
}

export default AnimalController;
