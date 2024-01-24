import request from "supertest";
import app from "../src/app";


describe("File Upload API", () => {
  it("Should upload a image", async () => {
    const response = await request(app)
      .post("/upload")
      .attach("file", Buffer.from("Imagem_Teste"), "Imagem_Teste.png");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Arquivo enviado com sucesso!");
  });
    
});