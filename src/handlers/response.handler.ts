import { Response } from "express";

const handleResponse = (res: Response, code: number, message:string, data:any) => {
    res.status(code).send({ message, data, statusCode:code });
  };

  const handleOK = (res: Response,  data:any) => {
    res.status(200).json({ message : 'Ok', data:data, statusCode:200 });
  };  

  const handleResOK = (res: Response) => {
    res.status(200).json({ message : 'Ok',statusCode:200 });
  };    

  const handleCreatedOk = (res: Response,  data:any) => {
    res.status(201).json({ message : 'Creado exitosamente', data, statusCode:201 });
  };    
  
export { handleResponse, handleOK,handleCreatedOk,handleResOK };