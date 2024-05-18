import { Request, Response } from 'express';
import AtributeService from '../../services/general/atribute.service';
import { handleResponse, handleOK, handleCreatedOk, handleResOK } from '../../handlers/response.handler';
import { handleError, handleErrorGeneric } from '../../handlers/error.handler';
import { IFileUploader } from '../../interfaces/services/IFileUploader.interface';

class AtributeController {

  uploader:IFileUploader;
  service:AtributeService;

  constructor(_uploader:IFileUploader,
    _service: AtributeService)
  {
    this.uploader = _uploader;
    this.service = _service;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const all = await this.service.getAll();
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener los atributos:', error);
      handleErrorGeneric(res, 'Error al obtener todos', error);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;
      const unique = await this.service.getById(id);
      handleOK(res, unique);
    } catch (error) {
      console.error('Error al obtener atributo por id.', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const atribute = req.body;
      let created = await this.service.create(atribute);
      handleCreatedOk(res, created);
    } catch (error) {
      console.error('Error al crear un atributo:', error);
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
      console.error('Error al actualizar un atributo:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      handleResOK(res);
    } catch (error) {
      console.error('Error al eliminar un atributo:', error);
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
          const imageUrls = await this.uploader.uploadFile(req.file, 'atributes');
          handleOK(res, imageUrls)
        }
      }
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
      handleErrorGeneric(res, 'Error al subir imagen', error);
    }
  }
}

export default AtributeController;
