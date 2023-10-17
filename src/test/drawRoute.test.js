import request from 'supertest';
import app from '../app';
import tokenJWT from '../../testConfig';
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe ("GET /draw/all", () => {  
    it("should return status 200", async () => {
        const res = await request(app).get("/draw/all")
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });
});

describe ("GET /draw/:id", () => {
    it("should return status 200", async () => {
        const drawId = "64dea39bb69b30d3e0aea45e";
        const res = await request(app).get(`/draw/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });

    it("should return status 404", async () => {
        const drawId = "643c3f63f8cf064aff88fc63";
        const res = await request(app).get(`/draw/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });

    it("should return status 400", async () => {
        const drawId = "fdhgifdsf";
        const res = await request(app).get(`/draw/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });
});

describe ("GET /draw/student/:id", () => {
    it("should return status 200", async () => {
        const studentId = "64f233b5437e39dabac83d1b";
        const res = await request(app).get(`/draw/student/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });

    it("should return status 404", async () => {
        const studentId = "643c3f63f8cf064aff88fc63";
        const res = await request(app).get(`/draw/student/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });

    it("should return status 400", async () => {
        const studentId = "fdhgifdsf";
        const res = await request(app).get(`/draw/student/${studentId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });
});

describe ("POST /draw/category", () => {
    it("should return status 200", async () => {
        const category = "ninja";
        const res = await request(app).post("/draw/category")
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({ category: category });
        expect(res.status).toEqual(200);
    });

    it("should return status 400", async () => {
        const category = null;
        const res = await request(app).post("/draw/category")
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({ category: category });
        expect(res.status).toEqual(400);
    });

    it("should return status 400", async () => {
        const category = "samurai";
        const res = await request(app).post("/draw/category")
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({ category: category });
        expect(res.status).toEqual(400);
    });
});

describe ("POST / draw/desclassified/:id", () => {
    it("should return status 200", async () => {
        const drawId = "64dea39bb69b30d3e0aea45e";
        const res = await request(app).post(`/draw/desclassified/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({note: "desclassified test"});
        expect(res.status).toEqual(200);
        expect(res.body.classified).toBe(false);
    });

    it("should return status 404", async () => {
        const drawId = "643c3f63f8cf064aff88fc63";
        const res = await request(app).post(`/draw/desclassified/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({note: "desclassified test"});
        expect(res.status).toEqual(404);
    });
});

describe("POST /draw/evaluate/:id", () => {
    it("should return status 200", async () => {
        const drawId = "64dea39bb69b30d3e0aea45e";
        const evaluatorId = "650a276884a63659b672fa4d" ;
        const res = await request(app).post(`/draw/evaluate/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({drawId, score: 100, note: "evaluate test", evaluatorId: evaluatorId});
        expect(res.status).toEqual(200);
    });
    
    it("should return status 400", async () => {
        const drawId = "64dea907b0ecd0cbc1a806c1";
        const evaluatorId = "650a276884a63659b672fa4d" ;
        const res = await request(app).post(`/draw/evaluate/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({drawId, score: 101, note: "evaluate test", evaluatorId: evaluatorId});
        expect(res.status).toEqual(400);
        
    });

    it("should return status 400", async () => {
        const drawId = "64dea907b0ecd0cbc1a806c1";
        const evaluatorId = "650a276884a63659b672fa4d";
        const res = await request(app).post(`/draw/evaluate/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({drawId, score: -1, note: "evaluate test", evaluatorId: evaluatorId});
        expect(res.status).toEqual(400);
        
    });

    it("should return status 400", async () => {
        const drawId = "64dea907b0ecd0cbc1a806c1";
        const evaluatorId = "650a276884a63659b672fa4d";
        const res = await request(app).post(`/draw/evaluate/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({drawId, score: 100, note: null, evaluatorId: evaluatorId});
        expect(res.status).toEqual(400);
        
    });

    it("should return status 400", async () => {
        const drawId = "64dea907b0ecd0cbc1a806c1";
        const evaluatorId = null;
        const res = await request(app).post(`/draw/evaluate/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({drawId, score: 100, note: "evaluate test", evaluatorId: evaluatorId});
        expect(res.status).toEqual(400);
        
    });

    it("should return status 404", async () => {
        const drawId = "64dea907b0ecd0cbc1a806c1";
        const evaluatorId = "643c3f63f8cf064aff88fc63";
        const res = await request(app).post(`/draw/evaluate/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({drawId, score: 100, note: "evaluate test", evaluatorId: evaluatorId});
        expect(res.status).toEqual(404);
        
    });

    it("should return status 404", async () => {
        const drawId = "643c3f63f8cf064aff88fc63";
        const evaluatorId = "650a276884a63659b672fa4d" ;
        const res = await request(app).post(`/draw/evaluate/${drawId}`)
            .set('Authorization', 'Bearer ' + tokenJWT)
            .send({drawId, score: 100, note: "evaluate test", evaluatorId: evaluatorId});
        expect(res.status).toEqual(404);
        
    });
});

