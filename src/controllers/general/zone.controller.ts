import { Request, Response } from 'express';
import { handleResponse, handleOK, handleCreatedOk,handleResOK } from '../../handlers/response.handler';
import { handleError, handleErrorGeneric } from '../../handlers/error.handler';
import ZoneService from '../../services/general/zone.service';

class ZoneController {

  service:ZoneService;
  constructor(_zoneService:ZoneService)
  {
      this.service = _zoneService;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const all = await this.service.getAll();
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener zonas:', error);
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
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      await this.service.update(id, updates);
      handleOK(res, updates);
    } catch (error) {
      console.error('Error al actualizar un atributo:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(200).json({ message: 'Atributo eliminado exitosamente.' });
      handleResOK(res);
    } catch (error) {
      console.error('Error al eliminar un atributo:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async uploadImages(req: Request, res: Response): Promise<void> {
    try {
      const atributeId = req.params.atributeId;

      /*
      // Verifica si el animal existe antes de subir las imágenes
      const animalExists = await AnimalService.doesAnimalExist(animalId);
      if (!animalExists) {
        res.status(404).json({ error: 'El animal no existe.' });
        return;
      }

      // Accede a las imágenes desde los buffers de memoria
      const imageBuffers: Buffer[] = req.files?.map((file: any) => file.buffer) || [];
      if (imageBuffers.length === 0) {
        res.status(400).json({ error: 'No se proporcionaron imágenes.' });
        return;
      }

      // Sube las imágenes a Firebase Storage
      const imageUrls = await AnimalService.uploadImages(animalId, imageBuffers);

      // Actualiza la lista de URLs de las imágenes en la base de datos del animal
      await AnimalService.updateImageURLs(animalId, imageUrls);

      res.status(200).json({ imageUrls });*/
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
}

export default ZoneController;
