import { NextFunction } from "express";
import { handleError } from "../handlers/error.handler";
import { Request, Response } from 'express';

function validateRole(_roles: number[]) {
    
    return (req: any, res: Response, next: NextFunction) => {
        if(req.user.roles && req.user.roles.every
            ((e: any) => req.user.roles.includes(e)))
            next();
        else
            handleError(res,401,'Requiere permisos mas elevados.',{});
    }
}

export default validateRole;