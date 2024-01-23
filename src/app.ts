import cors from "cors";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { Request, Response } from "express";
import multerStorage from "./util/multerStorage";

import fileValidationMiddleware from "./util/middleware/fileValidationMiddleware";
import parseFileName from "./util/parseFileName";
import { MediaType } from "./types/MediaType";
import preparedFileDetails from "./util/preparedFileDetails";
import compressedImage from "./util/compressedImage";
// import fileExtLimiter from "./middleware/fileExtLimiter";
// import filePayloadExists from "./middleware/filesPayloadExists";
// import fileSizeLimiter from "./middleware/fileSizeLimiter";

export class App {
  public app: express.Application;
  
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  private config(): void {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.set("view engine", "ejs");
    this.app.set("views", "views");
  }
  
  routes() {
    const upload = multer({ storage: multerStorage });

    this.app.post("/upload", upload.single("file"), fileValidationMiddleware, async(req: Request, res: Response) => {
      const { file } = req;
      console.log(file);
      res.send("Arquivo enviado com sucesso!");

      if (file){
        const { fullFilePath, compressedFilePath, ext } = preparedFileDetails(file);
        res.on("finish", async() => await compressedImage(fullFilePath, compressedFilePath, 50, ext as MediaType));
      }
    });

    this.app.get("/:filename", async (req: Request, res: Response) => {
      const { filename } = req.params;
      const { base, ext } = parseFileName(filename);
      const size = req.query.size == "min" ? `min${ext}` : `full${ext}`;
      
      const parentDir = path.dirname(__dirname);
      const filePath = path.join(parentDir, "uploads", base, size);
      
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          res.status(400).json({ message: `erro: arquivo ${filename} não encontrado!`, status: "Erro" });
        } else {
          res.sendFile(filePath);
        }
      });
    });
  }
}
  
export default new App().app;
