import bcrypt from 'bcryptjs'
import * as admin from 'firebase-admin';
import { IFileUploader } from '../../interfaces/services/IFileUploader.interface';
import { IUploadatable } from '../../interfaces/services/uploadatable.interface';

const db = admin.database();
const storage = admin.storage().bucket();

export class FirestoreUploader implements IFileUploader
{
    async uploadFile(file: Express.Multer.File, directory:string): Promise<IUploadatable> {
        const fileName =  await bcrypt.hash(file.originalname, 10);    
        const fullPath = directory + '/' + fileName;
        const bucketFile = storage.file(fullPath);
      
        await bucketFile.save(file.buffer, {
          contentType: file.mimetype,
          gzip: true
        });
      
        const [url] = await bucketFile.getSignedUrl({
          action: "read",
          expires: "01-01-2050"
        });
    
        await storage.file(fullPath).makePublic();
    
        return {url, fullPath, name:fileName};
      }
}