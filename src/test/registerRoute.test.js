import require from 'supertest';
import app from '../app';
import tokenJWT from '../../testConfig';
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";


let server;

beforeEach(() => {
  const port = 2000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});


describe ("GET /school/uf", () => {
    it("should return status 200", async () => {
        const res = await require(app).get("/school/uf");
        expect(res.status).toEqual(200);
    });
});

describe ("POST /school/city", () => {
    it("should return status 200", async () => {
        const res = await require(app).post("/school/city")
            .send({uf: "MG"});
        expect(res.status).toEqual(200);
    });

    it("should return status 400", async () => {
        const res = await require(app).post("/school/city")
            .send({uf: null});
        expect(res.status).toEqual(400);
    });
});

describe ("POST /school/listByCity", () => {
    it("should return status 200", async () => {
        const res = await require(app).post("/school/listByCity")
            .send({city: "Belo Horizonte"});
        expect(res.status).toEqual(200);
    });

    it("should return status 400", async () => {
        const res = await require(app).post("/school/listByCity")
            .send({city: null});
        expect(res.status).toEqual(400);
    });
});