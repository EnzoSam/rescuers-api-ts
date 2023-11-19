import { Request, Response } from 'express';
import AdvertisementService from '../srvices/advertisement.service';
import IAdvertisement from '../models/iadversiment.model';

class AdvertisementController {
  static async getAllAdvertisements(req: Request, res: Response): Promise<void> {
    try {
      const advertisements = await AdvertisementService.getAllAdvertisements();
      res.status(200).json({ advertisements });
    } catch (error) {
      console.error('Error al obtener las publicidades:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async createAdvertisement(req: Request, res: Response): Promise<void> {
    try {
      const advertisement: IAdvertisement = req.body;
      await AdvertisementService.createAdvertisement(advertisement);
      res.status(201).json({ message: 'Publicidad creada exitosamente.' });
    } catch (error) {
      console.error('Error al crear una publicidad:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async editAdvertisement(req: Request, res: Response): Promise<void> {
    try {
      const { advertisementId } = req.params;
      const updatedAdvertisement: IAdvertisement = req.body;
      await AdvertisementService.editAdvertisement(advertisementId, updatedAdvertisement);
      res.status(200).json({ message: 'Publicidad editada exitosamente.' });
    } catch (error) {
      console.error('Error al editar una publicidad:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async deleteAdvertisement(req: Request, res: Response): Promise<void> {
    try {
      const { advertisementId } = req.params;
      await AdvertisementService.deleteAdvertisement(advertisementId);
      res.status(200).json({ message: 'Publicidad eliminada exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar una publicidad:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async getAdvertisementDetails(req: Request, res: Response): Promise<void> {
    try {
      const { advertisementId } = req.params;
      const advertisement = await AdvertisementService.getAdvertisementDetails(advertisementId);
      res.status(200).json({ advertisement });
    } catch (error) {
      console.error('Error al obtener los detalles de una publicidad:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
}

export default AdvertisementController;
