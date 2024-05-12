import { Request, Response } from 'express';
import AnimalService from '../../services/animal/animal.service';

class AnimalController {
  static async getAllAnimals(req: Request, res: Response): Promise<void> {
    try {
      const animals = await AnimalService.getAllAnimals();
      res.status(200).json({ animals });
    } catch (error) {
      console.error('Error al obtener los animales:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async createAnimal(req: Request, res: Response): Promise<void> {
    try {
      const animal = req.body;
      await AnimalService.createAnimal(animal);
      res.status(201).json({ message: 'Animal creado exitosamente.' });
    } catch (error) {
      console.error('Error al crear un animal:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async updateAnimal(req: Request, res: Response): Promise<void> {
    try {
      const { animalId } = req.params;
      const updates = req.body;
      await AnimalService.updateAnimal(animalId, updates);
      res.status(200).json({ message: 'Animal actualizado exitosamente.' });
    } catch (error) {
      console.error('Error al actualizar un animal:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async deleteAnimal(req: Request, res: Response): Promise<void> {
    try {
      const { animalId } = req.params;
      await AnimalService.deleteAnimal(animalId);
      res.status(200).json({ message: 'Animal eliminado exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar un animal:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async getAnimalsByAttributes(req: Request, res: Response): Promise<void> {
    try {
      const { attributes } = req.body;
     // const animals = await AnimalService.getAnimalsByAttributes(attributes);
     // res.status(200).json({ animals });
    } catch (error) {
      console.error('Error al obtener animales por atributos:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async uploadImages(req: Request, res: Response): Promise<void> {
    try {
      const animalId = req.params.animalId;

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

export default AnimalController;
