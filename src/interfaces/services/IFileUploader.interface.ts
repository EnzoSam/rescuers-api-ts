import { IUploadatable } from "./uploadatable.interface";

export interface IFileUploader
{
    uploadFile(file: Express.Multer.File, directory:string): Promise<IUploadatable>
}