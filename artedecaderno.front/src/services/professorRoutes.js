import Cookies from "js-cookie";
import { throwToast } from "src/utils/toast";

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
        console.log(token)
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }

        const a = await fetch(url, options)
        const b = await a.json()
        if (a.ok) {
            return b
        } else {
            throwToast.error("Algo deu errado. Tente novamente mais tarde")
            return false
        }
    },
    insertStudent: async function (aluno, id) {
        let address =
            "Rua " + aluno.rua + ", " + aluno.number + " " + aluno?.complemento ||
            null + ", " + aluno.bairro + ". " + aluno.city;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
            "name": aluno.nome,
            "date_of_birth": aluno.date_of_birth,
            "cpf": aluno.cpf.replace(/\D/g, ""),
            "phone": aluno.cel,
            "cep": aluno.cep,
            "address": address,
            "city": aluno.city,
            "uf": aluno.uf,
            "email": aluno.email,
            "schoolId": aluno.schoolId,
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

        if (!a.ok) {
            console.log(b)
            return false
        }

        return true

    },
    insertProfessor: async function (user, school) {
        const url = "http://localhost:8080/insertProfessor"
        let address = user.rua + ", " + user.numero + " " + user.complemento || null + ". " + user.bairro
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: user.name,
                date_of_birth: user.date_of_birth,
                cpf: user.cpf.replace(/\D/g, ""),
                phone: user.cel,
                cep: user.cep,
                email: user.email,
                address: address,
                city: user.city,
                uf: user.uf,
                schoolId: school,
                password: user.password
            })
        }

        try {
            const a = await fetch(url, options)
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
    updateProfile: async function (user, updatedUser) {
        //let address = user.rua + ", " + user.numero + " " + user.complemento || null + ". " + user.b   
        console.log(updatedUser)     
        
        const url = `http://localhost:8080/professor/update/${user}`
        const options = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: updatedUser.name,
            date_of_birth: updatedUser.date_of_birth,
            cpf: updatedUser.cpf.replace(/\D/g, ""),
            phone: updatedUser.cel,
            cep: updatedUser.cep,
            email: updatedUser.email,
            address: user.address ,
            city: updatedUser.city,
            uf: updatedUser.uf,
        })
    }

        try {
        const a = await fetch(url, options)
            if(a.ok) {
        throwToast.success("Cadastro atualizado com sucesso!")
const b = await a.json()
return b
            } else {
    throwToast.error("Algo deu errado. Tente novamente mais tarde")
    return false
}
        } catch (error) {

}

    }
}
