import multer from "multer";
import fs from "fs";

export const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDirectory = `C:/Users/renan/OneDrive/Documentos/Projetos/Euphoria_ecommerce/frontend/public/fotos/category/${req.body.name}`;

      console.log(req.params);

      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
      }

      cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensaoImg = ["image/png", "image/jpg", "image/jpeg"].find(
      (formatoAceito) => formatoAceito == file.mimetype
    );

    if (extensaoImg) {
      return cb(null, true);
    }

    return cb(null, false);
  },
});
