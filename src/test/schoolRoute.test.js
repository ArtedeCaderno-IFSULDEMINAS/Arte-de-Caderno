import require from 'supertest';
import app from '../app';
import tokenJWT from '../../testConfig';
import { describe, it, expect, beforeEach, afterEach} from "@jest/globals";

let server;

beforeEach(() => {
  const port = 3030;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET /school", () => {
    it("should return status 200", async () => {
        const res = await require(app).get("/school")
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });
});

describe("GET /school/:id", () => {
    it("should return status 200", async () => {
        const schoolId = "6449a4a8429dfacec8fdde0f";
        const res = await require(app).get(`/school/${schoolId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("_id", schoolId);
    });

    it("should return status 400", async () => {
        const schoolId = "fdhgifdsf";
        const res = await require(app).get(`/school/${schoolId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });

    it("should return status 404", async () => {
        const schoolId = "64f233b5437e39dabac83d1b";
        const res = await require(app).get(`/school/${schoolId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });
});

