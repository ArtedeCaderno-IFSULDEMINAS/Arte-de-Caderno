import require from 'supertest';
import app from '../app';
import tokenJWT from '../../testConfig';
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

let server;

beforeEach(() => {
  const port = 8000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET /evaluator", () => {
    it("should return status 200", async () => {
        const res = await require(app).get("/evaluator")
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });
});

describe("GET /evaluator/:id", () => {
    it("should return status 200", async () => {
        const evaluatorId = "650a278684a63659b672fa61";
        const res = await require(app).get(`/evaluator/${evaluatorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
        expect(res.body.evaluator).toHaveProperty("_id", evaluatorId);
    });

    it("should return status 400", async () => {
        const evaluatorId = "fdhgifdsf";
        const res = await require(app).get(`/evaluator/${evaluatorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });

    it("should return status 404", async () => {
        const evaluatorId = "643c3f63f8cf064aff88fc63";
        const res = await require(app).get(`/evaluator/${evaluatorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });
});

describe("GET /evaluator/:id/draws", () => {
    it("should return status 200", async () => {
        const evaluatorId = "650a278684a63659b672fa61";
        const res = await require(app).get(`/evaluator/${evaluatorId}/draws`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });

    it("should return status 400", async () => {
        const evaluatorId = "fdhgifdsf";
        const res = await require(app).get(`/evaluator/${evaluatorId}/draws`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });

    it("should return status 404", async () => {
        const evaluatorId = "643c3f63f8cf064aff88fc63";
        const res = await require(app).get(`/evaluator/${evaluatorId}/draws`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });
});
