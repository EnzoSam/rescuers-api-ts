import { Request, Response, NextFunction } from 'express';
const sharp = require('sharp');
import exifr from 'exifr';

const imageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new Error('No file uploaded'));
    }

    const data = await exifr.parse(req.file.buffer);
    const imageBufferWithoutExif = await sharp(req.file.buffer)
      .removeMetadata()
      .toBuffer();

    const optimizedImage = await sharp(imageBufferWithoutExif)
      .resize({ width: 800 }) 
      .quality(80)
      .toBuffer();

    req.file.buffer = optimizedImage;

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default imageMiddleware;