import require from 'supertest';
import app from '../app';
import tokenJWT from '../../testConfig';
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

let server;

beforeEach(() => {
  const port = 3020;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET /student", () => {
    it("should return status 200", async () => {
        const res = await require(app).get("/student")
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });
});

describe("GET /student/:id", () => {
    it("should return status 200", async () => {
        const studentId = "64f233b5437e39dabac83d1b";
        const res = await require(app).get(`/student/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });

    it("should return status 404", async () => {
        const studentId = "643c3f63f8cf064aff88fc63";
        const res = await require(app).get(`/student/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });

    it("should return status 400", async () => {
        const studentId = "fdhgifdsf";
        const res = await require(app).get(`/student/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });
});

describe("GET /student/:id/draws", () => {
    it("should return status 200", async () => {
        const studentId = "64f233b5437e39dabac83d1b";
        const res = await require(app).get(`/student/${studentId}/draws`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });

    it("should return status 404", async () => {
        const studentId = "643c3f63f8cf064aff88fc63";
        const res = await require(app).get(`/student/${studentId}/draws`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });

    it("should return status 400", async () => {
        const studentId = "fdhgifdsf";
        const res = await require(app).get(`/student/${studentId}/draws`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });
});

describe ("POST /student/update/:id", () => {
    it("should return status 200", async () => {
        const studentId = "64f233b5437e39dabac83d1b";
        const res = await require(app).post(`/student/update/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({name: "Teste"});
        expect(res.status).toEqual(200);
    });

    it("should return status 404", async () => {
        const studentId = "643c3f63f8cf064aff88fc63";
        const res = await require(app).post(`/student/update/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({name: "Teste"});
        expect(res.status).toEqual(404);
    });

    it("should return status 400", async () => {
        const studentId = "fdhgifdsf";
        const res = await require(app).post(`/student/update/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({name: "Teste"});
        expect(res.status).toEqual(400);
    });

});
