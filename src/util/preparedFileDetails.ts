import path from "path";
import parseFileName from "./parseFileName";

const preparedFileDetails = (file: Express.Multer.File) => {
  const { base, ext } = parseFileName(file.originalname);
  const fullFilePath = path.join("uploads", base, `full${ ext }`);
  const compressedFilePath = path.join("uploads", base, `min${ ext }`);

  return { fullFilePath, compressedFilePath, ext };
};

export default preparedFileDetails;