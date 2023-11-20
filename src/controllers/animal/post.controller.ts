// PostController.ts

import { Request, Response } from 'express';
import PostService from '../../services/animal/post.service';
import IPost from '../../models/animals/ipost.interface';

class PostController {
  static async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async createPost(req: Request, res: Response): Promise<void> {
    try {
      const post: IPost = req.body;
      await PostService.createPost(post);
      res.status(201).json({ message: 'Publicación creada exitosamente.' });
    } catch (error) {
      console.error('Error al crear una publicación:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
}

export default PostController;
