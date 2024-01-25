import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const port = Number(process.env.PORT) || 8000;

app.listen(port, () => {
  console.log(`Server runing on http://127.0.0.1:${port}/api-docs`);
});