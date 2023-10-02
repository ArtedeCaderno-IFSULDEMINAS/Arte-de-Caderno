import { toast } from 'react-toastify'

export const CPFroutes = {
    verifyCPF: async function (cpf) {
        let url = `http://localhost:8080/cpf/${cpf.replace(/\D/g, "")}`
        let res;


        if (!cpf) {
            toast.error("Preencha o campo de CPF")
        } else {
            try {
                const a = await fetch(url)
                const b = await a.json()
                if (a.status !== 200 && b.message) {
                    toast.error("CPF já cadastrado!", { toastId: "toastId" })
                } else if (a.status !== 200 && !b.message) {
                    toast.error("CPF inválido!", { toastId: "toastId" })
                } else if (a.status === 200) {
                    res = {
                        status: 200,
                        message: "CPF válido"
                    }
                    return res
                }
            } catch (error) {
                console.error(error)
            }
        }

       
    }
}