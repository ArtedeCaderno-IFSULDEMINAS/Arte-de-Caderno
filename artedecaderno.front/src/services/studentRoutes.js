import Cookies from "js-cookie";
import { throwToast } from "src/utils/toast";
const token = Cookies.get('token')

export const studentRoutes = {
    insertStudent: async function (student, school) {
        let address =
            student.rua + ", " + student.numero + " " + student.complemento ||
            null + "." + student.bairro;

        let url = "http://localhost:8080/insertStudent";
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `${student.name}`,
                date_of_birth: `${student.date_of_birth}`,
                cpf: `${student.cpf.replace(/\D/g, "")}`,
                phone: `${student.cel}`,
                cep: `${student.cep}`,
                email: `${student.email}`,
                address: `${address}`,
                city: `${student.city}`,
                uf: `${student.uf}`,
                schoolId: `${school.trim()}`,
                password: `${student.password}`,
                isFromProfessor: false,
            }),
        };

        try {
            const a = await fetch(url, options)
            const b = await a.json()
            console.log(b)
            if (a.ok) {
                throwToast.success("Cadastro realizado com sucesso")
                return true
            } else {
                throwToast.error("Algo deu errado. Tente novamente mais tarde")
                return false
            }
        } catch (error) {
            console.error(error)
        }
    },
    getUserById: async function (student_id) {
        const url = `http://localhost:8080/student/${student_id}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
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
    getDrawsByStudent: async function (student_id) {
        const url = `http://localhost:8080/student/${student_id}/draws`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        try {
            const a = await fetch(url, options)
            const b = await a.json()

            if (!a.ok) {
                throwToast.error("Algo deu errado. Tente novamente mais tarde");
                return false
            }

            return b

        } catch (error) {
            return
        }
    }
}