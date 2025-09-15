import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import { app } from "@/app";
import request from "supertest";




describe ('Register (e2e)', () => {
    beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})


    it("should be able to register", async () => {
        const response = await request(app.server).post("/users").send({
            nome: "John Doe",
            email: "renato@email.com",
            senha: "123456",
        });
        expect(response.statusCode).toEqual(201)

     })
})
