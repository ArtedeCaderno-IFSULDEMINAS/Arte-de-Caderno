import require from 'supertest';
import server from '../../server';
import tokenJWT from '../../testConfig';
import { describe, it, expect } from "@jest/globals";

describe("GET /professor", () => {
    it("should return status 200", async () => {
        const res = await require(server).get("/professor")
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });
})

describe("GET /professor/:id", () => {
    it("should return status 200", async () => {
        const professorId = "64dd5aef1159eb7cd5e0c474";
        const res = await require(server).get(`/professor/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);

        expect(res.status).toEqual(200);
        expect(res.body.professor).toHaveProperty("_id", professorId);
    });

    it("should return status 400", async () => {
        const professorId = "fdhgifdsf";
        const res = await require(server).get(`/professor/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);

        expect(res.status).toEqual(400);
    })

    it("should return status 404", async () => {
        const professorId = "643c3f63f8cf064aff88fc63";
        const res = await require(server).get(`/professor/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);

        expect(res.status).toEqual(404);
    });

});

describe("GET /professor/school/:id", () => {
    it("should return status 200", async () => {
        const professorId = "64dd5aef1159eb7cd5e0c474";
        const res = await require(server).get(`/professor/school/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });

    it("should return status 404", async () => {
        const professorId = "643c3f63f8cf064aff88fc63";
        const res = await require(server).get(`/professor/school/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });

    it("should return status 400", async () => {
        const professorId = "fdhgifdsf";
        const res = await require(server).get(`/professor/school/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });
});

describe("GET /professor/student/:id", () => {
    it("should return status 200", async () => {
        const professorId = "64dd5aef1159eb7cd5e0c474";
        const res = await require(server).get(`/professor/student/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });

    it("should return status 404", async () => {
        const professorId = "643c3f63f8cf064aff88fc63";
        const res = await require(server).get(`/professor/student/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });

    it("should return status 400", async () => {
        const professorId = "fdhgifdsf";
        const res = await require(server).get(`/professor/student/${professorId}`)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });
});

describe("POST /professor/student/:id", () => {
    it.skip("should return status 201", async () => {
        const professorId = "64dd5aef1159eb7cd5e0c474";
        const student = {
            "name": "Professor Teste",
            "date_of_birth": "1999-01-01",
            "cpf": "12345678910",
            "phone": "12345678910",
            "cep": "12345678",
            "address": "Rua Teste",
            "city": "Cidade Teste",
            "uf": "UF",
            "email": "teste",
            "schoolId": "643c3f63f8cf064aff88fc63"
        }
        const res = await require(server).post(`/professor/student/${professorId}`)
            .send(student)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(201);
    });

    it("should return status 404", async () => {
        const professorId = "643c3f63f8cf064aff88fc63";
        const student = {
            "name": "Professor Teste",
            "date_of_birth": "1999-01-01",
            "cpf": "12345678910",
            "phone": "12345678910",
            "cep": "12345678",
            "address": "Rua Teste",
            "city": "Cidade Teste",
            "uf": "UF",
            "email": "teste",
            "schoolId": "643c3f63f8cf064aff88fc63"
        }
        const res = await require(server).post(`/professor/student/${professorId}`)
            .send(student)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });

    it("should return status 400: user already exists", async () => {
        const professorId = "64dd5aef1159eb7cd5e0c474";
        const student = {
            "name": "Professor Teste",
            "date_of_birth": "1999-01-01",
            "cpf": "12345678910",
            "phone": "12345678910",
            "cep": "12345678",
            "address": "Rua Teste",
            "city": "Cidade Teste",
            "uf": "UF",
            "email": "teste",
            "schoolId": "643c3f63f8cf064aff88fc63"
        }
        const res = await require(server).post(`/professor/student/${professorId}`)
            .send(student)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });

    it("should return status 400: missing cpf", async () => {
        const professorId = "64dd5aef1159eb7cd5e0c474";
        const student = {
            "name": "Professor Teste",
            "date_of_birth": "1999-01-01",
            "phone": "12345678910",
            "cep": "12345678",
            "address": "Rua Teste",
            "city": "Cidade Teste",
            "uf": "UF",
            "email": "teste",
            "schoolId": "643c3f63f8cf064aff88fc63"
        }
        const res = await require(server).post(`/professor/student/${professorId}`)
            .send(student)
            .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(400);
    });
});

describe("POST /professor/update/:id", () => {
    it("should return status 200", async () => {
        const professorId= "64dd5aef1159eb7cd5e0c474";
        const professor = {
            "name": "Professor Teste"
        }
        const res = await require(server).post(`/professor/update/${professorId}`)
                                        .send(professor)
                                        .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(200);
    });

    it("should return status 404", async () => {
        const professorId= "643c3f63f8cf064aff88fc63";
        const professor = {
            "name": "Professor Teste"
        }
        const res = await require(server).post(`/professor/update/${professorId}`)
                                        .send(professor)
                                        .set('Authorization', 'Bearer ' + tokenJWT);
        expect(res.status).toEqual(404);
    });
});
