import { Response } from "express";

const handleErrorGeneric = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw);
  res.status(500).json({ message: error, data:errorRaw, statusCode: 500 });
};

const handleError = (res: Response, code:number, message: string, errorRaw?: any) => {
  console.log(errorRaw);
  res.status(code).json({ message, data:errorRaw, statusCode: code });
};

export { handleError,handleErrorGeneric };