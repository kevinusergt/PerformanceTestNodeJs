import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

// Genérico y reutilizable: roleMiddleware(["ADMIN"])
export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Usuario no autenticado.", 401));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("No tienes permisos para realizar esta acción.", 403));
    }
    next();
  };
};
