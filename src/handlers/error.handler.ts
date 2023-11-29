import { Response } from "express";

const handleError = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw);
  res.status(500).send({ error });
};

export { handleError };