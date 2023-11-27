import Cookies from 'js-cookie';
import { throwToast } from 'src/utils/toast';

const token = Cookies.get('token')

export const drawRoutes = {
    postDraw: async function (draw) {
        let url = "http://localhost:8080/draw";
        const formData = new FormData()
        formData.append('title', draw.title)
        formData.append('image', draw.image)
        formData.append('category', draw.category)
        formData.append('author', draw.author)

        console.log(draw.image)

        let options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        };

        try {
            const a = await fetch(url, options);
            const b = await a.json()

            console.log(b)
            if (!a.ok) {
                throwToast.error("Ocorreu um erro. Tente novamente!");
                return false
            }
            throwToast.success("Obra cadastrado com sucesso!");
            return true

        } catch (error) {
            console.error(error);
        }
    },
    getDrawsByUser: async function (id) {
        const url = `http://localhost:8080/draw/student/${id}`
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            const a = await fetch(url, options)
            const b = await a.json()
            return await b
        } catch (error) {
            console.error(error)
        }
    },
    getAllDraws: async function () {
        const url = "http://localhost:8080/draw/classified"
        try {
            const a = await fetch(url)
            const b = await a.json()
            if (a.ok) {
                return b
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
        }
    },
    getAuthor: async function (id) {
        const url = `http://localhost:8080/student/${id}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }

        try {
            const a = await fetch(url, options)
            const b = await a.json()
            return await b.student
        } catch (error) {
            console.error(error)
        }
    }

}