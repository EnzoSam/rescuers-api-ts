import { Request, Response } from 'express';
import { handleError, handleErrorGeneric, handleExeption } from '../../handlers/error.handler';
import { handleCreatedOk, handleOK, handleResOK } from '../../handlers/response.handler';
import CaregiverCalificationService from '../../services/user/caregiverCalification.service';

class CaregiverCalificationController {

  service:CaregiverCalificationService;

  constructor(_service:CaregiverCalificationService)
  {
    this.service = _service;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const all = await this.service.getAll();
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener todos:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;
      const unique = await this.service.getById(id);
      handleOK(res, unique);
    } catch (error) {
      console.error('Error al obtener por id.', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const atribute = req.body;
      let created = await this.service.create(atribute);
      handleCreatedOk(res, created);
    } catch (error) {
      console.error('Error al crear uno:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {      
      const updates = req.body;
      const { id } = updates;
      await this.service.update(id, updates);
      handleOK(res, updates);
    } catch (error) {
      console.error('Error al actualizar uno:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      handleResOK(res);
    } catch (error) {
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async getByCaregiver(req: Request, res: Response): Promise<void> {
    try {

      let {caregiverId, lasts} = req.params;
      const all = await this.service.getByCaregiver(caregiverId, +lasts);
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener todos:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }  
}

export default CaregiverCalificationController;

