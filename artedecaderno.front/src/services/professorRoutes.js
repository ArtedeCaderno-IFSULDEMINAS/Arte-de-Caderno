import Cookies from "js-cookie";

const token = Cookies.get('token')

export const professorRoutes = {
    getStudents: async function (id) {
        const url = `http://localhost:8080/professor/student/${id}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const a = await fetch(url, options)
        const b = await a.json()
        return b;
    },
    getSchools: async function (id) {
        const url = `http://localhost:8080/professor/school/${id}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            const a = await fetch(url, options)
            const b = await a.json()
            return b
        } catch (error) {
            console.error(error)
        }

    },
    getProfById: async function (id) {
        const url = `http://localhost:8080/professor/${id}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }

        const a = await fetch(url, options)
        const b = await a.json()
        return await b
    },
    postStudent: async function (aluno, id) {
        let address =
            "Rua " + aluno.rua + ", " + aluno.numero + " " + aluno?.complemento ||
            null + ", " + aluno.bairro + ". " + aluno.city;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
            "name": aluno.name,
            "date_of_birth": aluno.date_of_birth,
            "cpf": aluno.cpf.replace(/\D/g, ""),
            "phone": aluno.phone,
            "cep": aluno.cep,
            "address": address,
            "city": aluno.city,
            "uf": aluno.uf,
            "email": aluno.email,
            "schoolId": aluno.school,
            "drawsId": []
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const a = await fetch(`http://localhost:8080/professor/student/${id}`, requestOptions)
        const b = await a.json()
        return b

    }
}
