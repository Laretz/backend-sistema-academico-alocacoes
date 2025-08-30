import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Disciplina (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a discipline", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Matemática",
        cargaHorariaTotal: 60,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body.disciplina).toEqual(
      expect.objectContaining({
        nome: "Matemática",
        cargaHorariaTotal: 60,
      })
    );
  });
});
