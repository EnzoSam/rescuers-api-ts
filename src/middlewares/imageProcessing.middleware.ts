import { Request, Response, NextFunction } from 'express';
const sharp = require('sharp');
import exifr from 'exifr';

const imageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new Error('No se ha pasado ningun archivo.'));
    }

    const data = await exifr.parse(req.file.buffer);
    const imageBufferWithoutExif = await sharp(req.file.buffer)
      .withMetadata({}) 
      .toBuffer();

    const optimizedImage = await sharp(imageBufferWithoutExif)
      .resize({ width: 800 }) 
      .jpeg({ quality: 80 })
      .toBuffer();

    req.file.buffer = optimizedImage;

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default imageMiddleware;
