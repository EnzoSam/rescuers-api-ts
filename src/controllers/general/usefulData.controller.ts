import { Request, Response } from 'express';
import { handleResponse, handleOK, handleCreatedOk, handleResOK } from '../../handlers/response.handler';
import { handleError, handleErrorGeneric } from '../../handlers/error.handler';
import UsefulDataService from '../../services/general/usefullData.service';

class UsefulDataController {

  constructor(private service: UsefulDataService)
  {
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const all = await this.service.getAll();
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      handleErrorGeneric(res, 'Error al obtener todos', error);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;
      const unique = await this.service.getById(id);
      handleOK(res, unique);
    } catch (error) {
      console.error('Error al obtener datos por id.', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      let created = await this.service.create(data);
      handleCreatedOk(res, created);
    } catch (error) {
      console.error('Error al crear un datos:', error);
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
      console.error('Error al actualizar un datos:', error);
      handleErrorGeneric(res, 'Error al actualizar', error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      handleResOK(res);
    } catch (error) {
      console.error('Error al eliminar un datos:', error);
      handleErrorGeneric(res, 'Error al eliminar', error);
    }
  }

}

export default UsefulDataController;
