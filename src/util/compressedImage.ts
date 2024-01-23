import sharp from "sharp";
import { MediaType } from "../types/MediaType";

const compressedImage = async(inputPath: string, outputPath: string, quality: number, mediaType: MediaType): Promise<void> => {
  try{
    let instance = sharp(inputPath);

    switch(mediaType){
    case ".png": { instance = instance.png({quality}); break; }
    case ".jpg": { instance = instance.jpeg({quality}); break; }
    case ".webp": { instance = instance.webp({quality}); break; }
    case ".gif": { instance = instance.gif(); return; }
    }

    await instance.toFile(outputPath);
    console.log("Compressão realizada com sucesso.");
  } catch(err) {
    console.log("Falha ao tentar comprimir: ", err);
  }
};

export default compressedImage;