import path  from "path";

const parseFileName = (fullname: string): { base: string, ext: string } => {
  return{
    base: path.basename(fullname, path.extname(fullname)),
    ext: path.extname(fullname)
  };
};

export default parseFileName;