import request from "supertest";
import app from "../src/app";

describe("GET /:filename", () => {
  it("Deve retornar erro se o arquivo não existir", async () => {
    const response = await request(app).get("/arquivo_que_nao_existe.png");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "erro: arquivo arquivo_que_nao_existe.png não encontrado!");
    expect(response.body).toHaveProperty("status", "Erro");
  });
});