import { Request, Response } from 'express';
import Service from '../../services/general/atribute.service';
import { handleResponse, handleOK, handleCreatedOk, handleResOK } from '../../handlers/response.handler';
import { handleError } from '../../handlers/error.handler';

class AtributeController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const all = await Service.getAll();
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener los atributos:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const atribute = req.body;
      let created = await Service.create(atribute);
      handleCreatedOk(res, created);
    } catch (error) {
      console.error('Error al crear un atributo:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      await Service.update(id, updates);
      handleOK(res, updates);
    } catch (error) {
      console.error('Error al actualizar un atributo:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Service.delete(id);
      res.status(200).json({ message: 'Atributo eliminado exitosamente.' });
      handleResOK(res);
    } catch (error) {
      console.error('Error al eliminar un atributo:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async uploadImages(req: Request, res: Response): Promise<void> {
    try {

      if (req.file) {
        const imageBuffers: Buffer = req.file.buffer;

        if (imageBuffers.length === 0) {
          handleError(res, 500,'No se proporcionaron imagenes.', {});
          return;
        }

        // Sube las imágenes a Firebase Storage
        const imageUrls = await Service.uploadFile(req.file);
        handleOK(res, imageUrls)
      }
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
}

export default AtributeController;
