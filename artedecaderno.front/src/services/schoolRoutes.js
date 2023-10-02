import Cookies from "js-cookie"
import { throwToast } from "src/utils/toast"

const token = Cookies.get('token')

export const schoolRoutes = {
    getSchoolById: async function (id) {
        const url = `http://localhost:8080/school/${id}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const a = await fetch(url, options)
        const b = await a.json()
        return await b
    },
    getUfs: async function () {
        const a = await fetch("http://localhost:8080/school/uf");
        const b = await a.json();
        return b
    },
    getCities: async function (uf) {
        let url = "http://localhost:8080/school/city";

        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: `{"uf":${JSON.stringify(uf)}}`,
        };
        const a = await fetch(url, options)
        const b = await a.json()
        return b
    },
    getSchools: async function (city) {
        let url = "http://localhost:8080/school/listByCity";

        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: `{"city":${JSON.stringify(city)}}`,
        };
        const a = await fetch(url, options)
        const b = await a.json()
        return b
    },
    insertSchool: async function (school) {
        let address = school.rua + ", " + school.numero + " " + school.complemento + ". " + school.bairro
        const url = "http://localhost:8080/school/insertSchool"
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": school.nome,
            "code": school.inep,
            "city": school.city,
            "cep": school.cep,
            "uf": school.uf,
            "phone": school.phone,
            "address": address,
            "email": school.email,
            "site": school.site
        });
        const options = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        try {
            const a = await fetch(url, options)
            if (a.ok) {
                throwToast.success("Escola cadastrada com sucesso!")
                return true
            }
            throwToast.error("Erro. Tente novamente mais tarde!")
            return false

        } catch (error) {
            console.error(error)
        }


    }
}