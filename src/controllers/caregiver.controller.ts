import { Request, Response } from 'express';
import CaregiverService from '../services/caregiver.service';
import ICaregiver from '../models/icaregiver.model';
import ICalification from '../models/icalification.model';

class CaregiverController {
  static async getAllCaregivers(req: Request, res: Response): Promise<void> {
    try {
      const caregivers = await CaregiverService.getAllCaregivers();
      res.status(200).json({ caregivers });
    } catch (error) {
      console.error('Error al obtener los cuidadores:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async createCaregiver(req: Request, res: Response): Promise<void> {
    try {
      const caregiver: ICaregiver = req.body;
      await CaregiverService.createCaregiver(caregiver);
      res.status(201).json({ message: 'Cuidador creado exitosamente.' });
    } catch (error) {
      console.error('Error al crear un cuidador:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async publishAvailability(req: Request, res: Response): Promise<void> {
    try {
      const { caregiverId } = req.body;
      await CaregiverService.publishAvailability(caregiverId);
      res.status(200).json({ message: 'Disponibilidad publicada exitosamente.' });
    } catch (error) {
      console.error('Error al publicar la disponibilidad:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async getRatings(req: Request, res: Response): Promise<void> {
    try {
      const { caregiverId } = req.params;
      const ratings = await CaregiverService.getRatings(caregiverId);
      res.status(200).json({ ratings });
    } catch (error) {
      console.error('Error al obtener las calificaciones del cuidador:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
}

export default CaregiverController;
