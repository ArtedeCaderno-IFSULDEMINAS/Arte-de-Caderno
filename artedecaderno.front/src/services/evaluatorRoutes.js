import Cookies from "js-cookie"

const token = Cookies.get('token')

export const evaluatorRoutes = {
    getEvaluatorById: async function (id) {
        const url = `http://localhost:8080/evaluator/${id}`
        const options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        }

        try {
            const a = await fetch(url, options)
            const b = await a.json()
            return b
        } catch (error) {
            console.error(error)
        }
    },
    getDrawsByEvaluator: async function (id) {
        const url = `http://localhost:8080/evaluator/${id}/draws`
        const options = {
            method: 'GET', 
            headers: { Authorization: `Bearer${token}` }
        }

        try {
            const a = await fetch(url, options)
            const b = await a.json()
            return b
        } catch (error) {
            console.error(error)
        }

    }
}