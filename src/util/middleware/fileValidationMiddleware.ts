import { Request, Response, NextFunction } from "express";

const fileValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if(!req.file || !req.file.filename){
    return res.status(400).json({ message: "erro: nenhum arquivo enviado", status: "Erro" });
  }

  next();
};

export default fileValidationMiddleware;