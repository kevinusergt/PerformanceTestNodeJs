import multer from "multer";

// Guardamos el archivo en memoria (no en disco), porque solo necesitamos
// leer su contenido JSON una vez y guardarlo en la base de datos.
// No necesitamos conservar el archivo después de procesarlo.
const storage = multer.memoryStorage();

// Solo se aceptan archivos .json
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (file.mimetype === "application/json" || file.originalname.endsWith(".json")) {
    callback(null, true);
  } else {
    callback(new Error("Solo se permiten archivos con formato JSON."));
  }
};

export const upload = multer({ storage, fileFilter });
