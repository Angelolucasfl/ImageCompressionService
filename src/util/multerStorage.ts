import multer from "multer";
import fs from "fs";
import path from "path";
import parseFileName from "./parseFileName";

const multerStorage = multer.diskStorage({
  destination(_, file, callback) {
    const { base } = parseFileName(file.originalname);
    const destinationPath = path.join("uploads", base); 

    fs.promises.mkdir(destinationPath, { recursive: true })
      .then(() => callback(null, destinationPath))
      .catch((err) => {
        console.error("Erro ao criar diretório:", err);
        callback(err, destinationPath);
      });
  },
  filename: (_, file, callback) => callback(null, `full${parseFileName(file.originalname).ext}`),
});

export default multerStorage;

