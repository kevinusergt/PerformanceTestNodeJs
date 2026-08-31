import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const validateBody = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter(
      (field) => req.body[field] === undefined || req.body[field] === ""
    );
    if (missingFields.length > 0) {
      return next(
        new AppError(`Faltan campos obligatorios: ${missingFields.join(", ")}`, 400)
      );
    }
    next();
  };
};
